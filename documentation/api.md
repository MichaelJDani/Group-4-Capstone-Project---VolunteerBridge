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

## Register Admin

# request

# raw JSON

{
"name": "Sunday Oluwasegun",
"email":"sundayo@example.com",
"password":"12345698@",
"role": "admin"
}

# Response

body JSON

{
"message": "User registered successfully",
"user": {
"isActive": true,
"isVerified": false,
"role": "volunteer",
"id": 5,
"name": "Sunday Oluwasegun",
"email": "sundayo@example.com",
"updatedAt": "2026-03-12T13:57:28.618Z",
"createdAt": "2026-03-12T13:57:28.618Z"
}
}

## Admin log-in

api
POST http://localhost:5000/api/auth/login

body
raw JSON
Request

{
"email":"sundayo@example.com",
"password":"12345698@"  
}

Response

{
"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTc3MzQzMzk2NywiZXhwIjoxNzc2MDI1OTY3fQ.HcYx2L6TdLsq3za7wDtdbBg9hlmb_aFRiIF2U5MQU48",
"user": {
"id": 5,
"name": "Sunday Oluwasegun",
"email": "sundayo@example.com",
"phone_number": null,
"isActive": true,
"isVerified": false,
"role": "volunteer",
"resetTokenExpiry": null,
"lastLogin": "2026-03-13T20:32:47.033Z",
"createdAt": "2026-03-12T13:57:28.000Z",
"updatedAt": "2026-03-13T20:32:47.037Z"
}
}

## Create Project

Api http://localhost:5000/api/projects
POST

# request

- authorization Bearer token inputed
  body
  raw JSON
  {
  "name":"Food Distribution to less privileged",
  "description": "Distribution of 10 bags of in small bags of 2kg",
  "start_date": "2026-04-01",
  "end_date": "2026-04-01",
  "status": "active"

}

# response

{
"success": true,
"message": "Project created successfully",
"data": {
"id": 1,
"name": "Food Distribution to less privileged",
"description": "Distribution of 10 bags of in small bags of 2kg",
"startDate": null,
"endDate": null,
"status": "active",
"createdBy": 5,
"updatedAt": "2026-03-13T20:36:52.562Z",
"createdAt": "2026-03-13T20:36:52.562Z"
}
}

## Fetched Project

# api

- GET http://localhost:5000/api/projects

# request

Token inputed on Authorization : Bearer Token
body blank
response:

{
"success": true,
"message": "Projects fetched successfully",
"data": [
{
"id": 1,
"name": "Food Distribution to less privileged",
"description": "Distribution of 10 bags of in small bags of 2kg",
"startDate": null,
"endDate": null,
"status": "active",
"createdBy": 5,
"createdAt": "2026-03-13T20:36:52.000Z",
"updatedAt": "2026-03-13T20:36:52.000Z"
}
]
}

## Create task for project

api http://localhost:5000/api/tasks/projects/1/tasks
POST http://localhost:5000/api/tasks/projects/1/tasks

# request

Body
raw JSON

{
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01",
"estimatedHours": 5,
"status": "pending"
}

# Response

{
"success": true,
"message": "Task created successfully",
"data": {
"id": 1,
"projectId": "1",
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01T00:00:00.000Z",
"estimatedHours": 5,
"status": "pending",
"createdBy": 5,
"updatedAt": "2026-03-13T20:59:47.785Z",
"createdAt": "2026-03-13T20:59:47.785Z"
}
}

## Fetch Task

# api

GET http://localhost:5000/api/tasks/projects/1/tasks

# request

Body blank

# Response:

{
"success": true,
"message": "Project tasks fetched successfully",
"data": [
{
"id": 1,
"projectId": 1,
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01T00:00:00.000Z",
"estimatedHours": 5,
"status": "pending",
"createdBy": 5,
"assignedTo": null,
"createdAt": "2026-03-13T20:59:47.000Z",
"updatedAt": "2026-03-13T20:59:47.000Z",
"project_id": 1
}
]
}

## Assign Task

# Api

http://localhost:5000/api/tasks/1/assign

# authorization input bearer token from volunteer

body
raw JSON

# Request:

{
"userId":1

}

# Response

{
"success": true,
"message": "Task assigned and notification created",
"data": {
"id": 1,
"projectId": 1,
"title": "Food Distribution to less privileged",
"description": "Handle 5 bags",
"dueDate": "2026-04-01T00:00:00.000Z",
"estimatedHours": 5,
"status": "pending",
"createdBy": 5,
"assignedTo": 1,
"createdAt": "2026-03-13T20:59:47.000Z",
"updatedAt": "2026-03-14T11:43:41.020Z",
"project_id": 1
}
}

## SEND REPORT

# api

http://localhost:5000/api/reports

body
raw JSON

# request

{
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"userId": "1",
"projectId": 1,
"taskId": "1"
}

# Response

{
"success": true,
"data": {
"status": "draft",
"id": 1,
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"userId": 1,
"projectId": 1,
"taskId": "1",
"updatedAt": "2026-03-14T11:59:59.128Z",
"createdAt": "2026-03-14T11:59:59.128Z"
}
}

## Get Report

api
GET
http://localhost:5000/api/reports/user/1

# Request

Body
raw JSON
{
"userId": "1"  
}

# Response

{
"success": true,
"data": [
{
"id": 1,
"userId": 1,
"projectId": 1,
"taskId": 1,
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"status": "draft",
"createdAt": "2026-03-14T11:59:59.000Z",
"updatedAt": "2026-03-14T11:59:59.000Z",
"user_id": 1,
"project_id": 1,
"project": {
"id": 1,
"name": "Food Distribution to less privileged"
}
}
]
}

## Get Project Report

api
http://localhost:5000/api/reports/project/1

Request
raw JSON
{
"projectId": "1"
}

# Response

{
"success": true,
"data": [
{
"id": 1,
"userId": 1,
"projectId": 1,
"taskId": 1,
"title": "Food Distribution to less privileged",
"content": "five bags given to 125 people, names are listed on the excel sheet, will be sent via mail",
"status": "draft",
"createdAt": "2026-03-14T11:59:59.000Z",
"updatedAt": "2026-03-14T11:59:59.000Z",
"user_id": 1,
"project_id": 1,
"reportsOwner": {
"id": 1,
"name": "John Hoe",
"email": "johnhoe@example.com"
}
}
]
}
