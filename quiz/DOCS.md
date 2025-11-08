# Quiz Application Documentation

## Overview

The Quiz Application is a full-stack web application that allows users to take quizzes and administrators to manage quizzes and questions. It features user authentication, role-based access control, and a responsive user interface.

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Role-Based Access**: Admin and user roles with different permissions
- **Quiz Management**: Admins can create quizzes and add questions
- **Quiz Taking**: Users can select and take available quizzes
- **Results Tracking**: Store and display quiz results
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- **React 19**: JavaScript library for building user interfaces
- **React Router DOM 7.9.5**: Declarative routing for React
- **Redux Toolkit 2.9.2**: State management library
- **Axios 1.13.1**: HTTP client for API requests
- **CSS**: Styling with custom CSS files

### Backend

- **Node.js**: JavaScript runtime
- **Express 5.1.0**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose 8.19.2**: MongoDB object modeling
- **JWT 9.0.2**: JSON Web Tokens for authentication
- **bcryptjs 3.0.2**: Password hashing
- **Morgan 1.10.1**: HTTP request logger
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 17.2.3**: Environment variable management

## Architecture

The application follows a client-server architecture:

- **Client**: React single-page application
- **Server**: RESTful API built with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based token authentication
- **State Management**: Redux store for client-side state

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/quizapp
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The client will run on `http://localhost:3000`

### Database Setup

The application uses MongoDB. Make sure MongoDB is running locally or update the `MONGODB_URI` in the `.env` file to point to your MongoDB instance.

## Usage

### User Registration and Login

1. Access the application at `http://localhost:3000`
2. Click on "Login" or navigate to `/login`
3. Register a new account or login with existing credentials
4. Admins can be created by setting the role during registration or updating in the database

### For Users

1. After login, view available quizzes on the main page
2. Click "View Available Quizzes" to see the quiz list
3. Select a quiz to start taking it
4. Answer questions and navigate through the quiz
5. View results after completion

### For Admins

1. After login, admins see the admin dashboard
2. Click "Add New Quiz" to create a quiz
3. Click "Add Question to Quiz" to add questions to existing quizzes
4. Manage quizzes and view results

## API Documentation

The API is accessible at `http://localhost:3000/api`

### Authentication Routes

#### POST /api/auth/register

Register a new user.

**Request Body:**

```json
{
  "username": "string",
  "password": "string",
  "role": "user" | "admin" (optional, defaults to "user")
}
```

**Response:**

```json
{
  "msg": "User registered successfully"
}
```

#### POST /api/auth/login

Login a user.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "string",
    "role": "user" | "admin"
  }
}
```

### Protected Routes (Require Authentication)

All routes below require a JWT token in the Authorization header: `Bearer <token>`

#### GET /api/questions

Get questions for a quiz or all questions.

**Query Parameters:**

- `quizId` (optional): Filter questions by quiz ID

**Response:**

```json
[
  {
    "quizId": "string",
    "questions": [
      {
        "id": 1,
        "question": "string",
        "options": ["option1", "option2", "option3"]
      }
    ],
    "answers": [0, 1, 2],
    "createdAt": "date"
  }
]
```

#### POST /api/questions

Insert questions (Admin only).

#### DELETE /api/questions

Delete all questions (Admin only).

#### GET /api/result

Get all results.

**Response:**

```json
[
  {
    "username": "string",
    "result": [0, 1, 2],
    "attempts": 10,
    "points": 80,
    "achived": "string",
    "createdAt": "date"
  }
]
```

#### POST /api/result

Store a result.

**Request Body:**

```json
{
  "username": "string",
  "result": [0, 1, 2],
  "attempts": 10,
  "points": 80,
  "achived": "string"
}
```

#### DELETE /api/result

Delete all results (Admin only).

#### GET /api/quizzes

Get all quizzes.

**Response:**

```json
[
  {
    "quizId": "string",
    "createdAt": "date"
  }
]
```

#### POST /api/quizzes

Create a new quiz (Admin only).

**Request Body:**

```json
{
  "quizName": "string"
}
```

#### POST /api/questions/add

Add a question to a quiz (Admin only).

**Request Body:**

```json
{
  "quizId": "string",
  "question": "string",
  "options": ["option1", "option2", "option3"],
  "correctAnswer": 0 | 1 | 2
}
```

## Database Schema

### User Model

```javascript
{
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: Date,
  updatedAt: Date
}
```

### Question Model

```javascript
{
  quizId: { type: String, required: true },
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
}
```

### Result Model

```javascript
{
  username: { type: String },
  result: { type: Array, default: [] },
  attempts: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  achived: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}
```

## Frontend Components

### Main Components

- **App.js**: Main application component with routing
- **Main.js**: Dashboard/home page
- **Login.js**: User authentication
- **QuizList.js**: List of available quizzes
- **Quiz.js**: Quiz taking interface
- **Result.js**: Quiz results display
- **AdminDashboard.js**: Admin management interface
- **AddQuiz.js**: Quiz creation form
- **AddQuestion.js**: Question addition form

### Helper and Hooks

- **helper.js**: Utility functions including user existence check
- **FetchQuestion.js**: Custom hook for fetching questions
- **setResult.js**: Custom hook for managing results

### Redux Store

- **question_reducer.js**: Manages question state
- **result_reducer.js**: Manages result and user state
- **store.js**: Redux store configuration

## Project Structure

```
quiz-application/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── helper/
│   │   ├── hooks/
│   │   ├── redux/
│   │   └── styles/
│   ├── package.json
│   └── README.md
├── server/
│   ├── controller/
│   ├── database/
│   ├── models/
│   ├── router/
│   ├── package.json
│   └── server.js
├── TODO.md
├── todo.tldr
└── DOCS.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please open an issue in the repository.
