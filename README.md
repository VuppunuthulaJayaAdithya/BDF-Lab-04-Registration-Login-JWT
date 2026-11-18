
# Lab 4: Registration, Login and JWT

**Name:** V. Jaya Adithya  
**Registration Number:** 252U1R1259  
**University:** Aurora University  
**Section:** 211 & S-16

## Project Description
This project implements user registration and login using Node.js, Express, SQLite, bcrypt and JSON Web Tokens (JWT).

Passwords are hashed using bcrypt before being stored in the database. Successful login generates a JWT token.

## Technologies Used
- Node.js
- Express.js
- SQLite
- bcrypt
- jsonwebtoken

## Installation

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Server URL: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Check server status |
| POST | /register | Register a new user |
| POST | /login | Login and generate JWT |

## Screenshots

### 1. Server Running
![Server Running](screenshots/01-server-running.png)

### 2. Registration Success
![Registration Success](screenshots/02-register-success.png)

### 3. Registration Failure
![Registration Failure](screenshots/03-register-failure.png)

### 4. Login Success
![Login Success](screenshots/04-login-success.png)

### 5. Login Failure
![Login Failure](screenshots/05-login-failure.png)

### 6. Unknown User
![Unknown User](screenshots/06-unknown-user.png)

## Notes
- Passwords are stored as bcrypt hashes.
- Duplicate usernames are rejected.
- Incorrect login credentials are rejected.
- JWT tokens are generated after successful authentication.
- API endpoints were tested using PowerShell.

## Deployment
Not deployed yet.
