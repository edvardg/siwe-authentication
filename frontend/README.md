## Description

SIWE Authentication frontend test system.

## Project Main Structure
This is the project main structure:
* app
    * (auth)
        - sign-in
        - sign-up
    * (dashboard)
        - profile
    * components
        - auth
        - header
        - user
* public


**_app_** directory contains the codebase of the app:
* *(auth)* - contains pages for signin and signup,
* *(dashboard)* - contains a page for user profile,
* *components* - contains all the components of the app.

**_public_** directory contains all necessary assets of the frontend app.


## Installation
In order to install project dependencies the following command needs to be executed:

```bash
$ npm install
```

## Local Development

A local *.env* file should be created with environment variables. Please have a look at *.env.example* file for the env variable.

Run the following command to start the service (in watch mode):

```bash
npm run dev
```
