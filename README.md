# Mini Twitter API (CSE343 Lab 8)

REST API built with Node.js + Express. Data is stored in JS arrays (in memory).

## Run
```
npm install
npm start
```
Server runs on http://localhost:3000

## Endpoints
| Method | Path                 | Description         | Success |
|--------|----------------------|---------------------|---------|
| POST   | /posts               | Upload a post       | 201     |
| GET    | /posts               | Read all posts      | 200     |
| GET    | /posts/:id           | Read one post       | 200     |
| PUT    | /posts/:id           | Edit a post         | 200     |
| DELETE | /posts/:id           | Delete a post       | 204     |
| POST   | /posts/:id/comments  | Add a comment       | 201     |
| GET    | /posts/:id/comments  | Read post comments  | 200     |

Errors: 400 (missing fields), 404 (post not found)