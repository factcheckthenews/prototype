'use strict';

const url = require('url');

/** @method getOrigin
 * @description Parse out the host origin for CORS
 * @param {Object} queryParams - Object with query parameters as keys
 */
function getOrigin(queryParams) {
	return (queryParams && queryParams.__amp_source_origin) ? queryParams.__amp_source_origin : '*';
}

/** @method getHeaders
 * @description Get HTTP headers for the response
 * @param {Object} queryParams - Object with query parameters as keys
 */
function getHeaders(queryParams) {
	const origin = getOrigin(queryParams);
	return {
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': origin,
		'AMP-Access-Control-Allow-Source-Origin': origin,
		'Access-Control-Expose-Headers': 'AMP-Access-Control-Allow-Source-Origin'
	};
}

/** @method getProtocol
 * @description Get the protocol out of the URL
 * @param {String} articleUrl - URL of the article
 */
function getProtocol(articleUrl) {
	return url.parse(articleUrl).protocol;
}

/** @method isHTTPS
 * @description Determine whether the URL is being served over HTTPS
 * @param {String} articleUrl - URL of the article
 */
function isHTTPS(articleUrl) {
	return (getProtocol(articleUrl) === 'https:');
}

/** @module utilities */
module.exports = {
	getHeaders: getHeaders,
	isHTTPS: isHTTPS
};
