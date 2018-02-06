# 16 Basic Auth
This is a program that allows users to create a user account with a username, email, and password, then encrypts the password before saving to the MongoDB. It uses an authenication process to check for valid username and password when signing back in.

## Installing and Getting Started
Fork and git clone this repository to your local computer. Navigate to `lab-melanie` from the terminal and enter `npm install`, this will install all necessary packages to run the program.

You can use HTTPie or Postman to create new users and sign in, I will demonstrate examples with HTTPie:

From the command line, type
```
http POST :3000/api/v1/signup username=<username> password=<password> email=<email>
```
A user is then posted in the database.

To sign in (or GET a record from the database)
```
http -a <username>:<password> :3000/api/v1/signin
```
If the username or password is incorrect, an error message will display.

---

## Data Structures
`route-auth` contains `POST` and `GET` methods to the database.
`auth` creates a user and encrypts the password.

---

## Tests
The tests check for valid input recieving valid output, 201 status for `POST` and `200` for `GET`.
The test also check for invalid request returning and expected error status, `404` and `400` for `POST`, `404` and `401` for `GET`.
