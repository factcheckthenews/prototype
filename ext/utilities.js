'use strict';

const url = require('url');

/** @method getOrigin
 * @description Parse out the host origin for CORS
 * @param {Object} queryParams - Object with query parameters as keys
 */
function getOrigin(queryParams) {
	return (queryParams && queryParams.__amp_source_origin) ? queryParams.__amp_source_origin : '*';
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
	getOrigin: getOrigin,
	isHTTPS: isHTTPS
};
