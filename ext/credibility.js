'use strict';

/** @method score
 * @description Calculate credibility score
 * @param {Object} criteria - Object containing score criteria
 */
function score(criteria) {
	const https = (criteria.https) ? 10 : 0;
	const deceptiveDomain = (criteria.deceptiveDomain) ? 0 : 10;
	const capitalization = (criteria.capitalization.title.flag) ? 0 : 10;
	const punctuation = (criteria.punctuation.flag) ? 0 : 10;
	const slander = (criteria.slander.flag) ? 0 : 10;
	const opensources = (criteria.opensourcesFlagged) ? 0 : 25;
	const webOfTrust = criteria.webOfTrust.reputation * 0.25;

	const aggregate = Math.round(
		https +
		deceptiveDomain +
		capitalization +
		punctuation +
		slander +
		opensources +
		webOfTrust
	);

	return aggregate;
}

module.exports = {
	score: score
};
