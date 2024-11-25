# Blog Website

This is a blog website project that allows users to read and write blog posts. The project consists of a frontend and a backend.

## Backend

The backend is hosted at: [Backend URL](https://backend.i-try-thats-me-301.workers.dev)

### Technologies Used

- Node.js
- Express
- MongoDB
- JWT for authentication

### Endpoints

- `GET /api/v1/blog/:id` - Fetch a single blog post by ID
- `GET /api/v1/blog/bulk` - Fetch multiple blog posts
- `POST /api/v1/blog` - Create a new blog post (requires authentication)
- `PUT /api/v1/blog/:id` - Update a blog post by ID (requires authentication)
- `DELETE /api/v1/blog/:id` - Delete a blog post by ID (requires authentication)

## Frontend

The frontend is hosted at: [Frontend URL](https://blog-website-git-main-sumanyu-sharmas-projects.vercel.app/)

### Technologies Used

- React
- TypeScript
- Tailwind CSS
- Axios for API requests
- React Router for navigation

### Features

- View a list of blog posts
- View a single blog post
- Create, update, and delete blog posts (requires authentication)
- User authentication and authorization
