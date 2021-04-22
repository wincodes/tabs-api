process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = chai;
const server = require('../');


chai.use(chaiHttp);

describe('Test to create a Tab', () => {

	it('it should return return error messsage and a 400 status if validation failed', async () => {
		const res = await chai.request(server).post('/api/v1/tabs');

		assert.equal(res.status, 400);
		assert.deepInclude(res.body, {
			status: 'failed',
			message: 'Validation Failed'
		});
	});

	it('it should return return success message and tab object on successful request', async () => {
		const data = {
            "name" : "Disease history",
            "description" : "The chronic of the disease at hand",
            "dataPoints" : [{
                "dataType" : "selection",
                "label" : "ECOG_SCORE",
                "description" : "ECOC score at the start of IO",
                "options": ["0","1","2","3","4","5","unknown"]
            }]
        }

		const res = await chai.request(server).post(`/api/v1/tabs`).send(data);

		assert.equal(res.status, 201);
		assert.equal(res.body.status, 'success');
		assert.equal(res.body.message, 'Tab Created');
		assert.equal(res.body.tab.name, data.name);
		assert.equal(res.body.tab.description, data.description);
		assert.isOk(res.body.tab.dataPoints);
	});
});