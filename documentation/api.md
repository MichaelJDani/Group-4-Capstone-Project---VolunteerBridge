## Base end points

GET http://localhost:5000/

# JSON Output

{
"message": "Welcome to VolunteerBridge API",
"status": "running",
"version": "1.0.0"
}

## Register

# request

POST http://localhost:5000/api/auth/register

raw JSON

{
"name":"John Bull",
"email":"johnbull@example.com",
"password":"12345698"

}

# Output

JSON

{
"message": "User registered successfully",
"user": {
"isActive": true,
"isVerified": false,
"role": "volunteer",
"id": 4,
"name": "John Bull",
"email": "johnbull@example.com",
"updatedAt": "2026-03-11T20:54:28.720Z",
"createdAt": "2026-03-11T20:54:28.720Z"
}
}

## Log in

POST http://localhost:5000/api/auth/login

# Request

raw JSON body

{
"email":"johnhoe@example.com",
"password":"12345698"
}

# Response:

JSON

{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3MzI2MjcwNiwiZXhwIjoxNzc1ODU0NzA2fQ.1xa8pZOryvgTIufYb6_uF8p5hsqXk3oC-xLaEQ-NYhY",
"user": {
"id": 1,
"name": "John Hoe",
"email": "johnhoe@example.com",
"phone_number": null,
"isActive": true,
"isVerified": false,
"role": "volunteer",
"resetTokenExpiry": null,
"lastLogin": "2026-03-11T20:58:26.357Z",
"createdAt": "2026-03-10T15:52:28.000Z",
"updatedAt": "2026-03-11T20:58:26.358Z"
}
}

## LOGIN another user

POST http://localhost:5000/api/auth/register

raw JSON
request

{
"email":"johnbull@example.com",
"password":"12345698"

}

# response:

{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTc3MzI2MzA0MywiZXhwIjoxNzc1ODU1MDQzfQ.eFmQohsPKQyeLQhhBEe1TOm8-h0jcgHGMAoFnYyVA74",
"user": {
"id": 4,
"name": "John Bull",
"email": "johnbull@example.com",
"phone_number": null,
"isActive": true,
"isVerified": false,
"role": "volunteer",
"resetTokenExpiry": null,
"lastLogin": "2026-03-11T21:04:03.348Z",
"createdAt": "2026-03-11T20:54:28.000Z",
"updatedAt": "2026-03-11T21:04:03.348Z"
}
}
