'use strict';

const url2Domain = require('./ext/url2domain');
const categorize = require('./ext/categorize');
const credibleSources = require('./data/credible');
const notCredibleSources = require('./data/notCredible');

module.exports.check = (event, context, callback) => {
	const origin = getOrigin(event.queryStringParameters);
	const articleUrl = (event.queryStringParameters) ? event.queryStringParameters.url : '';
	const domain = url2Domain(articleUrl);

	const response = {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Origin': origin,
			'AMP-Access-Control-Allow-Source-Origin': origin,
			'Access-Control-Expose-Headers': 'AMP-Access-Control-Allow-Source-Origin'
		},
		body: JSON.stringify({
			url: articleUrl,
			score: '¯\\_(ツ)_/¯', // TODO: implement score
			criteria: {
				opensources: {
					flag: (notCredibleSources[domain]) ? true : false,
					type: (notCredibleSources[domain]) ? categorize(notCredibleSources[domain].type) : null,
					credible: credibleSources.some(source => source.url === domain)
				}
			}
		})
	};

	callback(null, response);
};

/** @method
 * @name getOrigin
 * @param {Object} queryParams - Object with query parameters as keys
 */
function getOrigin(queryParams) {
	return (queryParams && queryParams.__amp_source_origin) ? queryParams.__amp_source_origin : '*';
}
