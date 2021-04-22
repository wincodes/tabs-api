process.env.NODE_ENV = "test";

const { describe, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const server = require("../");

chai.use(chaiHttp);

const newData = {
  name: "Health History",
  description: "The Covid Pandemic Hits Hard",
  dataPoints: [
    {
      dataType: "selection",
      label: "ECOG_SCORE",
      description: "ECOC score at the start of IO",
      options: ["0", "1", "2", "3", "4", "5", "unknown"],
    },
  ],
};

describe("Test to Get Tab List", () => {
  it("it should return tab list", async () => {
    await chai.request(server).get(`/api/v1/tabs`).send(newData);

    const res = await chai.request(server).get(`/api/v1/tabs`);

    assert.equal(res.status, 200);
    assert.equal(res.body.status, "success");
    assert.equal(res.body.message, "Tabs Retrieved");
    assert.isOk(res.body.tabs.length > 0);
  });
});
