class BaseError extends Error {
	lineNumber;
	errorLog;

	constructor(message) {
		super(message);
		this.name = 'ProjectError';
		this.setLineNumber();
		this.setErrorLog();
	}

	setLineNumber() {
		let [, errorLine] = this.stack.split('\n');

		if (!errorLine) {
			return null;
		}

		this.lineNumber = errorLine.trim();
		return this;
	}

	setErrorLog() {
		this.errorLog = `${this.message} -> ${this.lineNumber}`;
		return this;
	}
}

module.exports = BaseError;
