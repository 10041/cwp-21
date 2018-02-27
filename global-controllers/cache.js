const cacheService = require("../services/cache")();
const loggerService = require("../services/logger")();

module.exports = async (req, resp, next) => {
	const data = await cacheService.load(req);

	let oldJson = resp.json;
	resp.json = function(data) {
		cacheService.save(req, data);
		oldJson.apply(resp, arguments);
	};

	if (data) {
		await loggerService.info(await loggerService.cacheRequest(req));
		resp.send(data);
		return;
	}
	next();
};