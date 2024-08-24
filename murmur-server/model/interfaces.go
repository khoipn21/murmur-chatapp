package model

import (
	"mime/multipart"
)

// FileRepository defines methods related to file upload the service layer expects
// any repository it interacts with to implement
type FileRepository interface {
	UploadAvatar(header *multipart.FileHeader, directory string) (string, error)
	UploadFile(header *multipart.FileHeader, directory, filename, mimetype string) (string, error)
	DeleteImage(key string) error
}
