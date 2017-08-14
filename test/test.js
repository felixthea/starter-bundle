import test from 'ava';
import { baseURL, ad_id } from '../src/scripts/config';
import TEST_DATA from '../src/scripts/test-data';

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
	if (TEST_DATA[0].latitude) {
		t.pass();
	} else {
		t.fail();
	}
});

test('Test data contains longitude', t => {
	if (TEST_DATA[0].longitude) {
		t.pass();
	} else {
		t.fail();
	}
});

test('Test data contains impressions per 15 seconds', t => {
	if (TEST_DATA[0].impressions_15_sec) {
		t.pass();
	} else {
		t.fail();
	}
});

test('Test data contains a correctly formatted partner venue id', t => {
	if (TEST_DATA[0]._index) {
		const regex = /(MN|BK|QU|SI|BX)-\d\d-\d\d\d\d\d\d-(L|R)/gi
		if (TEST_DATA[0]._index.match(regex)) {
			t.pass();
			return
		}
	}
	t.fail();
});
