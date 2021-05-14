const BaseError = require('./baseError');

class InvalidParameter extends BaseError {
	constructor(parent) {
		super(parent);
		this.name = 'InvalidParameterError';
	}
}

module.exports = InvalidParameter;
