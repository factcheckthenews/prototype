'use strict';

const url = require('url');

/** @module deceptive-domain */
module.exports.check = articleUrl => {
	const domain = url.parse(articleUrl).hostname;

	// TODO: Check for domain typo-squatting
	return domain.includes('com.co');
};
