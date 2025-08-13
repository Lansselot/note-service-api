# Note Service API

Note Service API is a RESTful service for creating and managing notes.

## Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Redis**
- **Passport.js (JWT, Google OAuth2)**
- **Nodemailer (OTP)**
- **Swagger**
- **express-validator**
- **Docker**

## API

You can explore and test the API via Postman: [Postman Collection](https://www.postman.com/joint-operations-administrator-77381127/note-service-api/overview)

API documentation is also available via Swagger:

- Swagger UI — [http://localhost:3000/docs](http://localhost:3000/docs) (replace `localhost:3000` with your host and port)
- OpenAPI JSON: `/docs`

## Quick Start with Docker

1. Create a `.env` file based on `.env.example` file and update the values.

   > If you do not provide `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google authentication, or `GOOGLE_EMAIL` and `GOOGLE_APP_PASSWORD` for OTP authentication, the corresponding endpoints will not function.

2. Start the application:

```
docker-compose up --build
```

This will start Postgres, Redis, and the application.

## Architecture

`src/`  
--- `clients/` -- External service clients (Nodemailer, Prisma, Redis)  
--- `config/` -- Configuration files (Passport strategies, etc.)  
--- `controllers/` -- Handle incoming HTTP requests and responses  
--- `middlewares/` -- Auth middleware, error handling, validate etc.  
--- `routes/` -- Define API endpoints and route them to controllers  
--- `services/` -- Business logic, called by controllers  
--- `types/` -- Types definitions and interfaces  
--- `validators/` -- Data validation schemas  
--- `app.ts` -- Application setup and middleware registration  
--- `server.ts` -- Server start and listening logic
