'use strict';

const requestPromise = require('request-promise');
const extractor = require('unfluff');

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

/** @method extract
 * @description Extract metadata from the HTML
 * @param {String} html - Article HTML
 */
function extract(html) {
	const data = extractor.lazy(html, 'en');

	return {
		title: data.title(),
		date: data.date(),
		author: data.author(),
		text: data.text()
	};
}

/** @method tokens
 * @description Extract tokens from the text content
 * @param {String} text - Text content
 * @returns array of tokens
 */
function tokens(text) {
	return text.split(/\s|\(|\)|[,.!?:]/).filter(w => w.length > 0);
}

/** @module extraction */
module.exports = {
	getArticle: fetchArticle,
	format: extract,
	getTokens: tokens
};
