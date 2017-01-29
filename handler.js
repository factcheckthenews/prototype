'use strict';

const Promise = require('bluebird');
const utilities = require('./ext/utilities');
const openSources = require('./ext/open-sources');
const webOfTrust = require('./ext/web-of-trust');
const extraction = require('./ext/extraction');
const slander = require('./ext/slander');

module.exports.check = (event, context, callback) => {
	const articleUrl = (event.queryStringParameters) ? event.queryStringParameters.url : '';

	// Get reputation from Web of Trust
	const wotPromise = webOfTrust
		.getReputation(event.stageVariables.WOT_API_KEY, articleUrl);
	const articlePromise = extraction.getArticle(articleUrl);

	Promise.all([wotPromise, articlePromise])
		.spread(function (wotResponse, articleResponse) {
			// Tokenize text content and check for slander terms.
			const content = extraction.format(articleResponse);
			const tokens = extraction.tokenize(content.text);
			const slanderTerms = slander.terms(tokens);

			const response = {
				statusCode: 200,
				headers: utilities.getHeaders(event.queryStringParameters),
				body: JSON.stringify({
					url: articleUrl,
					score: '¯\\_(ツ)_/¯', // TODO: implement score
					criteria: {
						opensources: {
							flag: openSources.isFlagged(articleUrl),
							type: openSources.getReason(articleUrl),
							credible: openSources.isCredible(articleUrl)
						},
						https: utilities.isHTTPS(articleUrl),
						webOfTrust: webOfTrust.format(wotResponse),
						excessiveCaps: extraction.excessiveCaps(content),
						punctuation: extraction.punctuation(content),
						slander: {
							flag: slander.in(tokens),
							keywords: slanderTerms.map(item => {
								return {term: item, label: slander.label(item)};
							})
						}
					}
				})
			};

			callback(null, response);
		});
};

