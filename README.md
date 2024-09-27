# Todo List API

This is a simple RESTful API for managing todo lists. It allows users to sign up, sign in, and manage their todo lists.

## Description

This Todo List API is a RESTful API designed to manage todo lists for users. It provides a range of endpoints for creating, reading, updating, and deleting (CRUD) todo items, as well as user authentication and authorization.
The API uses a MongoDB database to store todo items and user data, and is built using the Express.js framework. It also utilizes JSON Web Tokens (JWT) for authentication and authorization. 

The API provides the following features:

- User Authentication: Users can sign up and sign in to the API using a username and password.
- Todo Item Management: Users can create, read, update, and delete todo items.
- Todo Item Filtering: Users can filter todo items by title, description, and completion status.
- Todo Item Sorting: Users can sort todo items by creation date, completion date, and priority.
- Error Handling: The API provides error handling for invalid requests, authentication errors, and database errors.

## Installation

1. Clone the repository: `git clone git@github.com:ahsas-sharma/todo-list-api.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your MongoDB connection string and secrets:

```
MONGO_URL=mongodb://localhost:27017/todo-list-api
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
```

## Usage

1. Start the server: `npm run dev`
2. You can use Postman or any other API testing tool to test the endpoints.

## Endpoints

### Users Routes

- `POST /api/users/sign-up` - create a new user
- `POST /api/users/sign-in` - sign in a user
- `GET /api/users` - get all users
- `GET /api/users/refresh` - generate new access and refresh tokens

### Todos Routes

- `POST /api/todos` - create a new todo
- `GET /api/todos` - get all todos
- `PUT /api/todos/:id` - update a todo
- `DELETE /api/todos/:id` - delete a todo

### Query Parameters for GET /api/todos

- `page` - the page number (default: 1)
- `limit` - the number of items per page (default: 10)
- `filter` - filter todos by title or description (default: "")
- `sort` - sort todos by their creation date (default: "desc")

## Built With

- Node.js - JavaScript runtime environment
- Express.js - a minimal and flexible Node.js web application framework
- MongoDB - NoSQL database
- Mongoose - Object Data Modeling (ODM) library for MongoDB
- JSON Web Tokens - compact, URL-safe means of representing claims to be transferred between two parties

## License

This project is licensed under the terms of the MIT license.
