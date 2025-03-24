# Express Authentication Project

This project demonstrates the implementation of various Express.js features including:
- JWT Authentication
- Cookie Management
- Theme Switching with Cookie Storage
- Static File Serving
- PUG Template Engine
- Protected Routes

## Features

- User registration and login with JWT
- Protected dashboard route
- Theme switching (light/dark) with cookie persistence
- Favicon support
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd express-auth-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=3000
JWT_SECRET=your-super-secret-key-change-this-in-production
```

4. Add a favicon.ico file to the `public` directory

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Routes

- `GET /` - Home page
- `GET /login` - Login page
- `POST /login` - Login form submission
- `GET /register` - Registration page
- `POST /register` - Registration form submission
- `GET /dashboard` - Protected dashboard page (requires authentication)
- `POST /theme` - Theme preference update

## Security Features

- JWT tokens stored in httpOnly cookies
- Protected routes using middleware
- Secure password handling (in a real application)

## Technologies Used

- Express.js
- JWT for authentication
- Cookie-parser for cookie management
- PUG template engine
- Node.js 