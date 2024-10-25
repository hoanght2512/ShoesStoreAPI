# Shoes Store API

Backend API for Shoes Store.

#### Authors

- [@hoanght2512](https://www.github.com/hoanght2512)

#### Environment Variables

- JWT_SECRET=your_jwt_secret_here
- JWT_EXPIRES_IN=1h
- MONGO_URI=your_mongodb_uri_here
- PORT=3000

# Authencation API

### Login

```http
  POST /api/auth/login
```

| Parameter  | Type     | Required | Description |
| :--------- | :------- | :------- | :---------- |
| `username` | `string` | true     |             |
| `password` | `string` | true     |             |

**Response 200**

```json
{
  "status": 200,
  "message": "Đăng nhập thành công!",
  "data": {
    "username": "example",
    "email": "example@gmail.com",
    "phone": "0123456789",
    "full_name": "Example",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFiOTM3YjdjZTJlZmYyMGY1NzI0MDEiLCJpYXQiOjE3Mjk4NjA0OTksImV4cCI6MTcyOTg2NDA5OX0.b5KJTSFjWyRY3iU8B_-ROVWDibws9YaIExvdbfpU9R4"
  }
}
```

**Response 400**

```json
{
  "status": 400,
  "error": "Tài khoản không được để trống!"
}
```

**Response 401**

```json
{
  "status": 401,
  "error": "Tài khoản hoặc mật khẩu không chính xác!"
}
```

### Register

```http
  POST /api/auth/register
```

| Parameter   | Type     | Required | Description |
| :---------- | :------- | :------- | :---------- |
| `username`  | `string` | true     |             |
| `password`  | `string` | true     |             |
| `email`     | `string` | true     |             |
| `full_name` | `string` | true     |             |
| `phone`     | `string` | true     |             |

**Response 201**

```json
{
  "status": 201,
  "message": "Đăng ký tài khoản thành công!"
}
```

**Response 400**

```json
{
  "status": 400,
  "error": "Tài khoản không được để trống!"
}
```

**Response 409**

```json
{
  "status": 409,
  "error": "Tài khoản đã tồn tại!"
}
```
