import test from 'ava';
import deceptiveDomain from '../ext/deceptive-domain';

test('abcnews.com.co is flagged as a deceptive domain', t => {
	t.true(deceptiveDomain.check('http://www.abcnews.com.co/'));
});

test('bbc.com is not flagged as a deceptive domain', t => {
	t.false(deceptiveDomain.check('https://www.bbc.co.uk/'));
});
