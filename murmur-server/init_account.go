package main

import (
	"log"
	"murmur-server/model"
	"os"
)

func createDefaultAccounts(userService model.UserService) {
	if os.Getenv("CREATE_DEFAULT_ACCOUNTS") != "true" {
		return
	}

	defaultAccounts := []struct {
		email    string
		username string
		password string

	}{
		{"user1@example.com", "user1", "user1password"},
		{"user2@example.com", "user2", "user2password"},
	}

	for _, account := range defaultAccounts {
		user := &model.User{
			Email:    account.email,
			Username: account.username,
			Password: account.password,
			IsVerified: true,
		}

		createdUser, err := userService.Register(user)
		if err != nil {
			log.Printf("Failed to create default account %s: %v", account.email, err)
		} else {
			log.Printf("Created default account: %s", account.email)
			if !createdUser.IsVerified {
				createdUser.IsVerified = true
				err = userService.UpdateAccount(createdUser)
				if err != nil {
					log.Printf("Failed to mark account %s as verified: %v", account.email, err)
				} else {
					log.Printf("Marked account %s as verified", account.email)
				}
			}
		}
	}
}