'use strict';

const requestPromise = require('request-promise');

/** @method fetchArticle
 * @description Fetch article from HTTP request
 * @param {String} articleUrl - URL of the article
 */
function fetchArticle(articleUrl) {
	var options = {
		uri: articleUrl,
		headers: {'User-Agent': 'factcheckthe.news'}
	};

	return requestPromise(options);
}

/** @module webOfTrust */
module.exports = {
	getArticle: fetchArticle
};
