const probabilityFunctionWeights = require("./data/apiResults.json");
const apiTrace = require("./data/apiTrace.json")
const weightedRandom = (weights) => {
    let i, sum = 0, r = Math.random();
    for (i in weights) {
        sum += weights[i];
        if (r <= sum)
            if (i == 0) weightedRandom(weights);
            else return i;
    }
}
module.exports = {
    endpoints() {
        return weightedRandom(probabilityFunctionWeights.endpointsPercentage);
    },
    methods() {
        return weightedRandom(probabilityFunctionWeights.methodsPercentage);
    },
    getAndPost() {
        return weightedRandom(probabilityFunctionWeights.getAndPostPercentage);
    },
    getOrPost() {
        return weightedRandom([probabilityFunctionWeights.getPercentage, probabilityFunctionWeights.postPercentage]) == 0 ? "get" : "post";
    },
    methodDescription() {
        return apiTrace.methodDescriptions[generateRandomInRange(apiTrace.methodDescriptions.length, 0)];
    },
    apiDescription() {
        return apiTrace.description[generateRandomInRange(apiTrace.description.length, 0)];
    },
    genericEndpoint() {
        return apiTrace.endpoints[generateRandomInRange(apiTrace.endpoints.length, 0)];
    }
}

const generateRandomInRange = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

