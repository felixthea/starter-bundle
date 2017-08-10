import test from 'ava';
import { baseURL} from '../src/scripts/config';
import TEST_DATA as data from '../src/scripts/test-data';

test('my passing test', t => {
	t.pass(); 
});

test('baseUrl exists', t => {
	if (baseURL) {
		t.pass();
	} else {
		t.fail();
	}
});

test('Test data contains Latitude', t => {
	if (TEST_) {}
})
