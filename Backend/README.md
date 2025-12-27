# Users API — Register Endpoint

## POST /users/register

**Description:**
Registers a new user, hashes the password, stores the user, and returns a JWT plus the created user object (password excluded by the model).

**Endpoint:**
- Method: `POST`
- URL: `/users/register`

**Request body (JSON):**
- `fullName` (object)
  - `firstName` (string) — required, minimum 3 characters
  - `lastName` (string) — optional, minimum 3 characters if provided
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

Example request JSON:

```json
{
  "fullName": { "firstName": "Jane", "lastName": "Doe" },
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

**Validation rules (as implemented):**
- `email` validated with `isEmail()`
- `fullName.firstName` length >= 3
- `password` length >= 6

**Responses:**
- `201 Created` — Successful registration

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<id>",
    "fullName": { "firstName": "Jane", "lastName": "Doe" },
    "email": "jane.doe@example.com",
    "socketid": null
  }
}
```

- `400 Bad Request` — Validation failed

```json
{
  "errors": [
    { "msg": "Please provide a valid email address", "param": "email", "location": "body" },
    { "msg": "First name must be at least 3 characters long", "param": "fullName.firstName", "location": "body" }
  ]
}
```

- `409 Conflict` — (Possible) Email already exists — depends on service error handling
- `500 Internal Server Error` — Unexpected server error

**How it works (flow):**
1. Route-level validators (express-validator) check the incoming payload.
2. The controller calls `validationResult(req)` and returns `400` if there are validation errors.
3. The controller calls `userModel.hashPassword(password)` to hash the password.
4. The controller calls `userService.createUser(...)` to create and persist the user.
5. After creation, `user.generateAuthToken()` produces a JWT which is returned with the user.

**Notes / Implementation details:**
- The `password` field is stored hashed and is set `select: false` in the Mongoose schema, so responses should not include the password.
- Duplicate emails may result in a database error; consider handling unique constraint violations in the service/controller to return `409`.

**Example curl:**

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":{"firstName":"Jane","lastName":"Doe"},"email":"jane.doe@example.com","password":"secret123"}'
```

## POST /users/login

**Description:**
Authenticates a user with email and password and returns a JWT plus the user object on success.

**Endpoint:**
- Method: `POST`
- URL: `/users/login`

**Request body (JSON):**
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

Example request JSON:

```json
{
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

**Validation rules (as implemented):**
- `email` validated with `isEmail()`
- `password` length >= 6

**Responses:**
- `200 OK` — Successful authentication

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<id>",
    "fullName": { "firstName": "Jane", "lastName": "Doe" },
    "email": "jane.doe@example.com",
    "socketid": null
  }
}
```

- `400 Bad Request` — Validation failed
- `401 Unauthorized` — Invalid credentials
- `500 Internal Server Error` — Unexpected server error

**Example curl:**

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"secret123"}'
```

