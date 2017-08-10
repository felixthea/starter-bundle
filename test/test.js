import test from 'ava';
import { baseURL} from '../src/scripts/config';
import { TEST_DATA as data } from '../src/scripts/test-data';

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

test('Test data contains latitude', t => {
	if (data.latitude) {
		t.pass();
	} else {
		t.fail();
	}
});

test('Test data contains longitude', t => {
	if (data.longitude) {
		t.pass();
	} else {
		t.fail();
	}
});
