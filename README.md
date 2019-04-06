# School REST API
This project uses Express to create a REST API. The API provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database. In addition, the project requires users to create an account and log-in to make changes to the database. This project was created for the purpose of the Treehouse Full Stack JavaScript Techdegree.

## Project Requirements

This project is reviewed and graded based on a set of requirements.

### Meets Expectations
* Mongoose is listed as a dependency in the package.json file
* Mongoose is configured to use the fsjstd-restapi MongoDB database that's generated by the npm run seed command
* A message is written to the console when there’s an error connecting to the database
* A message is written to the console when the database connection is successfully opened
* The user schema follows the provided specification: _id (ObjectId, auto-generated), firstName (String), lastName (String), emailAddress (String), password (String)
* The course schema follows the provided specification: _id (ObjectId, auto-generated), user (_id from the users collection), title (String), description (String), estimatedTime (String), materialsNeeded (String).
* All of the following user routes are available and return the following data as specified: GET /api/users 200 - Returns the currently authenticated user, POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content.
* All of the following course routes are available and return the following data as specified:
* GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
* GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
* POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
* PUT /api/courses/:id 204 - Updates a course and returns no content
* DELETE /api/courses/:id 204 - Deletes a course and returns no content
* The POST and PUT routes validate if the request body contains the following required values: User, firstName, lastName, emailAddress, password, Course, title, description.
* Validation error(s) are sent with a400 status code
* The POST /api/users route hashes the user's password before persisting the user to the database
* An Express middleware function authenticates the following routes: GET /api/users, POST /api/courses, PUT /api/courses/:id, DELETE /api/courses/:id
* When authentication fails a 401 status code is returned

### Exceeds expectations
* The GET /api/courses and /api/courses/:id routes filter out the following user properties: emailAddress, password.
* The PUT /api/courses/:id and DELETE /api/courses/:id routes return a 403 status code if the current user doesn't own the requested course
* The POST /api/users route validates that the provided email address is a valid email address and isn't already associated with an existing user

## Provided files: 

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to your GitHub repo.
* The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
* The `nodemon.js` file configures the nodemon Node.js module, which we are using to run your REST API.
* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install

```

Second, ensure that you have MongoDB installed globally on your system.

* Open a `Command Prompt` (on Windows) or `Terminal` (on Mac OS X) instance and run the command `mongod` (or `sudo mongod`) to start the MongoDB daemon.
* If that command failed then you’ll need to install MongoDB.
* [How to Install MongoDB on Windows](http://treehouse.github.io/installation-guides/windows/mongo-windows.html)
* [How to Install MongoDB on a Mac](http://treehouse.github.io/installation-guides/mac/mongo-mac.html)

Third, seed your MongoDB database with data.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).
