/* eslint-disable */

import test from 'ava';
const nock = require('nock');
const request = require('request');

test('ava test example', t => {
	t.pass(); 
});

nock.disableNetConnect();

let body = {};
let serverMock = nock('http://pda-server.dev.linksvc.com').post('/play/ad?site_id=&imp_x=&lat=&lon=', {}).reply(204);

test('pda server /play endpoint returns 204 response with no content', t => {
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