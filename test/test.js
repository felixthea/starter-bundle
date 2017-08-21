/* eslint-disable */
import test from 'ava';
import View from '../src/scripts/view';

const nock = require('nock');
const request = require('request');

test('ava test example', t => {
	t.pass(); 
});

nock.disableNetConnect();

let body = {};
let serverMock = nock('http://pda-server.dev.linksvc.com').post('/play/ad?site_id=&imp_x=&lat=&lon=', {}).reply(204);

test('PDA Server \'/play\' endpoint returns 204 response with no content', t => {
	request({
		method: 'POST',
		uri: 'http://pda-server.dev.linksvc.com/play/ad?site_id=&imp_x=&lat=&lon=',
		body: JSON.stringify(body),
		headers: {
		'user-agent': 'some-user-agent'
		}
	}).on('response', (res) => {
		if (!serverMock.isDone()) {
			t.fail();
		} else {
			if (res.statusCode === 204) {
				t.pass();
			}
		}
	});	
})

test('Impression validator tests', t => {
	const view = new View();
	t.is(view.imp(10), 10, 'impressions returning incorrectly');
	t.is(view.imp('test'), 0, 'wrong data type not handled correctly');
	t.is(view.imp(undefined), 0, 'undefined not handled correctly');
	t.is(view.imp(null), 0, 'null not hanlded correctly');
	t.pass();
})