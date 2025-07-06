<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Hashmato Task API

A RESTful API built with [NestJS](https://nestjs.com/) for managing users, restaurants, dishes, categories, and orders. 

## Features
- User registration and management
- Restaurant, dish, category, and order CRUD
- PostgreSQL with TypeORM
- Swagger API documentation

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd task
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory with your database connection details:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
```

### 4. Run Database Migrations (if any)
```bash
npm run migration:create
```

### 5. Start the Application
```bash
npm run start:dev
```

The server will start on [http://localhost:3000](http://localhost:3000)

---

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/docs
```

You can explore and test all endpoints directly from the Swagger interface.

---

## Example API Usage

### User Endpoints
- **Register:**
  ```http
  POST /auth/register
  Content-Type: application/json
  {
    "name": "john_doe",
    "password": "password123"
  }
  ```
- **Get All Users:**
  ```http
  GET /user
  ```

### Restaurant Endpoints
- **Create Restaurant:**
  ```http
  POST /restaurant
  Content-Type: application/json
  {
    "name": "Pizza Place",
    ...
  }
  ```
- **Get All Restaurants:**
  ```http
  GET /restaurant
  ```

### Dish Endpoints
- **Create Dish:**
  ```http
  POST /dish
  Content-Type: application/json
  {
    "name": "Margherita Pizza",
    ...
  }
  ```
- **Get All Dishes:**
  ```http
  GET /dish
  ```

### Category Endpoints
- **Create Category:**
  ```http
  POST /category
  Content-Type: application/json
  {
    "name": "Italian"
  }
  ```
- **Get All Categories:**
  ```http
  GET /category
  ```

### Order Endpoints
- **Create Order:**
  ```http
  POST /order
  Content-Type: application/json
  {
    "userId": "...",
    "dishIds": ["...", "..."]
  }
  ```
- **Get All Orders:**
  ```http
  GET /order
  ```

---

## License
This project is for demonstration purposes only.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
