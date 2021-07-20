const logger = require("../logger");

const generateRandom = require("../generateRandomNumber");

module.exports = (index) => {
  const endpoints = generateRandom.getAndPost();
  logger.info(
    `generating OpenAPI specification No ${index} with ${endpoints} endpoints`
  );

  const oas = {
    openapi: "3.0.1",
    info: {
      title: `performanceAnalysis${index}`,
      version: "1.0.0",
      description: generateRandom.apiDescription(),
    },
    servers: [
      {
        url: `https://${generateRandomInRange(253)}.${generateRandomInRange(
          253
        )}.${generateRandomInRange(253)}.${generateRandomInRange(
          253
        )}.${generateRandomInRange(253)}:${generateRandomInRange(49151, 1024)}`,
      },
    ],
    paths: {},
  };

  for (let i = 0; i < endpoints; i++) {
    oas.paths[generateRandom.genericEndpoint().replace(/{|}/g, "")] = {
      [generateRandom.getOrPost()]: {
        description: generateRandom.methodDescription(),
        responses: {
          200: {
            description: "successful operation",
          },
          503: {
            description: "Service Unavailable",
          },
        },
      },
    };
  }
  return oas;
};

const generateRandomInRange = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
