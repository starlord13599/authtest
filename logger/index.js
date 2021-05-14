const { red, yellow, gray, magenta, cyan, green } = require('chalk');

class Logger {
	#RED = red;
	#YELLOW = yellow;
	#MAGENTA = magenta;
	#CYAN = cyan;
	#GREEN = green;

	#log(message, color, level) {
		return console.log(this.#buildString(message, color, level));
	}

	#getCurrentTime() {
		return new Date().toLocaleString('en-IN', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: true,
		});
	}

	#buildString(message, color, level) {
		return `[${gray(this.#getCurrentTime())}] [${color(level)}] ${message}`;
	}

	warn(...message) {
		this.#log(message, this.#YELLOW, 'warn');
		return this;
	}

	debug(...message) {
		this.#log(message, this.#CYAN, 'debug');
		return this;
	}

	error(...message) {
		this.#log(message, this.#RED, 'error');
		return this;
	}

	info(...message) {
		this.#log(message, this.#MAGENTA, 'info');
		return this;
	}

	success(...message) {
		this.#log(message, this.#GREEN, 'success');
		return this;
	}

	log(message) {
		console.log(message);
	}
}

// const log = new Logger();

// log.warn('this is a warn message');
// log.info('just to inform');
// log.error('Holly Molly! error');
// log.debug('thats a d-bug');

module.exports = new Logger();
