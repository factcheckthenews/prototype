'use strict';

const requestPromise = require('request-promise');
const extractor = require('unfluff');

// Defines threshold for flagging excessive capitalization.
const ALL_CAPS_THRESHOLD = 0.2;

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

/** @method excessiveCaps
 * @description Check content for excessive capitalization
 * @param {Object} content - Content extracted from HTML
 */
function excessiveCaps(content) {
	const titleTokens = tokenize(content.title).filter(isNaN)
												.filter(token => token.length > 1);
	const titleUppercase = titleTokens.filter(isUpperCase);
	const titleRatio = titleUppercase.length / titleTokens.length * 100;

	const contentTokens = tokenize(content.text).filter(isNaN)
													.filter(token => token.length > 1);
	const contentUppercase = contentTokens.filter(isUpperCase);
	const contentRatio = contentUppercase.length / contentTokens.length * 100;

	return {
		title: {
			flag: (titleRatio > ALL_CAPS_THRESHOLD),
			uppercase: titleUppercase.length,
			percent: Math.floor(titleRatio)
		},
		content: {
			flag: (contentRatio > ALL_CAPS_THRESHOLD),
			uppercase: contentUppercase.length,
			percent: Math.floor(contentRatio)
		}
	};
}

/** @method isUpperCase
 * @description Check if string is all uppercase
 * @param {String} token - Token to check for uppercase
 */
function isUpperCase(token) {
	return token === token.toUpperCase();
}

/** @method excessivePunctuation
 * @description Check content for excessive punctuation
 * @param {Object} content - Content extracted from HTML
 */
function excessivePunctuation(content) {
	const titleMatch = content.title.match(/[!?]+/);
	return {
		flag: (titleMatch) ? (titleMatch.length > 0) : false,
		tokens: (titleMatch) ? titleMatch : []
	};
}

/** @method tokenize
 * @description Extract tokens from the text content
 * @param {String} text - Text content
 * @returns array of tokens
 */
function tokenize(text) {
	return text.split(/\s|\(|\)|[,.!?:]/).filter(w => w.length > 0);
}

/** @module extraction */
module.exports = {
	getArticle: fetchArticle,
	format: extract,
	tokenize: tokenize,
	excessiveCaps: excessiveCaps,
	punctuation: excessivePunctuation
};
