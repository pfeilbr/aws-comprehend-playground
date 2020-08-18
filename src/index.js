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

module.exports = {
  medicalDetectEntities,
};
