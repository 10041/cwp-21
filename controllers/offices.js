const CrudController = require("./crud");
const cache = require("../services/cache")();

class OfficesController extends CrudController {
	constructor(officesService) {
		super(officesService);

		this.readAgents = this.readAgents.bind(this);

		this.routes["/agent/:id"] = [{ method: "get", cb: this.readAgents }];

		this.registerRoutes();
	}

	async readAgents(req, resp) {
		const result = await this.service.readAgents(req.params.id);

		resp.json(result);
	}
}

module.exports = (officesService) => {
	const officeController = new OfficesController(officesService);

	return officeController.router;
};