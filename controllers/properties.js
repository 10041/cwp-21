const CrudController = require("./crud");

class PropertiesController extends CrudController {
	constructor(propertiesService) {
		super(propertiesService);

		this.bindAgent = this.bindAgent.bind(this);
		this.unbindAgent = this.unbindAgent.bind(this);

		this.routes["/bind"] = [{ method: "post", cb: this.bindAgent }];
		this.routes["/unbind"] = [{ method: "post", cb: this.unbindAgent }];

		this.registerRoutes();
	}

	async bindAgent(req, resp) {
		const { id, agentId } = req.body;

		resp.json(await this.service.bindAgent(id, agentId));
	}

	async unbindAgent(req, resp) {
		const { id } = req.body;

		resp.json(await this.service.unbindAgent(id));
	}
}

module.exports = (propertiesService) => {
	const controller = new PropertiesController(propertiesService);

	return controller.router;
};