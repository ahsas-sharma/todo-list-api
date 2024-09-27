# Todo List API

This project is a RESTful API for managing todo lists, built using Node.js and Express.js. It allows users to sign up, sign in, and manage their todo lists efficiently with secure authentication and CRUD operations. The API also implements advanced features like filtering, sorting, pagination, and secure access using JWT.

> 📌 **Note**: This project was created based on the guidelines and requirements given at **[Roadmap.sh - Todo List API](https://roadmap.sh/projects/todo-list-api)** and is designed to demonstrate backend development concepts, including API design, database management, and security practices.

## 📜 Description

The Todo List API is designed to manage personal todo lists with a focus on security, scalability, and ease of use. It provides a range of endpoints for creating, reading, updating, and deleting (CRUD) todo items, along with user authentication and authorization mechanisms.

### Features:

- **User Authentication**: Users can sign up and sign in using a username and password, with tokens provided for secure access.
- **Todo Item Management**: Users can create, read, update, and delete their own todo items.
- **Todo Item Filtering**: Filter todo items by title, description, and completion status.
- **Todo Item Sorting**: Sort todo items by creation date, completion date, and priority.
- **Pagination**: Paginate the list of todos to enhance performance for large datasets.
- **Error Handling**: Centralized error handling for invalid requests, authentication issues, and database errors.
- **Security**: Utilizes access and refresh tokens for robust user authentication, allowing for a smooth, secure experience.
- **Rate Limits and Throttling**: Implements rate limiting and throttling to protect the API from excessive requests and abuse, ensuring stability and availability for all users.

## 🚀 Installation

1. **Clone the repository**: 
    ```bash
    git clone git@github.com:ahsas-sharma/todo-list-api.git
    ```
2. **Navigate to the project directory**: 
    ```bash
    cd todo-list-api
    ```
3. **Install dependencies**: 
    ```bash
    npm install
    ```
4. **Create a `.env` file** in the root directory and add your MongoDB connection string and secrets:
    ```bash
    MONGO_URL=mongodb://localhost:27017/todo-list-api
    ACCESS_TOKEN_SECRET=your-access-token-secret
    REFRESH_TOKEN_SECRET=your-refresh-token-secret
    ```

## 📘 Usage

1. **Start the server**: 
    ```bash
    npm run dev
    ```
2. Use Postman, Insomnia, or any other API testing tool to interact with the API.

## 📌 API Endpoints

### User Routes

- `POST /api/users/sign-up` - Create a new user account.
- `POST /api/users/sign-in` - Authenticate a user and receive tokens.
- `GET /api/users` - Retrieve a list of all users (Admin access required).
- `GET /api/users/refresh` - Generate new access and refresh tokens.

### Todo Routes

- `POST /api/todos` - Create a new todo item.
- `GET /api/todos` - Retrieve all todo items.
- `PUT /api/todos/:id` - Update a specific todo item.
- `DELETE /api/todos/:id` - Delete a specific todo item.

### Query Parameters for `GET /api/todos`

- `page` - The page number (default: 1).
- `limit` - The number of items per page (default: 10).
- `filter` - Filter todos by title or description (default: "").
- `sort` - Sort todos by their creation date (default: "desc").

## 🛠️ Built With

- **Node.js** - JavaScript runtime environment.
- **Express.js** - Minimal and flexible web application framework.
- **MongoDB** - NoSQL database for storing data.
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB.
- **JSON Web Tokens** - Compact and secure tokens for authentication and authorization.

## 🔐 Security Considerations

- **Password Hashing**: All user passwords are hashed before being stored in the database.
- **JWT Tokens**: Access and refresh tokens are used for secure user authentication.
- **Input Validation**: Ensures all user inputs are sanitized and validated.

## 📜 License

This project is licensed under the terms of the MIT license. Feel free to use, modify, and distribute it as per the license terms.
