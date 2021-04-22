process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
const server = require('../');


chai.use(chaiHttp);

const existingData = {
    "name" : "Disease history",
    "description" : "The chronic of the disease at hand",
    "dataPoints" : [{
        "dataType" : "selection",
        "label" : "ECOG_SCORE",
        "description" : "ECOC score at the start of IO",
        "options": ["0","1","2","3","4","5","unknown"]
    }]
}

const newData = {
    "name" : "Health History",
    "description" : "The Covid Pandemic Hits Hard",
    "dataPoints" : [{
        "dataType" : "selection",
        "label" : "ECOG_SCORE",
        "description" : "ECOC score at the start of IO",
        "options": ["0","1","2","3","4","5","unknown"]
    }]
}

describe('Test to Update a Tab', () => {

	it('it should return return error messsage and a 400 status if validation failed', async () => {
		const res = await chai.request(server).put('/api/v1/tabs/000000c01e04f00aa0000047');

		assert.equal(res.status, 400);
		assert.deepInclude(res.body, {
			status: 'failed',
			message: 'Validation Failed'
		});
	});

	it('it should return return a 404 status if tab is not found', async () => {
		const res = await chai.request(server).put('/api/v1/tabs/000000c01e04f00aa0000047').send(newData);

		assert.equal(res.status, 404);
		assert.deepInclude(res.body, {
			status: 'failed',
			message: 'Tab Not Found'
		});
	});

	it('it should return return data and update record on success', async () => {
        const create = await chai.request(server).post(`/api/v1/tabs`).send(existingData);
        const { _id } = create.body.tab

		const res = await chai.request(server).put(`/api/v1/tabs/${_id}`).send(newData);

		assert.equal(res.status, 200);
		assert.equal(res.body.status, 'success');
		assert.equal(res.body.message, 'Tab Updated');
		assert.equal(res.body.tab.name, newData.name);
		assert.equal(res.body.tab.description, newData.description);
		assert.isOk(res.body.tab.dataPoints);
	});
});