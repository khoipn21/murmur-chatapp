FROM golang:1.22-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o murmur-server .
# RUN chmod +x ./app/murmur-server

EXPOSE 4000

CMD ["go", "run", "murmur-server"]