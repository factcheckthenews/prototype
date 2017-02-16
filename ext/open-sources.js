'use strict';

const credibleSources = require('../data/credible');
const flaggedSources = require('../data/notCredible');

const category = {
	bias: 'Extreme Bias',
	conspiracy: 'Conspiracy Theory',
	fake: 'Fake News',
	junksci: 'Junk Science',
	rumors: 'Rumor Mill',
	satire: 'Satire',
	state: 'State News Source',
	hate: 'Hate Group',
	clickbait: 'Clickbait',
	political: 'Political Bias',
	caution: 'Caution'
};

/** @method flag
 * @description Determines whether the opensources data has flagged this site
 * @param {String} url - HTTP URL to check
 */
function flag(url) {
	if (flaggedSources[domain(url)]) {
		return true;
	}
	return false;
}

/** @method flagType
 * @description Gets the reason for the site being flagged
 * @param {String} url - HTTP URL to check
 */
function flagType(url) {
	return (flaggedSources[domain(url)]) ? classify(flaggedSources[domain(url)].type) : null;
}

/** @method credible
 * @description Whether the website has been curated as a credible source
 * @param {String} url - HTTP URL to check
 */
function credible(url) {
	if (credibleSources[domain(url)]) {
		return true;
	}
	return false;
}

/** @method classify
 * @description Converts opensources classification type to friendly message
 * @param {String} input - opensources classification type
 */
function classify(input) {
	return (category[input]) ? category[input] : 'Classification Pending';
}

/** @method domain
 * @description Converts a URL to a domain key to use the opensources data
 * @param {String} url - HTTP URL to check
 */
function domain(url) {
	if (url) {
		url = url.toString().replace(/^(?:https?|ftp):\/\//i, '');
		url = url.toString().replace(/^www\./i, '');
		url = url.toString().replace(/\/.*/, '');
		return url;
	}
}

module.exports = {
	isFlagged: flag,
	getReason: flagType,
	isCredible: credible
};
