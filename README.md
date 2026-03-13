# Volunteer Bridge Backend API

## 📌 Project Description

Volunteer Bridge is a backend API built with **Node.js, Express, Sequelize, and MySQL** for managing volunteer projects, tasks, reports, notifications, and users.

The system allows organizations to create projects, assign tasks to volunteers, track progress, submit reports, and send notifications.

This project is part of a collaborative backend development exercise.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT Authentication
* dotenv
* bcrypt
* Postman (for testing)

---

## 📂 Project Structure

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── services/
 ├── config/
 ├── app.js
 └── server.js
```

---

## ⚙️ Installation

Clone the repository

```
git clone <repo-url>
cd volunteer-bridge
```

Install dependencies

```
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root folder.

```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
DB_NAME=volunteer-bridge
DB_USER=volunteer_user
DB_PASSWORD=group4@techrush2026

JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
```

---

## 🗄️ Database Setup

Open MySQL Workbench and run:

```
CREATE DATABASE IF NOT EXISTS `volunteer-bridge`;

CREATE USER IF NOT EXISTS 'volunteer_user'@'localhost'
IDENTIFIED BY 'group4@techrush2026';

GRANT ALL PRIVILEGES ON `volunteer-bridge`.* TO 'volunteer_user'@'localhost';

FLUSH PRIVILEGES;
```

---

## ▶️ Running the Server

```
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🔐 Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
```

---

## 📁 Projects

```
POST /api/projects
GET /api/projects
```

---

## 📌 Tasks

```
POST /api/tasks/projects/:projectId/tasks
GET /api/tasks/projects/:projectId/tasks
POST /api/tasks/:id/assign
```

---

## 📝 Reports

```
POST /api/reports
GET /api/reports/:id
GET /api/reports/user/:userId
GET /api/reports/project/:projectId
GET /api/reports/system
```

---

## 🔔 Notifications

```
GET /api/notifications
PUT /api/notifications/:id/read
```

---

## 👥 Volunteers

```
GET /api/volunteers
```

(Admin / authorized users only)

---

## 💰 Donations

(Not fully implemented yet)

```
POST /api/donations
GET /api/donations
```

---

## 🧪 Testing

Use Postman to test endpoints.

Steps:

1. Register user
2. Login
3. Copy token
4. Use Bearer Token in Authorization
5. Test endpoints

---

## 👨‍💻 Contributors

* Backend Team
* TechRush Group 4

---

## 📌 Notes

* All protected routes require JWT token
* Use Authorization → Bearer Token in Postman
* Server must be running before testing
* MySQL must be running

---
