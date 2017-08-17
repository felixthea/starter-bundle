import test from 'ava';
import { baseURL } from '../src/scripts/config';
import View from '../src/scripts/view';

test('ava test example', t => {
	t.pass(); 
});

test('baseUrl exists', t => {
	if (baseURL) {
		t.pass();
	} else {
		t.fail();
	}
});

test('If no URL is specified, throw an error', t => {
	const view = new View();
	if(view.request() === false) {
		t.pass();
	} else {
		t.fail();
	}
});