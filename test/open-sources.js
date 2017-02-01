import test from 'ava';
import openSources from '../ext/open-sources';

test('sources are checked for credibility', t => {
	t.plan(3);
	t.true(openSources.isCredible('reuters.com'));
	t.true(openSources.isCredible('bbc.com'));
	t.false(openSources.isCredible('google.com'));
});

test('source classifications state a reason', t => {
	t.plan(2);
	t.is(openSources.getReason('reuters.com'), null);
	t.is(openSources.getReason('theonion.com'), 'Satire');
});
