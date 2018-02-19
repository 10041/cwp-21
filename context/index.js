
module.exports = (Sequelize, config) => {

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
        host: config.db.host,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
        }
    });

    const agent = require('../models/agent');
    const office = require('../models/office');
    const propertie = require('../models/propertie');

    propertie.belongTo(agent);
    agent.belongTo(office);

    return {
        agents: agent,
        offices: office,
        properties: propertie,
        sequelize,
        Sequelize,
    };
};