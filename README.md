# Admin Dashboard API

This is the repository for the Admin Dashboard API project, which provides an API for interacting with the Admin Dashboard application.

## Project Overview

This project implements the server-side of the Admin Dashboard application. It is built on Node.js, using the Express.js framework to implement the API and Mongoose for interacting with the MongoDB database.

## Requirements

Before getting started with the project, make sure the following tools are installed on your computer:

- Node.js (version 16 or higher)

## Tools

Admin Dashboard is built using the following tools:

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)

## Installation

1. Clone this repository to your local computer.
2. Open the terminal and navigate to the root folder of the project.
3. Run the command `npm install` to install the project dependencies.
4. To start the project run the command `npm start`.

## Configuration

1. Create a `.env` file in the root folder of the project.
2. Specify the necessary environment variables in this file.

### Required environment variables:

```
DB_HOST=host of database of mongodb
PORT=number of localhost port
SECRET_KEY=secret key for jwt encryption
BASE_URL=base URL of the back-end project

```
