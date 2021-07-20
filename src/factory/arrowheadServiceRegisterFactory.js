const gConfig = require("../config/dev.json");

let acc = 0;
let systemNameId = 0;
module.exports = (index) => {
  if (index - acc > gConfig.division[systemNameId]) {
    ++systemNameId;
    acc += systemNameId;
  }
  const serviceRegistry = {
    endOfValidity: "2031-01-01 23:59:59",
    interfaces: ["HTTPS-SECURE-JSON"],
    metadata: {
      additionalProp1: `http://${gConfig.server.host}:${gConfig.server.port}/${index}`,
    },
    providerSystem: {
      address: `http://${gConfig.server.host}`,
      port: gConfig.server.port,
      systemName: `performanceAnalysis${systemNameId}`,
    },
    secure: "NOT_SECURE",
    serviceDefinition: `performanceAnalysis${index}`,
    serviceUri: `performanceAnalysis${index}`,
    version: 0,
  };
  console.log(serviceRegistry.providerSystem.systemName);
  return serviceRegistry;
};
