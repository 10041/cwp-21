const moment = require("moment");
const winston = require("winston");

const defaultOptions = {
	transports: [
		new winston.transports.File({
			filename: "./logs/logs.log",
			maxsize: 512
		}),
		new winston.transports.Console({
			timestamp: true,
			level: 'info',
			colorize: true
		})
	],
	exitOnError: false
};

class LoggerService {
	constructor() {
		this.logger = new winston.Logger(defaultOptions);
	}

	static getTime() {
		return moment().format("HH:mm:ss");
	}

	async requestInfo(data) {
		const method = data.method;
		const path = data.path;
		const query = JSON.stringify(data.query);
		const body = JSON.stringify(data.body);
		const time = LoggerService.getTime();

		return `${time}.${method}.${path}.${query}.${body}\n`;
	}

	async cacheRequest(data) {
		const method = data.method;
		const path = data.path;
		const time = LoggerService.getTime();
		const cacheString = "from cache".toUpperCase();

		return `${time}.${cacheString}.${method}.${path}\n`;
	}

	async info(data) {
		this.logger.log("info", data);
	}
}

let instance = null;

module.exports = () => {
	if (!instance) {
		instance = new LoggerService();
	}
	return instance;
};