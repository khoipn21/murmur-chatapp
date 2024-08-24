package main

import (
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
	"github.com/ulule/limiter/v3"
	mgin "github.com/ulule/limiter/v3/drivers/middleware/gin"
	sredis "github.com/ulule/limiter/v3/drivers/store/redis"
	"log"
	"murmur-server/config"
	"murmur-server/handler"
	"murmur-server/model"
	"murmur-server/repository"
	"murmur-server/service"
	"murmur-server/ws"
	"net/http"
	"time"
)

func inject(d *dataSources, cfg config.Config) (*gin.Engine, error) {
	log.Println("Injecting data sources")
	userRepository := repository.NewUserRepository(d.DB)
	fileRepository := repository.NewFileRepository(d.S3Session, cfg.BucketName)

	userService := service.NewUserService(&service.USConfig{
		UserRepository: userRepository,
		FileRepository: fileRepository,
	})
	router := gin.Default()

	// set cors settings
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{cfg.CorsOrigin},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	})
	router.Use(c)

	redisURL := d.RedisClient.Options().Addr
	password := d.RedisClient.Options().Password

	// initialize session store
	store, err := redis.NewStore(10, "tcp", redisURL, password, []byte(cfg.SessionSecret))
	if err != nil {
		return nil, fmt.Errorf("could not initialize redis session store: %w", err)
	}

	store.Options(sessions.Options{
		Domain:   cfg.Domain,
		MaxAge:   60 * 60 * 24 * 7, // 7 days
		Secure:   gin.Mode() == gin.ReleaseMode,
		HttpOnly: true,
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
	})

	router.Use(sessions.Sessions(model.CookieName, store))

	// add rate limit
	rate := limiter.Rate{
		Period: 1 * time.Hour,
		Limit:  1500,
	}

	limitStore, _ := sredis.NewStore(d.RedisClient)

	rateLimiter := mgin.NewMiddleware(limiter.New(limitStore, rate))
	router.Use(rateLimiter)

	// Websockets Setup
	hub := ws.NewWebsocketHub(&ws.Config{
		UserService: userService,
		Redis:       d.RedisClient,
	})
	go hub.Run()

	handler.NewHandler(&handler.Config{
		R:               router,
		UserService:     userService,
		TimeoutDuration: time.Duration(cfg.HandlerTimeOut) * time.Second,
		MaxBodyBytes:    cfg.MaxBodyBytes,
	})

	return router, nil
}
