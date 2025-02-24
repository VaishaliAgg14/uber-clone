# /users/register Endpoint Documentation

## Description

Endpoint to register a new user. Upon successful registration, an authentication token is generated.

## Method & URL

**POST** `/users/register`

## Request Data

- `fullname.firstname`: string (required, minimum 3 characters)
- `fullname.lastname`: string (optional, minimum 3 characters if provided)
- `email`: string (required, valid email format)
- `password`: string (required, minimum 5 characters)

## Response

- **201 Created**: User successfully registered, returns user object and authentication token.
- **400 Bad Request**: Validation error with details on invalid or missing fields.

## Example
