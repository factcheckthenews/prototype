'use strict';

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

/** @method 
 * @description Converts opensources classification type to friendly message
 * @param {String} input - opensources classification type
 */
module.exports = input => {
	return (category[input]) ? category[input] : 'Classification Pending';
};
