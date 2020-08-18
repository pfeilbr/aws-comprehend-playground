const fs = require("fs-extra");
const path = require("path");

const { medicalDetectEntities } = require("./index");
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

const saveResponse = (inputFileName, resp) => {
  writeFileJSON(
    path.join(
      __dirname,
      "example-responses",
      `${path.basename(inputFileName, "txt")}.json`
    ),
    resp,
    { overwrite: false }
  );
};

describe("detect entities", () => {
  it("should return result", async () => {
    const fileName = "medical-product-information-01.txt";
    const text = readFile(path.join(__dirname, "fixtures", fileName));
    const resp = await medicalDetectEntities({ text });
    saveResponse(fileName, resp);
    expect(resp.Entities).toBeDefined();
    expect(resp.Entities.length).toBeGreaterThan(0);
  });
});
