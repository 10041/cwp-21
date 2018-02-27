const express = require("express");

module.exports = (agentsService, officesService, propertiesService) => {
	const router = express.Router();

	const agentsController = require("./agents")(agentsService);
	const officesController = require("./offices")(officesService);
	const propertiesController = require("./properties")(propertiesService);

	router.use("/agents", agentsController);
	router.use("/offices", officesController);
    router.use("/properties", propertiesController);
    
	return router;
};