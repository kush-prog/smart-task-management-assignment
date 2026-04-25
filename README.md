# Smart Task Management API

A production-ready REST API for managing tasks, built with Node.js, Express, TypeScript, and MongoDB. It features secure JWT authentication, role-based authorization, task CRUD operations, and an analytics module.

## Features
- **Authentication:** User registration and JWT-based login with password hashing.
- **Task Management:** Full CRUD (Create, Read, Update, Delete) with data ownership protection (users can only access their own tasks).
- **Admin Privileges:** Role-based access control allowing admins to view all system users and tasks.
- **Analytics:** Endpoints to retrieve task statistics (completion rate, overdue counts, etc.) for individual users and system-wide overviews.
- **Testing:** Automated unit and integration tests using Jest and Supertest.

## Tech Stack
- **Backend:** Node.js, Express
- **Language:** TypeScript
- **Database:** MongoDB, Mongoose
- **Security:** bcryptjs, jsonwebtoken, helmet, cors
- **Testing:** Jest, Supertest, MongoDB Memory Server

---

## Setup Steps

Follow these instructions to run the project locally on your machine.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed (v16 or higher recommended).
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone [https://github.com/kush-prog/smart-task-management-assignment.git]
cd node_final_assignment
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of your project and add the following configurations. **Do not use placeholder values in production.**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_jwt_secret_key
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:3000
```

### 4. Running the Application
Start the application in development mode (with hot-reloading):
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

### 5. Running Tests
To run the automated test suite:
```bash
npm test
```
To generate a test coverage report:
```bash
npm run test:coverage
```

### 6. Production Build
To compile the TypeScript code to JavaScript and run the production build:
```bash
npm install --include=dev && npm run build
npm start
```

---

## API Documentation

All protected endpoints require an `Authorization` header formatted as:
`Authorization: Bearer <your_jwt_token>`

### Authentication Routes
| Method | Endpoint | Description | Request Body | Auth Required |
|--------|----------|-------------|--------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | `{ name, email, password }` | ❌ No |
| `POST` | `/api/auth/login` | Login and get token | `{ email, password }` | ❌ No |

### Task Routes
| Method | Endpoint | Description | Request Body | Auth Required |
|--------|----------|-------------|--------------|---------------|
| `POST` | `/api/tasks/create` | Create a new task | `{ title, description, priority, dueDate }` | ✅ Yes (User) |
| `GET`  | `/api/tasks/all` | Get all tasks for user| - | ✅ Yes (User) |
| `GET`  | `/api/tasks/:id` | Get single task by ID | - | ✅ Yes (User) |
| `PUT`  | `/api/tasks/:id` | Update task by ID | `{ status, priority, etc. }` | ✅ Yes (User) |
| `DELETE`| `/api/tasks/:id` | Delete task by ID | - | ✅ Yes (User) |

### Admin Routes
| Method | Endpoint | Description | Request Body | Auth Required |
|--------|----------|-------------|--------------|---------------|
| `GET`  | `/api/admin/users` | Get all registered users | - | ✅ Yes (Admin) |
| `GET`  | `/api/admin/tasks` | Get all tasks in system| - | ✅ Yes (Admin) |

### Analytics Routes
| Method | Endpoint | Description | Request Body | Auth Required |
|--------|----------|-------------|--------------|---------------|
| `GET`  | `/api/analytics/summary`| Get user's personal stats| - | ✅ Yes (User) |
| `GET`  | `/api/analytics/overview`| Get system-wide stats | - | ✅ Yes (Admin) |
