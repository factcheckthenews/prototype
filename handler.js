'use strict';

const Promise = require('bluebird');
const utilities = require('./ext/utilities');
const openSources = require('./ext/open-sources');
const webOfTrust = require('./ext/web-of-trust');
const extraction = require('./ext/extraction');
const slander = require('./ext/slander');
const credibility = require('./ext/credibility');
const deceptiveDomain = require('./ext/deceptive-domain');

module.exports.check = (event, context, callback) => {
	const articleUrl = (event.queryStringParameters) ? event.queryStringParameters.url : '';

	// Get reputation from Web of Trust
	const wotPromise = webOfTrust
		.getReputation(event.stageVariables.WOT_API_KEY, articleUrl);
	const articlePromise = extraction.getArticle(articleUrl);

	Promise.all([wotPromise, articlePromise])
		.spread((wotResponse, articleResponse) => {
			// Tokenize text content and check for slander terms.
			const content = extraction.format(articleResponse);
			const tokens = extraction.tokenize(content.text);
			const slanderTerms = slander.terms(tokens);

			// Check criteria
			const openSourcesCheck = openSources.isFlagged(articleUrl);
			const httpsCheck = utilities.isHTTPS(articleUrl);
			const wotCheck = webOfTrust.format(wotResponse);
			const capitalizationCheck = extraction.excessiveCaps(content);
			const punctuationCheck = extraction.punctuation(content);
			const slanderCheck = slander.in(tokens);
			const domainCheck = deceptiveDomain.check(articleUrl);

			// Calculate the score
			const score = credibility.score({
				opensourcesFlagged: openSourcesCheck,
				https: httpsCheck,
				deceptiveDomain: domainCheck,
				webOfTrust: wotCheck,
				capitalization: capitalizationCheck,
				punctuation: punctuationCheck,
				slander: slanderCheck
			});

			// Format the response with criteria
			const response = {
				statusCode: 200,
				headers: utilities.getHeaders(event.queryStringParameters),
				body: JSON.stringify({
					url: articleUrl,
					score: score,
					criteria: {
						opensources: {
							flag: openSourcesCheck,
							type: openSources.getReason(articleUrl),
							credible: openSources.isCredible(articleUrl)
						},
						https: httpsCheck,
						deceptiveDomain: domainCheck,
						webOfTrust: wotCheck,
						capitalization: capitalizationCheck,
						punctuation: punctuationCheck,
						slander: {
							flag: slanderCheck,
							keywords: slanderTerms.map(item => {
								return {term: item, label: slander.label(item)};
							})
						}
					}
				})
			};

			callback(null, response);
		})
		.catch(err => {
			// Send the error to CloudWatch
			console.log(err);
			callback(null, {
				statusCode: 200,
				headers: utilities.getHeaders(event.queryStringParameters),
				body: JSON.stringify({
					url: articleUrl,
					error: true
				})
			});
		});
};

