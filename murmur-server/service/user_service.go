package service

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"log"
	"mime/multipart"
	"murmur-server/model"
	"murmur-server/model/apperrors"
	"strings"
)

// UserService acts as a struct for injecting an implementation of UserRepository
// for use in service methods

type userService struct {
	UserRepository  model.UserRepository
	FileRepository  model.FileRepository
	RedisRepository model.RedisRepository
}

// USConfig will hold repositories that will eventually be injected into
// this service layer
type USConfig struct {
	UserRepository  model.UserRepository
	FileRepository  model.FileRepository
	RedisRepository model.RedisRepository
}

// NewUserService is a factory function for
// initializing a UserService with its repository layer dependencies
func NewUserService(c *USConfig) model.UserService {
	return &userService{
		UserRepository:  c.UserRepository,
		FileRepository:  c.FileRepository,
		RedisRepository: c.RedisRepository,
	}
}

func (s *userService) Get(uid string) (*model.User, error) {
	return s.UserRepository.FindByID(uid)
}

func (s *userService) GetByEmail(email string) (*model.User, error) {

	// Sanitize email
	email = strings.ToLower(email)
	email = strings.TrimSpace(email)

	return s.UserRepository.FindByEmail(email)
}

func (s *userService) Register(user *model.User) (*model.User, error) {
	hashedPassword, err := hashPassword(user.Password)

	if err != nil {
		log.Printf("Unable to signup user for email: %v\n", user.Email)
		return nil, apperrors.NewInternal()
	}

	user.ID = GenerateId()
	user.Image = generateAvatar(user.Email)
	user.Password = hashedPassword

	return s.UserRepository.Create(user)
}

func (s *userService) Login(email, password string) (*model.User, error) {
	user, err := s.UserRepository.FindByEmail(email)
	if err != nil {
		return nil, apperrors.NewAuthorization(apperrors.InvalidCredentials)
	}
	match, err := comparePasswords(user.Password, password)

	if err != nil {
		return nil, apperrors.NewInternal()
	}

	if !match {
		return nil, apperrors.NewAuthorization(apperrors.InvalidCredentials)
	}

	return user, nil
}

func (s *userService) UpdateAccount(u *model.User) error {
	return s.UserRepository.Update(u)
}

func (s *userService) IsEmailAlreadyInUse(email string) bool {
	user, err := s.UserRepository.FindByEmail(email)

	if err != nil {
		return true
	}

	return user.ID != ""
}

func (s *userService) ChangeAvatar(header *multipart.FileHeader, directory string) (string, error) {
	return s.FileRepository.UploadAvatar(header, directory)
}

func (s *userService) DeleteImage(key string) error {
	return s.FileRepository.DeleteImage(key)
}

func (s *userService) ChangePassword(currentPassword, newPassword string, user *model.User) error {
	// verify
	match, err := comparePasswords(user.Password, currentPassword)

	if err != nil {
		return apperrors.NewInternal()
	}

	if !match {
		return apperrors.NewAuthorization(apperrors.InvalidOldPassword)
	}

	hashedPassword, err := hashPassword(newPassword)

	if err != nil {
		log.Printf("Unable to change password for email: %v\n", user.Email)
		return apperrors.NewInternal()
	}

	user.Password = hashedPassword

	return s.UserRepository.Update(user)
}

func (s *userService) GetFriendAndGuildIds(userId string) (*[]string, error) {
	return s.UserRepository.GetFriendAndGuildIds(userId)
}

func (s *userService) GetRequestCount(userId string) (*int64, error) {
	return s.UserRepository.GetRequestCount(userId)
}

func generateAvatar(email string) string {
	hash := md5.Sum([]byte(email))
	return fmt.Sprintf("https://gravatar.com/avatar/%s?d=identicon", hex.EncodeToString(hash[:]))
}
