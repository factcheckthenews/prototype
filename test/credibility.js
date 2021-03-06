import test from 'ava';
import credibility from '../ext/credibility';

test('perfect score is 100', t => {
	const criteria = {
		https: true,
		deceptiveDomain: false,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: false,
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 100);
});

test('no https results in 5% deduction', t => {
	const criteria = {
		https: false,
		deceptiveDomain: false,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: false,
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 95);
});

test('deceptive domain results in 15% deduction', t => {
	const criteria = {
		https: true,
		deceptiveDomain: true,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: false,
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 85);
});

test('excessive all caps results in 15% deduction', t => {
	const criteria = {
		https: true,
		deceptiveDomain: false,
		capitalization: {title: {flag: true}},
		punctuation: {flag: false},
		slander: false,
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 85);
});

test('excessive punctuation results in 15% deduction', t => {
	const criteria = {
		https: true,
		deceptiveDomain: false,
		capitalization: {title: {flag: false}},
		punctuation: {flag: true},
		slander: false,
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 85);
});

test('slander results in 15% deduction', t => {
	const criteria = {
		https: true,
		deceptiveDomain: false,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: true,
		opensourcesFlagged: false,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 85);
});

test('being flagged by opensources results in 35% deduction', t => {
	const criteria = {
		https: true,
		deceptiveDomain: false,
		capitalization: {title: {flag: false}},
		punctuation: {flag: false},
		slander: false,
		opensourcesFlagged: true,
		webOfTrust: {reputation: 100}
	};

	t.is(credibility.score(criteria), 65);
});

test('worst score is 0', t => {
	const criteria = {
		https: false,
		deceptiveDomain: true,
		capitalization: {title: {flag: true}},
		punctuation: {flag: true},
		slander: true,
		opensourcesFlagged: true,
		webOfTrust: {reputation: 0}
	};

	t.is(credibility.score(criteria), 0);
});
