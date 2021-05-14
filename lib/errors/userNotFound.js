const BaseError = require('./baseError');

class UserNotFound extends BaseError {
	constructor(parent) {
		super(parent);
		this.name = 'UserNotFound';
	}
}

module.exports = UserNotFound;
