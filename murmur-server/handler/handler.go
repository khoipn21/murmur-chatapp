package handler

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"log"
	"murmur-server/model"
	"net/http"
	"time"
)

type Handler struct {
	userService  model.UserService
	MaxBodyBytes int64
}

type Config struct {
	R               *gin.Engine
	UserService     model.UserService
	TimeoutDuration time.Duration
	MaxBodyBytes    int64
}

func NewHandler(c *Config) {
	h := &Handler{
		userService:  c.UserService,
		MaxBodyBytes: c.MaxBodyBytes,
	}

	c.R.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No route found.",
		})
	})

	c.R.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": "not found"})
	})

	ag := c.R.Group("api/account")
	ag.POST("/register", h.Register)
	ag.POST("/login", h.Login)
	ag.POST("/logout", h.Logout)
}

func setUserSession(c *gin.Context, id string) {
	session := sessions.Default(c)
	session.Set("userId", id)
	if err := session.Save(); err != nil {
		log.Printf("error setting the session: %v\n", err.Error())
	}
}

func toFieldErrorResponse(c *gin.Context, field, message string) {
	c.JSON(http.StatusBadRequest, gin.H{
		"errors": []model.FieldError{
			{
				Field:   field,
				Message: message,
			},
		},
	})
}
