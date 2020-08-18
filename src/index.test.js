const fs = require("fs-extra");
const path = require("path");
const {
  medicalDetectEntities,
  medicalInferICD10CM,
  medicalInferRxNorm,
} = require("./index");

const FIXTURES_BASE_DIR = path.join(__dirname, "fixtures");
const EXAMPLES_BASE_DIR = path.join(__dirname, "example-responses");

const log = (o) => {
  console.log(JSON.stringify(o, null, 2));
};

const readFile = (filePath) => {
  return fs.readFileSync(filePath, "utf-8");
};

const writeFile = (filePath, contents) => {
  fs.writeFileSync(filePath, contents);
};

const writeFileJSON = (filePath, o, opt = { overwrite: true }) => {
  if (!fs.existsSync(filePath) || opt.overwrite) {
    fs.outputJSONSync(filePath, o, { spaces: 2 });
  }
};

const readFixture = (fileName) => {
  return readFile(path.join(FIXTURES_BASE_DIR, fileName));
};

const saveResponse = (inputFileName, resp) => {
  writeFileJSON(
    path.join(EXAMPLES_BASE_DIR, `${path.basename(inputFileName, "txt")}.json`),
    resp,
    { overwrite: false }
  );
};

describe("comprehend medical", () => {
  it("should detect entities", async () => {
    const fileName = "medical-product-information-01.txt";
    const text = readFixture(fileName);
    const resp = await medicalDetectEntities({ text });
    saveResponse(fileName, resp);
    expect(resp.Entities).toBeDefined();
    expect(resp.Entities.length).toBeGreaterThan(0);
  });

  it("InferICD10CM should detect medical conditions as entities listed in a patient record and links those entities to normalized concept identifiers in the ICD-10-CM knowledge", async () => {
    const fileName =
      "infer-icd-10-cm-to-detect-possible-medical-conditions-01.txt";
    const text = readFixture(fileName);
    const resp = await medicalInferICD10CM({ text });
    saveResponse(fileName, resp);
    expect(resp.Entities).toBeDefined();
    expect(resp.Entities.length).toBeGreaterThan(0);
  });

  it("InferRxNorm should identify medications that are listed in a patient record as entities. The operation also links those entities to concept identifiers (RxCUI)", async () => {
    const fileName = "infer-rx-norm-01.txt";
    const text = readFixture(fileName);
    const resp = await medicalInferRxNorm({ text });
    saveResponse(fileName, resp);
    expect(resp.Entities).toBeDefined();
    expect(resp.Entities.length).toBeGreaterThan(0);
  });
});
