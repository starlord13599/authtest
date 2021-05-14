const passport = require('passport');
const PasswordGrantStrategy = require('passport-oauth2-password-grant');

passport.use(
	new PasswordGrantStrategy(
		{
			tokenURL: 'http://localhost:3000/token',
			clientID: 'EXAMPLE_CLIENT_ID',
			clientSecret: 'EXAMPLE_CLIENT_SECRET',
			passReqToCallback: true,
			skipUserProfile: true
		},
		function(request, accessToken, refreshToken, profile, done) {
			const { username, password } = request.body;
			return done(null, { username, password, accessToken });
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user.accessToken);
});

passport.deserializeUser(function(accessToken, done) {
	if (accessToken) {
		done(null, { username: 'deepppp', age: '23', email: 'deep@gmail.com' });
	}
});

module.exports = passport;
