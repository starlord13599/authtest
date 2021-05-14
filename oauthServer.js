const OAuthServer = require('express-oauth-server');
const path = require('path');
const { Client, User, accessToken } = require(path.resolve('models'));

function buildObject(tokenObject) {
	const { accessToken, accessTokenExpiresAt, scope, clientId, userId } = tokenObject;
	const newTokenObject = { accessToken, accessTokenExpiresAt, scope, client: { id: clientId }, user: { id: userId } };
	return newTokenObject;
}

const model = {
	getClient: function(client_id, client_secret, done) {
		return done(null, {
			id: client_id,
			grants: [ 'password' ]
		});
	},

	saveToken: function(token, client, user, done) {
		return done(null, {
			accessToken: token.accessToken,
			accessTokenExpiresAt: token.accessTokenExpiresAt,
			scope: token.scope,
			client: { id: client.id },
			user: { id: user.username, ...user },
			profile: { id: user.username, ...user }
		});
	},

	getUser: function(username, password, done) {
		return done(null, { username: 'deep', age: '23', email: 'deep@gmail.com' });
	},
	getAccessToken: function(access_token, done) {}
};

const oauth = new OAuthServer({
	model: model,
	useErrorHandler: true
});

module.exports = oauth;

//*GET CLIENT
// let options = { where: { clientId: client_id } };
// if (client_secret) {
// 	options.where.clientSecret = client_secret;
// }
// const client = await Client.findOne(options);
// if (!client) {
// 	return done('No client with such record found');
// }
// const { clientId, clientSecret, grants } = client;
// const buildClient = { clientId, clientSecret, grants: [ grants ] };
// return done(null, buildClient);

//*SAVE TOKEN
// const { accessToken: access_token, accessTokenExpiresAt, scope } = token;
// const { clientId } = client;
// const { username } = user;
// const [ foundAccessToken, created ] = await accessToken.findOrCreate({
// 	where: { clientId: client.clientId, userId: username },
// 	defaults: { accessToken: access_token, accessTokenExpiresAt, scope, clientId, userId: username }
// });
// if (!created) {
// 	foundAccessToken.setDataValue('accessToken', access_token);
// 	foundAccessToken.setDataValue('accessTokenExpiresAt', accessTokenExpiresAt);
// 	foundAccessToken.setDataValue('scope', scope);
// 	foundAccessToken.save();
// }
// const returnedAccessToken = buildObject(foundAccessToken);
// return done(null, returnedAccessToken);

//*GET USER
// const user = await User.findOne({ where: { username } });
// if (!user) {
// 	return done('User not found');
// }
// if (password !== user.password) {
// 	return done('Password is wrong');
// }
// return done(null, user);

//* GET ACCESSTOKEN
// const foundAccessToken = await accessToken.findOne({ where: { accessToken: access_token } });
// if (!foundAccessToken) {
// 	return done('Access token is not valid');
// }
// const returnedToken = buildObject(foundAccessToken);
// return done(null, returnedToken);
