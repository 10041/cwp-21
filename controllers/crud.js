const express = require("express");
const asyncErrorHandler = require("../helpers/asyncErrorHandler");

class CrudController {
	constructor(service) {
		this.service = service;

		this.readAll = this.readAll.bind(this);
		this.read = this.read.bind(this);
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);

		this.router = express.Router();
		this.routes = {
			"/": [{ method: "get", cb: this.readAll }],
			"/:id": [{ method: "get", cb: this.read }],
			"/create": [{ method: "post", cb: this.create }],
			"/update": [{ method: "put", cb: this.update }],
			"/delete": [{ method: "delete", cb: this.delete }]
		};
	}

	async readAll(req, resp) {
		const result = await this.service.readChunk(req.params);

		resp.json(result);
	}

	async read(req, resp) {
		const result = await this.service.read(req.params.id);

		resp.json(result);
	}

	async create(req, resp) {;
		resp.json(await this.service.create(req.body));
	}

	async update(req, resp) {
		resp.json(await this.service.update(req.body.id, req.body));
	}

	async delete(req, resp) {
		resp.json(await this.service.delete(req.body.id));
	}

	registerRoutes() {
		Object.keys(this.routes).forEach((route) => {
			let handlers = this.routes[route];

			if (!handlers || !Array.isArray(handlers)) return;

			for (let handler of handlers) {
				this.router[handler.method](route, asyncErrorHandler(handler.cb));
			}
		});
	}
}

module.exports = CrudController;