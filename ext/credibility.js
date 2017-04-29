'use strict';

/** @method score
 * @description Calculate credibility score
 * @param {Object} criteria - Object containing score criteria
 */
function score(criteria) {
	// Total score of all the flags will be 100
	const https = (criteria.https === false) ? 0 : 5;
	const deceptiveDomain = (criteria.deceptiveDomain) ? 0 : 15;
	const capitalization = (criteria.capitalization.title.flag) ? 0 : 15;
	const punctuation = (criteria.punctuation.flag) ? 0 : 15;
	const slander = (criteria.slander) ? 0 : 15;
	const opensources = (criteria.opensourcesFlagged) ? 0 : 35;

	// Scale the score against the sites reputation
	const webOfTrust = criteria.webOfTrust.reputation;

	const aggregate = Math.round(
		(webOfTrust / 100) *
		((https + deceptiveDomain + capitalization +
			punctuation + slander + opensources))
	);

	return aggregate;
}

module.exports = {
	score: score
};
