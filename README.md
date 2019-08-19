# JumpCloud Assignment

Note: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
Clone this repo on your local machine. Then to install it, run the following command in the project directory:

### `npm install`

Once installation is complete, you can use the following commands to run and test the project.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

NOTE: This project assumes the API is in the following location:
```
http://localhost:8005/api/systemusers
```
To change this, edit the first line in [src/api/api.js](./src/api/api.js):
```
const BASE_URL = 'http://localhost:8005/api/systemusers'; // change this value to whatever you need.
```

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Next Steps

I ran out of time to do everything I would have liked to for this project. Given more time, I would have done the following:

### Error Handling
This project does not sufficiently handle any errors from the API.

### Complete the Edit/Add form
The form to edit and add a user only contains a small subset of all the fields. For this to be a complete solution, I would need to add all the fields to this form.

