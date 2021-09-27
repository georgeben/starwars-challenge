# Starwars Challenge 🛰
[![Continuous-Integration](https://github.com/georgeben/starwars-challenge/actions/workflows/ci.yml/badge.svg)](https://github.com/georgeben/starwars-challenge/actions/workflows/ci.yml)  
A simple RESTful API to fetch information about starwars films

## Technologies
- Javascript: Programming language
- Node.js - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
- Express.js - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- Postgresql - PostgreSQL is a powerful, open source object-relational database system .
- Docker - Docker is a tool designed to make it easier to create, deploy, and run applications by using containers.
- Docker Compose - A tool for defining and running multi-container Docker applications

## API Documentation
Click here for the [API Documentation](https://starwars-george.herokuapp.com/rest-docs/)

## Architecture
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Coding Styles
- Object Oriented Programming
- ES6 imports

## Getting started
Follow the instructions given below to get this project up and running on your local machine.

### Prerequisites
Make sure you have the following installed:
- [Docker](https://docker.com)
- [NodeJS](http://nodejs.org)
- [PostgreSQL](http://nodejs.org)

### Installation using Docker
1. Clone this repository by running `git clone git@github.com:georgeben/starwars-challenge.git`
2. `cd` into the cloned repository
3. Create a file in the project's root named `.env`. Copy the content of `.env.schema` and paste it into `.env`. Fill in the appropriate values for the credentials listed.
4. If a database does not already exist, run `docker-compose --env-file .env run starwars-challenge-api npm run db:create` to create a database for the application.
5. Start the application by running `docker-compose up`. Make sure you have stable internet connection, as some docker images may need to be downloaded.
6. Access the application at http://localhost:[PORT]

### Installation without Docker
1. Clone this repository by running `git clone git@github.com:georgeben/starwars-challenge.git`
2. `cd` into the cloned repository
3. Create a file in the project's root named `.env`. Copy the content of `.env.schema` and paste it into `.env`. Fill in the appropriate values for the credentials listed.
4. Run `npm install`
5. Ensure you have your Postgresql server running
6. If a database does not already exist, run `npm run db:create` to create the database.
7. Run `npm run migrate:up` to run all migrations.
8. Run `npm run start:dev`

## Scripts
- `npm run build`: Compiles source code using Babel
- `npm run prestart`: Builds code and run migrations before the app starts
- `npm run start:dev`: Starts the app in development mode using nodemon. The app is restarted on any file change, which makes development a bit faster.
- `npm run start`: Starts the app in production mode
- `npm run test`: Run tests
- `npm run lint`: Lint code using ESLint
- `npm run docs:api`: Generates API documentation
- `npm run migrate:up`: Runs DB migrations
- `npm run db:seed`: Seeds database
- `npm run db:create`: Creates the database if it doesn't exist
- `npm run db:drop`: Drops the database. Be careful! All data may be lost!


## Continous Integration
- CI is setup using Github Actions

## Author
Kurobara Benjamin George
