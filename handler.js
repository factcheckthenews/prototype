'use strict';

const url2Domain = require('./ext/url2domain');
const credibleSources = require('./data/credible');
const notCredibleSources = require('./data/notCredible');

module.exports.check = (event, context, callback) => {
	const origin = (event.queryStringParameters) ? event.queryStringParameters.__amp_source_origin : '*';
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
			score: '¯\\_(ツ)_/¯',
			meta: {
				opensources: {
					redFlag: (notCredibleSources[domain]) ? notCredibleSources[domain] : false,
					credible: credibleSources.some(source => source.url === domain)
				}
			}
		})
	};

	callback(null, response);
};
