### API Documentation
#### Endpoints
#### Users
* `GET /users`: Retrieve a list of all users
* `GET /users/{id}`: Retrieve a user by ID
* `POST /users`: Create a new user
* `PUT /users/{id}`: Update an existing user
* `DELETE /users/{id}`: Delete a user


#### Tasks
* `GET /tasks`: Retrieve a list of all tasks
* `GET /tasks/{id}`: Retrieve a task by ID
* `POST /tasks`: Create a new task
* `PUT /tasks/{id}`: Update an existing task
* `DELETE /tasks/{id}`: Delete a task


#### Projects
* `GET /projects`: Retrieve a list of all projects
* `GET /projects/{id}`: Retrieve a project by ID
* `POST /projects`: Create a new project
* `PUT /projects/{id}`: Update an existing project
* `DELETE /projects/{id}`: Delete a project



#### Comments
* `GET /comments`: Retrieve a list of all comments
* `GET /comments/{id}`: Retrieve a comment by ID
* `POST /comments`: Create a new comment
* `PUT /comments/{id}`: Update an existing comment
* `DELETE /comments/{id}`: Delete a comment




#### Authentication
* `POST /auth/login`: Authenticate a user and retrieve an access token
* `POST /auth/register`: Register a new user


* `POST /auth/logout`: Logout a user and invalidate their access token

#### Error Handling
The API uses HTTP status codes to indicate the success or failure of each request. The following error codes are used:

- 200 OK: Request was successful.
- 400 Bad Request: Invalid request parameters or data.
- 401 Unauthorized: User is not authenticated or has invalid credentials.
- 403 Forbidden: User does not have permission to perform the requested action.
- 500 Internal Server Error: An unexpected error occurred on the server.

#### Pagination
Pagination is supported for some endpoints using query parameters. For example, to retrieve a page of users with a limit of 10 items per page, you can use the following endpoint:
```bash
GET /users?page=1&limit=10
```
This will return a list of 10 users, starting from the first page. You can adjust the
page and limit parameters to retrieve different pages of data.