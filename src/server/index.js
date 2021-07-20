const express = require("express");

const logger = require("../logger");
const gConfig = require("../config/dev.json");
const app = express();

module.exports.start = async (openApisOAS) => {
  app.use(express.json());
  for (const [index, oas] of openApisOAS.entries()) {
    logger.info(
      `configuring endpoint of ${oas.info.title} OpenAPI specification - ${
        index + 1
      }/${openApisOAS.length}`
    );
    app.get(`/${index + 1}`, (req, res) => res.json(oas));
  }
  app.listen(gConfig.server.port);
  logger.info(
    `Server for Performance Analysis purposes up and running at http://${gConfig.server.host}:${gConfig.server.port}`
  );
};
