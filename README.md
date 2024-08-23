<div align="center" id="top"> 
 
  &#xa0;

</div>

<h1 align="center">Hux Assessment Backend</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/certifiedTboy/hux-assessment-backend?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/certifiedTboy/hux-assessment-backend?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/certifiedTboy/hux-assessment-backend?color=56BEB8">

</p>

- [Introduction](#Introduction)
- [Technologies](#Technologies)
- [Enviromental Variables](#Enviromental-Variables)
- [Get Started](#Get-Started)
- [CRUD Operations](#Crud-Operations)
- [Account Creation Flow](#Account-Creation-Flow)
- [Authentication Flow](#Authentication-Handling)
- [API Documentation](#API-Documentation)

<br>

## Introduction

This is hux assessment backend for a contact management system

## Technologies

The following technologies were used:

- [Node Js](#Node)
- [JWT for handling user authentication and authorization](#JWT)
- [Nodemailer and Google SMTP for handling email service](#)
- [Mongo Db for Data Persistency](#)

## Enviromental Variables

Refer to env.example file for all enviromental variables

## Get-Started

```bash
# Clone this project
$ git clone https://github.com/certifiedTboy/hux-assessment-backend.git

# Access
$ cd hux-assessment-backend

# Install dependencies
$ npm install

# Install nodemon as Dev dependencies
$ npm install -D nodemon

# Install jest & Supertest For automated tested
$ npm install -D jest supertest

# Run the project
$ npm start (Production server)
$ npm run dev (Development server)

# Run test
$ npm test

# The server will be initialized on the <http://localhost:3001>
```

## CRUD Operations

- All CRUD operations are available on the API [Documentation](https://documenter.getpostman.com/view/14393972/2sAXjDcuQy)

## Authentication Flow

- Authentication and Authorization is handled with Jsonwebtoken (JWT) and it follows the OAUTH2 flow standard
- On successful login, an access token and a refresh token is generated, access token is sent as an HTTP only flagged cookie to client with a validity period of 1 hour. The refresh token is sent as a JSON response. The refresh token has a validity period of 24 hours. Tokens are signed with the user unique Id and user first name, last name and email address
- All subsequent request that requires authorization must be made with the access token, which is sent as cookie data.
- On access token expiration, a request is made to a /access-token endpoint with refresh token as authorization header.
- If refresh token is valid and contains verifiable data, a new access token is sent back to client for subsequent request.
- on refresh token expiration, client is required to login again to generate new refresh token and access token
- For testing on POSTMAN agent, refer to [postman interceptor](https://learning.postman.com/docs/sending-requests/cookies/#:~:text=Postman%20can%20capture%20cookies%20for,with%20the%20Postman%20cookie%20jar.) to handle cookie
- On frontend libraries like React, authorization with cookies are easily handled with [Redux RTK Queries](https://redux-toolkit.js.org/tutorials/rtk-query)

## API Documentation

All API http request endpoints are available on [https://documenter.getpostman.com/view/14393972/2sA2r6YQLY](https://documenter.getpostman.com/view/14393972/2sA2r6YQLY)

Use [https://hux-assessment-backend-oay6.onrender.com](https://hux-assessment-backend-oay6.onrender.com) for live testing

<a href="#top">Back to top</a>
