package handler

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"log"
	"murmur-server/model"
	"murmur-server/model/apperrors"
	"net/http"
	"strings"
)

/*
 * AuthHandler contains all routes related to account actions (/api/account)
 */

type registerReq struct {
	// Must be unique
	Email string `json:"email"`
	// Min 3, max 30 characters.
	Username string `json:"username"`
	// Min 6, max 150 characters.
	Password string `json:"password"`
} //@name RegisterRequest

func (r registerReq) validate() error {
	return validation.ValidateStruct(&r,
		validation.Field(&r.Email, validation.Required, is.EmailFormat),
		validation.Field(&r.Username, validation.Required, validation.Length(3, 30)),
		validation.Field(&r.Password, validation.Required, validation.Length(6, 150)),
	)
}

func (r *registerReq) sanitize() {
	r.Username = strings.TrimSpace(r.Username)
	r.Email = strings.TrimSpace(r.Email)
	r.Email = strings.ToLower(r.Email)
	r.Password = strings.TrimSpace(r.Password)
}

// Register handler creates a new user
func (h *Handler) Register(c *gin.Context) {
	var req registerReq

	// Bind incoming json to struct and check for validation errors
	if ok := bindData(c, &req); !ok {
		return
	}

	req.sanitize()

	initial := &model.User{
		Email:    req.Email,
		Username: req.Username,
		Password: req.Password,
	}

	user, err := h.userService.Register(initial)

	if err != nil {
		if err.Error() == apperrors.NewBadRequest(apperrors.DuplicateEmail).Error() {
			toFieldErrorResponse(c, "Email", apperrors.DuplicateEmail)
			return
		}
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	setUserSession(c, user.ID)

	c.JSON(http.StatusCreated, user)
}

type loginReq struct {
	// Must be unique
	Email string `json:"email"`
	// Min 6, max 150 characters.
	Password string `json:"password"`
} //@name LoginRequest

func (r loginReq) validate() error {
	return validation.ValidateStruct(&r,
		validation.Field(&r.Email, validation.Required, is.EmailFormat),
		validation.Field(&r.Password, validation.Required, validation.Length(6, 150)),
	)
}

func (r *loginReq) sanitize() {
	r.Email = strings.TrimSpace(r.Email)
	r.Email = strings.ToLower(r.Email)
	r.Password = strings.TrimSpace(r.Password)
}

// Login used to authenticate existent user
// Login godoc
// @Tags Account
// @Summary User Login
// @Accept  json
// @Produce  json
// @Param account body loginReq true "Login account"
// @Success 200 {object} model.User
// @Failure 400 {object} model.ErrorsResponse
// @Failure 401 {object} model.ErrorResponse
// @Failure 500 {object} model.ErrorResponse
// @Router /account/login [post]
func (h *Handler) Login(c *gin.Context) {
	var req loginReq

	if ok := bindData(c, &req); !ok {
		return
	}

	req.sanitize()

	user, err := h.userService.Login(req.Email, req.Password)

	if err != nil {
		c.JSON(apperrors.Status(err), gin.H{
			"error": err,
		})
		return
	}

	setUserSession(c, user.ID)

	c.JSON(http.StatusOK, user)
}

// Logout handler removes the current session
// Logout godoc
// @Tags Account
// @Summary User Logout
// @Accept  json
// @Produce  json
// @Param account body loginReq true "Login account"
// @Success 200 {object} model.Success
// @Router /account/logout [post]
func (h *Handler) Logout(c *gin.Context) {
	c.Set("user", nil)

	session := sessions.Default(c)
	session.Set("userId", "")
	session.Clear()
	session.Options(sessions.Options{Path: "/", MaxAge: -1})
	err := session.Save()

	if err != nil {
		log.Printf("error clearing session: %v\n", err.Error())
	}

	c.JSON(http.StatusOK, true)
}
