import test from 'ava';
import slander from '../ext/slander';

test('detects slander terms in tokens', t => {
	const pass = ['liberal', 'shill', 'rag'];
	const fail = ['quick', 'brown', 'fox', 'and', 'lazy', 'dog'];

	t.true(slander.in(pass));
	t.false(slander.in(fail));
});

test('collects slander terms', t => {
	const tokens = ['liberal', 'shill', 'rag'];
	t.deepEqual(slander.terms(tokens), ['shill']);
});

test('slander terms are mapped to labels', t => {
	t.is(slander.label('shill'), 'liberals');
	t.is(slander.label('zealot'), 'conservatives');
});
