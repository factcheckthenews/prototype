import test from 'ava';
import extraction from '../ext/extraction';

test('string can be tokenized', t => {
	const testString = 'Is this a test? String.';
	t.deepEqual(extraction.tokenize(testString),
      ['Is', 'this', 'a', 'test', 'String']);
});
