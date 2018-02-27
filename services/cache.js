const lru = require("lru-cache");
const crypto = require("crypto");

const defaultOptions = {
	max: 500,
	length: (n, key) => n * 2 + key.length,
	maxAge: 1000 * 60
};

class CacheService {
	constructor() {
		this.options = defaultOptions;
		this.cache = lru(this.options);
	}

	static createKey(req) {
		const key = `${req.method}.${req.originalUrl}.${req.query}`;
		return crypto.createHmac("sha512", key).digest("hex");
	}

	async save(req, result) {
		if (req.method.toLowerCase() !== "get") return;
		const key = CacheService.createKey(req);
		this.cache.set(key, result);
	}

	async load(req) {
		if (req.method.toLowerCase() !== "get") return;
		const key = CacheService.createKey(req);
		return this.cache.get(key);
	}
}

let instance = null;

module.exports = () => {
	if (!instance) {
		instance = new CacheService();
	}
	return instance;
};