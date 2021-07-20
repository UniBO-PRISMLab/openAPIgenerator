const axios = require('axios');

const gConfig = require("../config/dev.json");
const resultHandler = require('../handlers/resultHandler');
const logger = require('../logger')

const headerFactory = require('../factory/headers');

const arrowheadHost = `http://${gConfig.arrowhead.host}:${gConfig.arrowhead.port}`;

const queryService = async (thing) => {
    const payload = {
        serviceDefinitionRequirement: thing.td.title
    }

    const headers = headerFactory.post()
    const arrowheadRequest = axios.post(`${arrowheadHost}/serviceregistry/query`,
        payload,
        { headers });
    return arrowheadRequest.then(response => {
        return response.data
    }).catch(resultHandler.errorHandler);
}


const registerService = async (arrowheadService) => {
    logger.info(`registering ${arrowheadService.providerSystem.systemName} in arrowhead...`);
    const headers = headerFactory.post();
    const arrowheadRequest = axios.post(`${arrowheadHost}/serviceregistry/register`,
        arrowheadService,
        { headers });
    return arrowheadRequest.then(response => {
        logger.debug({ response: response });
        response.data
    }).catch(resultHandler.errorHandler);
}


const updateService = async (thing, id) => {
    const message = await deleteService({ id: id });
    logger.info(message);
    return await registerService(thing);
}

const getAllServices = () => {
    const headers = headerFactory.get()
    //const arrowheadRequest = axios.get(`${arrowheadHost}/serviceregistry/mgmt?direction=ASC&sort_field=id`,
    // { headers });
    console.log("getting all")
    const arrowheadRequest = axios.get(`${arrowheadHost}/serviceregistry/query/all`,
        { headers });
    return arrowheadRequest.then((res) => {
        return successHandler(res);
    }).catch(resultHandler.errorHandler);
}

const successHandler = (response) => {
    logger.info(`arrowhead request was successfully`)
    logger.debug(response);
    return response.data;
}

const deleteService = async (thing) => {
    logger.info(`deleting ${thing.id} from arrowhead...`)
    const headers = headerFactory.delete()
    const arrowheadRequest = axios.delete(`${arrowheadHost}/serviceregistry/mgmt/${thing.id}`, { headers });
    return arrowheadRequest.then(response => response.data).catch(resultHandler.errorHandler);
}

module.exports = {
    queryService,
    registerService,
    updateService,
    getAllServices,
    deleteService
}