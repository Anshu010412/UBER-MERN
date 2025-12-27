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
curl -X POST http://localhost:4000/users/register \
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

## GET /users/profile

**Description:**
Returns the authenticated user's profile. Requires a valid JWT either in a `token` cookie or an `Authorization: Bearer <token>` header.

**Endpoint:**
- Method: `GET`
- URL: `/users/profile`

**Authentication:**
- Required — route uses `authMiddleware.authUser` which verifies the JWT and checks token blacklist.

**Responses:**
- `200 OK` — Returns the authenticated user object

```json
{
  "_id": "<id>",
  "fullName": { "firstName": "Jane", "lastName": "Doe" },
  "email": "jane.doe@example.com",
  "socketid": null
}
```

- `401 Unauthorized` — Missing, invalid, or blacklisted token

**Example curl (Authorization header):**

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt-token>"
```

## GET /users/logout

**Description:**
Logs out the authenticated user by clearing the `token` cookie and adding the token to a blacklist so it can no longer be used.

**Endpoint:**
- Method: `GET`
- URL: `/users/logout`

**Authentication:**
- Required — route uses `authMiddleware.authUser`.

**Responses:**
- `200 OK` — Successful logout

```json
{
  "message": "Logged Out Successfully"
}
```

- `401 Unauthorized` — Missing, invalid, or blacklisted token

**Example curl (with cookie):**

```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Cookie: token=<jwt-token>"
```

**Notes:**
- The implementation clears the cookie server-side and stores the token in `blacklistToken` for future verification.
- If clients rely solely on storing the token client-side, ensure they also remove it locally after logout.

## POST /captains/register

**Description:**
Registers a new captain (driver), validates profile and vehicle information, hashes the password, persists the record, and returns a JWT plus the created captain object (password excluded by the model).

**Endpoint:**
- Method: `POST`
- URL: `/captains/register`

**Request body (JSON):**
- `fullname` (object)
  - `firstname` (string) — required, minimum 3 characters
  - `lastname` (string) — optional, minimum 3 characters if provided
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters
- `vehicle` (object)
  - `color` (string) — required, minimum 3 characters
  - `plate` (string) — required, minimum 3 characters
  - `capacity` (number) — required, integer, minimum 1
  - `vehicleType` (string) — required, one of: `car`, `motorcycle`, `auto`
- `location` (object) — optional
  - `lat` (number)
  - `lng` (number)

Example request JSON:

```json
{
  "fullname": { "firstname": "John", "lastname": "Smith" },
  "email": "john.smith@example.com",
  "password": "driverpass",
  "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" },
  "location": { "lat": 12.34, "lng": 56.78 }
}
```

**Validation rules (as implemented):**
- `email` validated with `isEmail()`
- `fullname.firstname` length >= 3
- `password` length >= 6
- `vehicle.color` length >= 3
- `vehicle.plate` length >= 3
- `vehicle.capacity` integer >= 1
- `vehicle.vehicleType` in [`car`, `motorcycle`, `auto`]

**Responses:**
- `201 Created` — Successful registration

```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<id>",
    "fullname": { "firstname": "John", "lastname": "Smith" },
    "email": "john.smith@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" }
  }
}
```

- `400 Bad Request` — Validation failed
- `409 Conflict` — Email already exists (depends on service/controller handling)
- `500 Internal Server Error` — Unexpected server error

**Example curl:**

```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Smith"},"email":"john.smith@example.com","password":"driverpass","vehicle":{"color":"Blue","plate":"XYZ123","capacity":4,"vehicleType":"car"}}'
```

## POST /captains/login

**Description:**
Authenticates a captain using email and password, returning a JWT and the captain object on success.

**Endpoint:**
- Method: `POST`
- URL: `/captains/login`

**Request body (JSON):**
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

Example request JSON:

```json
{
  "email": "john.smith@example.com",
  "password": "driverpass"
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
  "captain": {
    "_id": "<id>",
    "fullname": { "firstname": "John", "lastname": "Smith" },
    "email": "john.smith@example.com",
    "socketId": null,
    "status": "active",
    "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" }
  }
}
```

- `400 Bad Request` — Validation failed
- `401 Unauthorized` — Invalid credentials
- `500 Internal Server Error` — Unexpected server error

**Example curl:**

```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.smith@example.com","password":"driverpass"}'
```

**Notes:**
- The route-level validators for captains are defined in `routes/captain.route.js` and enforce the vehicle and profile constraints listed above.
- The `password` is stored hashed (`select: false` in the model). Duplicate email handling should be implemented to return a `409` conflict when appropriate.

## GET /captains/profile

**Description:**
Returns the authenticated captain's profile. Requires a valid JWT either in a `token` cookie or an `Authorization: Bearer <token>` header.

**Endpoint:**
- Method: `GET`
- URL: `/captains/profile`

**Authentication:**
- Required — route uses `authMiddleware.authCaptain` which verifies the JWT and checks token blacklist.

**Responses:**
- `200 OK` — Returns the authenticated captain object

```json
{
  "_id": "<id>",
  "fullname": { "firstname": "John", "lastname": "Smith" },
  "email": "john.smith@example.com",
  "socketId": null,
  "status": "active",
  "vehicle": { "color": "Blue", "plate": "XYZ123", "capacity": 4, "vehicleType": "car" },
  "location": { "lat": 12.34, "lng": 56.78 }
}
```

- `401 Unauthorized` — Missing, invalid, or blacklisted token

**Example curl (Authorization header):**

```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <jwt-token>"
```

## GET /captains/logout

**Description:**
Logs out the authenticated captain by clearing the `token` cookie and adding the token to a blacklist so it can no longer be used.

**Endpoint:**
- Method: `GET`
- URL: `/captains/logout`

**Authentication:**
- Required — route uses `authMiddleware.authCaptain`.

**Responses:**
- `200 OK` — Successful logout

```json
{
  "message": "Logged Out Successfully"
}
```

- `401 Unauthorized` — Missing, invalid, or blacklisted token

**Example curl (with cookie):**

```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Cookie: token=<jwt-token>"
```

**Notes:**
- The implementation clears the cookie server-side and stores the token in `blacklistToken` for future verification (see `controllers/captain.controller.js`).
- Clients should also remove tokens locally after logout to avoid reuse.

