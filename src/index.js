const AWS = require("aws-sdk");

const comprehend = new AWS.Comprehend();
const medical = new AWS.ComprehendMedical();

const medicalDetectEntities = async ({ text }) => {
  const params = {
    Text: text,
  };

  const resp = await medical.detectEntitiesV2(params).promise();
  return resp;
};

const medicalInferICD10CM = async ({ text }) => {
  const params = {
    Text: text,
  };

  const resp = await medical.inferICD10CM(params).promise();
  return resp;
};

const medicalInferRxNorm = async ({ text }) => {
  const params = {
    Text: text,
  };

  const resp = await medical.inferRxNorm(params).promise();
  return resp;
};

module.exports = {
  medicalDetectEntities,
  medicalInferICD10CM,
  medicalInferRxNorm,
};
