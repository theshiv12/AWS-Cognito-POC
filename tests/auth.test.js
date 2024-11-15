const AWSMock = require('aws-sdk-mock');
const { signUpUser, confirmUser, signInUser } = require('../services/cognito.service');

AWSMock.setSDKInstance(require('aws-sdk'));

describe('Cognito Authentication Service', () => {
    beforeAll(() => {
        AWSMock.mock('CognitoIdentityServiceProvider', 'signUp', (params, callback) => {
            callback(null, { UserSub: '12345' });
        });
        AWSMock.mock('CognitoIdentityServiceProvider', 'confirmSignUp', (params, callback) => {
            callback(null, { status: 'SUCCESS' });
        });
        AWSMock.mock('CognitoIdentityServiceProvider', 'initiateAuth', (params, callback) => {
            callback(null, { AuthenticationResult: { AccessToken: 'token123' } });
        });
    });
 
    afterAll(() => {
        AWSMock.restore('CognitoIdentityServiceProvider');
    });

    it('should sign up a user', async () => {
        const data = await signUpUser('test1@example.com', 'Test@1234');
        console.log("data is",data)
        expect(data).toHaveProperty('UserSub');
    });

    it('should sign in a user', async () => {
        const data = await signInUser('test1@example.com', 'Test@1234');
        expect(data.AuthenticationResult).toHaveProperty('AccessToken', 'token123');
    });
});
