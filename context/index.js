
module.exports = (Sequelize, config) => {

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
        host: config.db.host,
        dialect: 'mysql',
        logging: false,

    });

    const Agent = require("../models/agent")(Sequelize, sequelize);
    const Office = require("../models/office")(Sequelize, sequelize);
    const Propertie = require("../models/propertie")(Sequelize, sequelize);

    Propertie.belongsTo(Agent);
    Agent.belongsTo(Office);

    return {
        agents: Agent,
        offices: Office,
        properties: Propertie,

        sequelize,
        Sequelize,
    };
};