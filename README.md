Telford Leisure Services (Backend)
============

This is the backend for my redesign project of the Telford Leisure Services sign up process. This backend was built with Nest.js which is a Node.js framework, with data stored in a MongoDB Atlas database.

---

## Demo

Here is a working live demo: https://telford-leisure-services-front.vercel.app/

---

## Key Features

* Ability for members to create new accounts
* Ability to login to the service
* Ability to give feedback on the service
* Forgotten member number retrieval via email
* Password reset functionality

---

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/chris-ian-jones/telford-leisure-services-back

# Go into the repository
$ cd telford-leisure-services-back

# Create an .env file
$ touch .env

# Add environment variables to the .env file (see Environment Variables table below)

# Install dependencies
$ npm install

# Run the app
$ npm run start:dev
```

> **Note**
> Here is a link to the frontend project which you will also need running locally on your computer: https://github.com/chris-ian-jones/telford-leisure-services-front

### Environment Variables

name | default | description
-----|---------|------------
`WEBTOKEN_SECRET_KEY` | | Specifies the secret string used to sign any JWTs - should be at least 32 characters, but the longer the better.
`WEBTOKEN_EXPIRATION_TIME` | `21600` | Specifies the amount of seconds before any generated JWTs expires.
`DB_URL` | | In order to connect to MongoDB, you will need a URI string (Uniform Resource Identifier) which is similar to a URL. For the URI string to work, you have to set up authentication for your MongoDB instance, and have created a username and password for read and write access to a MongoDB database.
`RESEND_API_KEY` | | Specifies the API key for your [resend](https://resend.com/) account.


---

## Built with 

- [Nest.js](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications
- [MongoDB Atlas](https://www.mongodb.com/atlas) - The multi-cloud application data platform
- [Resend](https://www.resend.com/) - Resend’s API is used as an email router to send out emails

---

## License
>You can check out the full license [here](https://github.com/chris-ian-jones/telford-leisure-services-back/blob/main/LICENSE)

This project is licensed under the terms of the **MIT** license.
