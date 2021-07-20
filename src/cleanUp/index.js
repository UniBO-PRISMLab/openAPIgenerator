const logger = require('../logger')

const arrowheadRequests = require('../repositories/arrowHeadRequests');

const cleanUpArrowhead = async () => {

    const allServices = (await arrowheadRequests.getAllServices()).data;

    const servicesIds = allServices.filter(service => service.provider.systemName.match(/\performanceanalysis\S+/g));
    for (const service of servicesIds) {
        await arrowheadRequests.deleteService(service);
    }
}

cleanUpArrowhead()
    .then(() => {
        logger.info("All clean");
    })
    .catch(err => {
        logger.error({ error: err });
    });