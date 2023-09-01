# COVID-19DataTracker-Backend 🦠📊

![COVID-19 Data](./Images/Covid_19_Image.jpg)

This repository contains the backend code for the <b>COVID-19</b> Data Tracker application. The backend is built using Express.js and a MySQL database to extract, store, and serve COVID-19 data from reliable sources. The goal of the backend is to provide a scalable and efficient solution for managing and analyzing COVID-19 data.

## Table of Contents
- 📋 [Introduction](#introduction)
- 🚀 [Features](#features)
- 🛠️ [Installation](#installation)
- 📡 [API Endpoints](#api-endpoints)
- 🔑 [API Key Validation](#api-key-validation)
- ❌ [Error Handling](#error-handling)
- 📖 [Usage](#usage)
- 🐞 [Bugs](#bugs)
- 🎨 [Styling](#styling)
- 💻 [Process](#process)
- 📜 [License](#license)
- 👥 [Authors](#authors)

## Introduction

The <b>COVID-19</b> Data Tracker Backend is designed to handle various aspects of <b>COVID-19</b> data, including retrieving data from external APIs, storing it in a database, and providing endpoints for querying and analyzing the data. It serves as the backbone of the <b>COVID-19</b> Data Tracker application, facilitating data-driven insights into the pandemic.

## Features

### Data Extraction 🌐

- The backend fetches <b>COVID-19</b> data from reliable external APIs to ensure the accuracy and currency of the data. By sourcing data from reputable sources, the backend provides a foundation for data-driven insights and analysis.

### Data Storage 🗄️

- The backend employs a robust <b>MySQL</b> relational database for secure storage of daily <b>COVID-19</b> data. Utilizing a relational database offers advantages in managing large datasets, enabling efficient data retrieval and query operations as the dataset grows.

### Filtering 🔍

- Various endpoints allow users to query and analyze <b>COVID-19</b> data using specific parameters. Whether it's data for a particular date, state, or other criteria, the backend supports advanced data analysis, empowering users with insights into the pandemic's impact.

### Custom Errors ❗

- Custom error classes enhance error handling with informative messages. These classes, like `NotFound` and `DatabaseError`, not only improve user experience but also integrate seamlessly with future enhancements, such as a logging system like Sentry.

### Parameter Validation and Security 🔐

- Stringent parameter validation safeguards data integrity and application operation. Rigorous testing against API testers ensures resilience and security. Combined with API key validation, this approach mitigates potential threats.

## Installation
## Node Installation :space_invader:

<p align="center">
  <img src="./Images/Node.png" alt="node logo" height=250>
</p>

### Prerequisites :ghost:

- Node.js (version 18 or higher)
- npm (Node Package Manager)

### Installation Steps :skier:

**1.** Clone the repository

**2.** Set up environment variables:

- Create a file with `.env` extension in the root directory of the project.
- Open the `.env` file and update the necessary variables:

```env
DATABASE_NAME=<database-name-mysql>
DATABASE_USER=<database-user-mysql>
DATABASE_PASSWORD=<database-password-mysql>
DATABASE_HOST=<database-host-mysql>
COVID_19_PORT=<application-port>
API_KEYS_AUTHORIZED=<authorized-api-keys>
```

Replace `<database-name-mysql>`,`<database-user-mysql>`, `<database-password-mysql>`, `<database-host-mysql>`, `<application-port>` and `<authorized-api-keys>` with the actual values for your environment.

- If the `.env` file doesn't export the variables correctly, you can manually export them by running the following commands in the terminal (replace `<value>` with the actual value for each variable):

```bash
export DATABASE_NAME=<value>
export DATABASE_USER=<value>
export DATABASE_PASSWORD=<value>
export DATABASE_HOST=<value>
export COVID_19_PORT=<value>
export API_KEYS_AUTHORIZED=<value>
```

Make sure to export the variables correctly to ensure the project works as expected.

**3.** Generate SSL certificate files and Set Up Database:

- Run the existing script called `start_app.sh` to generate the SSL certificate files.

```ruby
./start_app.sh
```

This script generates SSL certificate files (`server.key` and `server.cert`) and moves them to the `SSL_Certificates` directory. It also creates the user and the database in MySQL, providing the required security certificates.

Please note that the generated key and certificate are suitable for development purposes only. In a production environment, you should obtain a trusted SSL certificate from a certificate authority (CA) to ensure secure communication with the API.

**4.** Create the Data in the database

- Run the existing script called `SetUpDatabase.js` to generate the database structure and data.

```node
node src/Database/SetUpDatabase.js
```

This script will create all the data in the database with the necessary data structure.

**5.** Install dependencies:

```ruby
npm install
```

**5.** Start the server:

```ruby
npm start
```

The API will be accessible at `https://localhost:<port>/api`.

## Docker Installation :robot:

<p align="center">
  <img src="./Images/Docker.png" alt="docker logo" height=250>
</p>

### Prerequisites :alien:

- Docker Engine

### Installation Steps :snowboarder:

**1.** Clone the repository

**2.** Set up environment variables:

- Create a file with `.txt` extension in the root directory of the project.
- Open the `.txt` file and update the necessary variables:

```env
DATABASE_NAME=<database-name-mysql>
DATABASE_USER=<database-user-mysql>
DATABASE_PASSWORD=<database-password-mysql>
DATABASE_HOST=<database-host-mysql>
COVID_19_PORT=<application-port>
API_KEYS_AUTHORIZED=<authorized-api-keys>
```
Replace `<database-name-mysql>`,`<database-user-mysql>`, `<database-password-mysql>`, `<database-host-mysql>`, `<application-port>` and `<authorized-api-keys>` with the actual values for your environment.

You need to keep in mind that if the database is in your local machine your `DATABASE_HOST` need to be set to `host.docker.internal`

**3.** Generate SSL certificate files and Set Up Database:

- Run the existing script called `start_app.sh` to generate the SSL certificate files.

```ruby
./start_app.sh
```

This script generates SSL certificate files (`server.key` and `server.cert`) and moves them to the `SSL_Certificates` directory. It also creates the user and the database in MySQL, providing the required security certificates.

Please note that the generated key and certificate are suitable for development purposes only. In a production environment, you should obtain a trusted SSL certificate from a certificate authority (CA) to ensure secure communication with the API.

**4.** Create the Data in the database

- Run the existing script called `SetUpDatabase.js` to generate the database structure and data.

```node
node src/Database/SetUpDatabase.js
```

This script will create all the data in the database with the necessary data structure.

**5.** Build the Docker image:

```ruby
docker build -t covid_19_tracer_image .
```

**6.** Start the Docker container:

```ruby
docker run --env-file <your-file.txt> -p <host-port>:<container-port> --name covid_19_tracer_container covid_19_tracer_image
```
Replace `<host-port>` with the desired port number on your host machine and `<container-port>` with the corresponding port number specified in the .txt file (usually 5000).

The API will be accessible at `https://localhost:<port>/api`.

## API Endpoints :page_with_curl:

The API exposes the following endpoints:

- **GET /us/daily**: Retrieves all US data.
- **GET /us/daily/:date**: Retrieves US data by a specified date.
- **GET /us/tops**: Retrieves the top 3 records of the total cases, total deaths, total testing from the entire US.
- **GET /states/:stateCode/daily**: Retrieves all data for a specific state.
- **GET /states/:stateCode/:date**: Retrieves data for a specific state and date.
- **GET /states**: Retrieves all the posible states.
- **GET /states/tops**: Retrieves the top 3 records of the total cases, total deaths, total testing from the states.

## API Key Validation :newspaper:

To ensure secure access to the API, the API Key validation middleware is implemented. The API Key must be included in the `Authorization` header of the request.

If the API Key is missing or invalid, you will receive a `401 Unauthorized` response.

```json
{
    "error": "Unauthorized"
}
```

## Error Handling :x:

The API handles errors and returns appropriate HTTP status codes and error messages in the response. The possible error status codes include:

- `400 Bad Request`: Indicates invalid request parameters or missing required fields. This can occur if the request is not properly formatted or if required data is missing.
- `401 Unauthorized`: Indicates that the request requires authentication, and either no credentials were provided or the provided credentials are invalid.
- `404 Not Found`: Indicates that the requested resource could not be found. This can occur if the specified endpoint or resource does not exist.
- `503 Service Unavailable`: Indicates that the server is currently unable to handle the request due to a temporary overload or maintenance. This can occur if there are issues connecting to the database.
- `500 Internal Server Error`: Indicates that a server error occurred. This can occur due to various reasons, such as unexpected exceptions or issues with the server infrastructure.

When consuming the API, make sure to handle these errors appropriately in your client application. You can inspect the HTTP status code of the response to determine the type of error that occurred. Additionally, the response may include an error message that provides more information about the specific error.

It's recommended to handle different error scenarios in your client application and provide meaningful feedback to the user based on the encountered errors.

## Usage :white_check_mark:

You can now start using the API by following the installation instructions and making requests to the provided endpoints.

## Bugs :bomb:
If you find any bug, please, let me know [mail](mailto:rayovianamiltonobed@gmail.com).

## Styling :page_with_curl:
All files have been written in the [semistandard](https://github.com/standard/semistandard) style.


## Process :desktop_computer:
If you want to watch the building process, you can type this in your console
```bash
git log --all --graph --decorate --oneline
```

## License
This project is licensed under the [MIT License](LICENSE).

## Authors

* [**Obed Rayo**](https://github.com/ObedRav) <a href="https://github.com/ObedRav" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>
