## Description

SIWE Authentication backend test system.

## Project Main Structure
This is the project main structure:
* src
    * common
        - decorators
        - exceptions
        - guards
        - strategies
        - types
    * database
    * modules
        - user
* test


**common** directory contains common functionalities and defined constants used in the project:
* *decorators* - contains decorators used in controllers,
* *exceptions* - contains different exception types used in the project,
* *guards* - contains access control guards, used to ensure that the caller has sufficient permission to execute a specific route,
* *strategies* - contains authentication strategies used by guards.
* *types* - contains general types used in the project.

**database** directory contains database data source (with DB configurations) and migration folder where all the database migration files get created.

**modules** directory contains components encapsulating a closely related set of capabilities:
* *user* - provides APIs and functionality for user signup, signin, profile retrieval.
In **test** directory should be located unit tests for project components.

## Installation
In order to install project dependencies the following command needs to be executed:

```bash
$ npm install
```

## Migrations
Database migrations needs to be executed in order to have a database created locally. The following command needs to be executed to run migrations:
```bash
$ npm run migration:run
```

Also, it is possible to generate and create custom migrations by using the following commands:
```bash
$ npm run migration:generate -- src/database/migrations/<migration_file_prefix>

$ npm run migration:create -- src/database/migrations/<migration_file_prefix>
```

In order to revert applied migration the following command can be used:
```bash
$ npm run migration:revert
```

## Local Development

A local *.env* file should be created with environment variables. Please have a look at *.env.example* file for the list of env variables.

Run the following command to start the service (in watch mode):

```bash
npm run start:dev
```

Please find more useful script in *package.json* file.


## Swagger Documentation

**Swagger** documentation is available in *http://localhost:4000/api-doc/* URL.


### Possible improvements/suggestions
The project can be improved as follows:
* Add unit test - they are crucial to make sure the functionality works as expected,
* Add *auth* module which handles *signin/signup* functionalities. Currently, these endpoints are located in *user.controller.ts* (according to the requirements), but ideally we would have a separate *auth* module with *signin/signup* functionalities and have only user creation logic in *user* module. Thus, we could have *auth/signin*, *auth/signup* and *auth/nonce* endpoints in the *auth* module and only *user/profile* endpoint in the *user* module.
* In my opinion it is redundant having microservices used in the project as we have only one *user* module. It makes sense to have microservices integrated in case of multiple modules.
