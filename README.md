# NestJS Starter Project with Authentication, Middleware, JWT, and Multi-Language Support

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
---

## About the Project
This project serves as a boilerplate for building robust backend applications using NestJS. It includes essential features like authentication (email/password and OAuth providers), JWT-based authorization, middleware handling, multi-language support for messages and emails, and a well-structured architecture for scalability.

---

## Features

- **Authentication**: Supports email/password and OAuth (e.g., Google).
- **JWT Tokens**: Access and refresh token implementation for secure sessions.
- **Custom HTTP Responses**: Built-in response builder for standardized responses.
- **Multi-Language Support**: Dynamic error/success messages and email templates in English, French, and Arabic.
- **Email Service**: Integrated email service using Nodemailer.
- **Modular Structure**: Clean and scalable project organization.
- **Middlewares and Decorators**: For handling permissions and processing requests.

---

## Folder Structure

```
src
├── core
│   ├── config           # Application configurations
│   ├── constants        # Constants used across the app
│   ├── decorators       # Custom decorators
│   ├── enums            # Enums for various use cases
│   ├── interfaces       # Shared interfaces
│   ├── lib              # Libraries and helpers
│   ├── mail-templates   # Email templates
│   ├── mappers          # Mapping utilities
│   ├── middlewares      # Custom middlewares
│   └── utils            # Utility functions
├── modules
│   ├── auth             # Authentication module
│   └── user             # User management module
├── test                 # Unit and integration tests
├── app.controller.ts    # Main controller
├── app.module.ts        # Root module
├── app.service.ts       # Root service
└── main.ts              # Application entry point
```

---

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ouardini14/Starter-MongoDB-NestJS.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Starter-MongoDB-NestJS
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory based on the `.env.example` file and configure the following variables:

```env
LOGIN_SECRET_KEY=your_secret1
REFRESH_SECRET_KEY=your_secret12
VERIFY_USER_SECRET_KEY=your_secret3
RESET_PASSWORD_SECRET_KEY=your_secret4
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
MONGO_URL="your_mongo_url"
MAIL_HOST=for_ex:_smtp.gmail.com
MAIL_USER=test@gmail.com
MAIL_PASS=password_example
```

### Running the Application

- Development mode:
  ```bash
  npm run start:dev
  ```

- Production mode:
  ```bash
  npm run build
  npm run start:prod
  ```

---

## API Documentation

This project uses Swagger for API documentation.

1. Run the application.
2. Visit the Swagger documentation at `http://localhost:2100/api-docs` (or your configured port).

---

## Technologies Used

- **NestJS**: A progressive Node.js framework.
- **@nestjs/mongoose**: NoSQL database for data storage.
- **@nestjs/jwt**: For secure token-based authentication.
- **@nestjs-modules/mailer**: For sending emails.
- **@nestjs/swagger**: For API documentation.


