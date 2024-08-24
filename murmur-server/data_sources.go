package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/redis/go-redis/v9"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"murmur-server/config"
	"murmur-server/model"
)

type dataSources struct {
	DB          *gorm.DB
	RedisClient *redis.Client
	S3Session   *session.Session
}

func initDS(ctx context.Context, cfg config.Config) (*dataSources, error) {
	log.Printf("Initializing data sources\n")

	log.Printf("Connecting to Postgresql\n")
	db, err := gorm.Open(postgres.Open(cfg.DatabaseUrl))

	if err != nil {
		return nil, fmt.Errorf("error opening db: %w", err)
	}

	// Migrate models and setup join tables
	if err = db.AutoMigrate(
		&model.User{},
	); err != nil {
		return nil, fmt.Errorf("error migrating models: %w", err)
	}

	// Initialize redis connection
	opt, err := redis.ParseURL(cfg.RedisUrl)
	if err != nil {
		return nil, fmt.Errorf("error parsing the redis url: %w", err)
	}

	log.Println("Connecting to Redis")
	rdb := redis.NewClient(opt)

	// verify redis connection
	_, err = rdb.Ping(ctx).Result()

	if err != nil {
		return nil, fmt.Errorf("error connecting to redis: %w", err)
	}

	return &dataSources{
		DB:          db,
		RedisClient: rdb,
	}, nil
}

// close to be used in graceful server shutdown
func (d *dataSources) close() error {
	if err := d.RedisClient.Close(); err != nil {
		return fmt.Errorf("error closing Redis Client: %w", err)
	}

	return nil
}
