'use strict';

const url2Domain = require('./ext/url2domain');
const credibleSources = require('./data/credible');
const notCredibleSources = require('./data/notCredible');

module.exports.check = (event, context, callback) => {
	const articleUrl = (event.queryStringParameters) ? event.queryStringParameters.url : '';
	const domain = url2Domain(articleUrl);

	const response = {
		statusCode: 200,
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
