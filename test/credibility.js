import test from 'ava';
import credibility from '../ext/credibility';

test('perfect score is 100', t => {
	const criteria = {
		https: true,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: {flag: false},
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 100);
});

test('no https results in 10% deduction', t => {
	const criteria = {
		https: false,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: {flag: false},
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 90);
});

test('excessive all caps results in 10% deduction', t => {
	const criteria = {
		https: true,
		capitalization: {title: {flag: true}},
		punctuation: {flag: false},
		slander: {flag: false},
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 90);
});

test('excessive punctuation results in 10% deduction', t => {
	const criteria = {
		https: true,
		capitalization: {title: {flag: false}},
		punctuation: {flag: true},
		slander: {flag: false},
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 90);
});

test('slander results in 10% deduction', t => {
	const criteria = {
		https: true,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: {flag: true},
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 90);
});

test('being flagged by opensources results in 30% deduction', t => {
	const criteria = {
		https: true,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: {flag: false},
		opensourcesFlagged: true,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 70);
});

test('worst score is 0', t => {
	const criteria = {
		https: false,
		capitalization: {title: {flag: true}},
		punctuation: {flag: true},
		slander: {flag: true},
		opensourcesFlagged: true,
		webOfTrust: {reputation: 0}
	};

	t.is(credibility.score(criteria), 0);
});
