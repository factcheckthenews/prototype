import test from 'ava';
import webOfTrust from '../ext/web-of-trust';

test('correctly formats Web of Trust response', t => {
	const wotResponse = {
		'theonion.com': {
			0: [94, 64],
			1: [94, 64],
			2: [94, 64],
			4: [82, 45],
			target: 'theonion.com',
			categories: {
				303: 71,
				304: 29,
				501: 100
			}
		}
	};

	const expected = {
		reputation: 94,
		confidence: 64,
		description: 'Excellent',
		categories: [
			'Opinions, religion, politics',
			'Good site'
		]
	};

	t.deepEqual(webOfTrust.format(wotResponse), expected);
});
