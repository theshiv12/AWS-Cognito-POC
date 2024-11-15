// const AWS = require('aws-sdk');

// AWS.config.update({ region: 'eu-west-2' });
// const cognito = new AWS.CognitoIdentityServiceProvider();

// const clientId = 'h0bgdtm9lhsh9oej3grmin5ko'; 

// async function signUpUser(email, password) {
//     const params = {
//         ClientId: clientId,
//         Username: email,
//         Password: password,
//         UserAttributes: [
//             {
//                 Name: 'email',
//                 Value: email
//             }
//         ]
//     };

//     try {
//         const data = await cognito.signUp(params).promise();
//         console.log('User signup successful:', data);
//         return data;
//     } catch (error) {
//         console.error('Error during signup:', error);
//         throw error;
//     }
// }

// async function confirmSignUp(email, confirmationCode) {
//     const params = {
//         ClientId: clientId,
//         Username: email,
//         ConfirmationCode: confirmationCode,
//     };

//     try {
//         const data = await cognito.confirmSignUp(params).promise();
//         console.log('User confirmation successful:', data);
//         return data;
//     } catch (error) {
//         console.error('Error during confirmation:', error);
//         throw error;
//     }
// }

// async function signInUser(email, password) {
//     const params = {
//         AuthFlow: 'USER_PASSWORD_AUTH',
//         ClientId: clientId,
//         AuthParameters: {
//             USERNAME: email,
//             PASSWORD: password,
//         }
//     };

//     try {
//         const data = await cognito.initiateAuth(params).promise();
//         console.log('User sign in successful:', data);
//         return data;
//     } catch (error) {
//         console.error('Error during sign in:', error);
//         throw error;
//     }
// }

// module.exports = { signUpUser, confirmSignUp, signInUser };

const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/auth.controller');
const errorHandler = require('./utils/erroHandler');

const app = express();
app.use(bodyParser.json());

app.post('/signup', authController.signUp);
app.post('/confirm', authController.confirmSignUp);
app.post('/signin', authController.signIn);

app.use(errorHandler);

module.exports = app;
