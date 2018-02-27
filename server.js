const express = require("express");
const bodyParser = require("body-parser");

const errors = require("./helpers/errors");

const AgentServices = require("./services/agent");
const OfficeService = require("./services/office");
const PropertiesService = require("./services/properties");

const Shemas = require('./schemas');

module.exports = (db, config) => {
	const app = express();

	const agentsService = new AgentServices(db.agents, db.offices, Shemas.agentSchema, errors);
	const officesService = new OfficeService(db.offices, db.agents, Shemas.officeSchema, errors);
	const propertiesService = new PropertiesService(
		db.properties,
        db.agents,
        Shemas.propertySchema,
		errors
	);

	const error = require("./global-controllers/error");
	const apiController = require("./controllers/api")(
		agentsService,
		officesService,
		propertiesService
	);
	const loggerController = require("./global-controllers/logger");
	const cacheController = require("./global-controllers/cache");
	//const validatorController = require("./global-controllers/vaidator");

	app.use(bodyParser.json());
	app.use("/api", loggerController);
	//app.use("/api", validatorController);
	app.use("/api", cacheController);
	app.use("/api", apiController);
	app.use("/api", error);

	return app;
};