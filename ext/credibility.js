'use strict';

/** @method score
 * @description Calculate credibility score
 * @param {Object} criteria - Object containing score criteria
 */
function score(criteria) {
	const https = (criteria.https) ? 10 : 0;
	const capitalization = (criteria.capitalization.title.flag) ? 0 : 10;
	const punctuation = (criteria.punctuation.flag) ? 0 : 10;
	const slander = (criteria.slander.flag) ? 0 : 10;
	const opensources = (criteria.opensourcesFlagged) ? 0 : 30;
	const webOfTrust = criteria.webOfTrust.reputation * 0.3;

	const aggregate = Math.round(
		https +
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
