const winston = require("winston");
const loggerService = require("../services/logger")();

module.exports = async (req, resp, next) => {
    
	loggerService.info(await loggerService.requestInfo(req));

	next();
};