const CrudController = require("./crud");

class AgentsController extends CrudController {
	constructor(agentsService) {
		super(agentsService);

		this.addOffice = this.addOffice.bind(this);
		this.removeOffice = this.removeOffice.bind(this);
		this.readOffice = this.readOffice.bind(this);

		this.routes["/bind"] = [{ method: "post", cb: this.addOffice }];
		this.routes["/unbind"] = [{ method: "post", cb: this.removeOffice }];
		this.routes["/office/:id"] = [{ method: "get", cb: this.readOffice }];

		this.registerRoutes();
	}

	async addOffice(req, resp) {
		const { id, officeId } = req.body;

		resp.json(await this.service.addOffice(id, officeId));
	}

	async removeOffice(req, resp) {
		const { id } = req.body;

		resp.json(await this.service.removeOffice(id));
	}

	async readOffice(req, resp) {
		const result = await this.service.readOffice(req.params.id);

		resp.json(result);
	}
}

module.exports = (agentsService) => {
	const agentsController = new AgentsController(agentsService);

	return agentsController.router;
};