const logger = require('./logger');
const server = require('./server');
const gConfig = require('./config/dev.json');

const openApiFactory = require('./factory/openApiFactory');
const arrowheadServiceRegistryFactory = require('./factory/arrowheadServiceRegisterFactory');

const arrowheadRequest = require('./repositories/arrowHeadRequests');

const init = async () => {
    const oas = [];
    for (let i = 1; i <= gConfig.apisToGenerate; i++) {
        oas.push(openApiFactory(i));
        await arrowheadRequest.registerService(arrowheadServiceRegistryFactory(i));
    }
    server.start(oas);
}

init()
    .then(() => {
        logger.info("All arrowhead services were deployed and its OAS are expose through this service API");
    })
    .catch((err) => {
        logger.error({ err: err });
    });