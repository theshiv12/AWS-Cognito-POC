const cognitoService = require('../services/cognito.service');

async function signUp(req, res, next) {
    const { email, password } = req.body;
    try {
        const data = await cognitoService.signUpUser(email, password);
        res.status(200).json({ message: 'Sign-up successful', data });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

async function confirmSignUp(req, res, next) {
    const { email, code } = req.body;
    try {
        const data = await cognitoService.confirmUser(email, code);
        res.status(200).json({ message: 'User confirmed successfully', data });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

async function signIn(req, res, next) {
    const { email, password } = req.body;
    try {
        const data = await cognitoService.signInUser(email, password);
        res.status(200).json({ message: 'Sign-in successful', data });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = { signUp, confirmSignUp, signIn };
