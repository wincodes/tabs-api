process.env.NODE_ENV = "test";

const { describe, it } = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert } = chai;
const server = require("../");
const Tab = require("../models/tabs");

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

describe("Test to delete a Tab", () => {
  it("it should return return a 404 status if tab is not found", async () => {
    const res = await chai
      .request(server)
      .delete("/api/v1/tabs/000000c01e04f00aa0000047");

    assert.equal(res.status, 404);
    assert.deepInclude(res.body, {
      status: "failed",
      message: "Tab Not Found",
    });
  });

  it("it should return null data on success", async () => {
    const create = await chai
      .request(server)
      .post(`/api/v1/tabs`)
      .send(newData);
    const { _id } = create.body.tab;

    const res = await chai.request(server).delete(`/api/v1/tabs/${_id}`);

    const tab = await Tab.findById(_id);

    assert.equal(res.status, 200);
    assert.equal(res.body.status, "success");
    assert.equal(res.body.message, "Tab Deleted");
    assert.equal(tab, null);
  });
});
