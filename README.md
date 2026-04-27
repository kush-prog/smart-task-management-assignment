# Smart Task Management API

A comprehensive, production-ready RESTful API for managing tasks. This system is built with Node.js, Express, TypeScript, and MongoDB. It features secure JWT authentication, role-based authorization (User vs. Admin), robust task CRUD operations with data isolation, and an analytics module.

---

## 🚀 Features
- **Secure Authentication:** User registration and login using JSON Web Tokens (JWT) with bcryptjs for password hashing.
- **Task Management (CRUD):** Users can create, read, update, and delete tasks. 
- **Data Isolation:** A user can only access and modify their own tasks. The system validates ownership on every request.
- **Role-Based Access Control (RBAC):** Distinct `user` and `admin` roles. Admins have access to system-wide data.
- **Analytics Engine:** 
  - Personal analytics for users (task completion rates, overdue tasks, status breakdowns).
  - System-wide analytics for admins (total users, total tasks, global completion rates).
- **Interactive API Documentation:** Integrated Swagger UI for testing and exploring endpoints directly from the browser.
- **Automated Testing:** Comprehensive unit and integration testing suite using Jest, Supertest, and an in-memory MongoDB server.

---

## 🛠️ Tech Stack
- **Runtime & Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Database & ORM:** MongoDB, Mongoose
- **Security:** bcryptjs (hashing), jsonwebtoken (auth), helmet (HTTP headers), cors
- **Documentation:** swagger-jsdoc, swagger-ui-express
- **Testing:** Jest, Supertest, mongodb-memory-server

---

## ⚙️ Setup & Installation Steps

Follow these instructions to run the project locally on your machine.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed (v16 or higher).
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account, or a local MongoDB server.

### 2. Clone the Repository
```bash
git clone [https://github.com/kush-prog/smart-task-management-assignment.git]
cd node_final_assignment
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables Configuration
Create a `.env` file in the root directory. You must configure these variables for the application to run successfully:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Security
JWT_SECRET=your_secure_random_jwt_secret_key
JWT_EXPIRES_IN=7d

# CORS Allowed Origin
CLIENT_URL=http://localhost:3000
```

### 5. Running the Application
Start the development server (uses `nodemon` and `ts-node` for hot-reloading):
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

### 6. Running the Test Suite
The project uses an in-memory MongoDB server for testing, meaning tests won't affect your real database.
```bash
npm test
```
To view the test coverage report:
```bash
npm run test:coverage
```

### 7. Production Build
Compile the TypeScript code into optimized JavaScript:
```bash
npm install --include=dev && npm run build
npm start
```

---

## 🛡️ Role Management & Creating an Admin

By design, **you cannot register an admin through the API**. 
The `/api/auth/register` endpoint only accepts `name`, `email`, and `password`. It intentionally ignores any `role` field passed in the request body to prevent unauthorized users from granting themselves administrative privileges. By default, every new user is assigned the `user` role.

### How to create an Admin account:
Since admins have sweeping privileges to view all users and system tasks, they must be provisioned directly at the database level:
1. Register a standard account via the `/api/auth/register` API endpoint or the Swagger UI.
2. Log in to your database directly (e.g., via MongoDB Atlas UI or MongoDB Compass).
3. Locate the newly created user document in the `users` collection.
4. Manually update the `role` field from `"user"` to `"admin"`.
5. Log in with that account to receive an admin-level JWT.

---

## 📖 API Documentation

Once the server is running, the easiest way to interact with the API is through the built-in Swagger interface.

**Swagger UI URL:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

> **Note on Authentication:** To use protected routes in Swagger, first hit the `/api/auth/login` endpoint, copy the `token` from the response, click the green **"Authorize"** button at the top of the page, and paste your token.

### 1. Authentication Routes (Public)
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/auth/register` | Register a new standard user | `{ name, email, password }` |
| `POST` | `/api/auth/login` | Authenticate user and receive JWT | `{ email, password }` |

### 2. Task Routes (Requires Auth: User or Admin)
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/tasks/create` | Create a new task assigned to the logged-in user | `{ title, description, priority, dueDate }` |
| `GET`  | `/api/tasks/all` | Retrieve all tasks owned by the logged-in user | - |
| `GET`  | `/api/tasks/:id` | Retrieve specific task details by ID | - |
| `PUT`  | `/api/tasks/:id` | Update a specific task (must be owned by user) | `{ status, priority, description, etc. }` |
| `DELETE`| `/api/tasks/:id` | Delete a specific task | - |

### 3. Admin Routes (Requires Auth: Admin Role Only)
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET`  | `/api/admin/users` | Retrieve a list of all registered users (passwords excluded) | - |
| `GET`  | `/api/admin/tasks` | Retrieve all tasks across the entire system with populated user data | - |

### 4. Analytics Routes (Requires Auth)
| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `GET`  | `/api/analytics/summary`| Retrieve personal task statistics (completion rate, overdue counts, etc.) | User |
| `GET`  | `/api/analytics/overview`| Retrieve system-wide statistics (total users, global completion rate, etc.) | Admin |
