import test from 'ava';
import utilities from '../ext/utilities';

test('detects https protocol in URLs', t => {
	t.true(utilities.isHTTPS('https://www.washingtonpost.com'));
	t.false(utilities.isHTTPS('http://www.vox.com/'));
});
