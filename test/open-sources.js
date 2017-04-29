import test from 'ava';
import openSources from '../ext/open-sources';

test('source classifications state a reason', t => {
	t.plan(2);
	t.is(openSources.getReason('reuters.com'), null);
	t.is(openSources.getReason('theonion.com'), 'Satire');
});
