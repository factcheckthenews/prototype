'use strict';

const url = require('url');
const requestPromise = require('request-promise');

/** @module webOfTrust */
module.exports = {
  /** @method getReputation
   * @description Fetch reputation from Web of Trust api
   * @param {String} apiKey - Web Of Trust API Key
   * @param {String} articleUrl - URL of the articleUrl
   */
	getReputation: (apiKey, articleUrl) => {
		var options = {
			uri: 'http://api.mywot.com/0.4/public_link_json2',
			qs: {
				hosts: url.parse(articleUrl).hostname + '/',
				key: apiKey
			},
			headers: {'User-Agent': 'Request-Promise'},
			json: true
		};

		return requestPromise(options);
	},

	/** @method formatResponse
   * @description Convert Web of Trust API response to match our specification
   * @param {Object} wotResponse - Web Of Trust API response object
   */
	formatResponse: wotResponse => {
		// Pull the reputation information out of the API
		// https://www.mywot.com/wiki/API#public_link_json2
		const domain = Object.keys(wotResponse)[0];

		if (!wotResponse[domain]['0']) {
			// Bail if the response doesn't contain a reputation
			return {
				trustworthiness: {
					reputation: null,
					confidence: 0,
					description: 'Unknown'
				},
				categories: []
			};
		}

		const reputation = wotResponse[domain]['0'][0];
		const confidence = wotResponse[domain]['0'][1];
		const categories = Object.keys(wotResponse[domain].categories);

		return {
			trustworthiness: {
				reputation: reputation,
				confidence: confidence,
				description: getDescription(reputation)
			},
			categories: categories.filter(x => {
				// Only use categories over 50% confidence
				return wotResponse[domain].categories[x] >= 50;
			}).map(getLabel)
		};
	}
};

/** @method getDescription
 * @description Convert reputation value to a description
 * @param {Number} score - Web Of Trust reputation value
 */
function getDescription(score) {
	if (score >= 80) {
		return 'Excellent';
	} else if (score >= 60) {
		return 'Good';
	} else if (score >= 40) {
		return 'Unsatisfactory';
	} else if (score >= 20) {
		return 'Poor';
	}
	return 'Very Poor';
}

/** @method getLabel
 * @description Convert category ID to descriptive labels
 * @param {String} categoryId - Web Of Trust category ID
 */
function getLabel(categoryId) {
	const label = {
		101: 'Malware or viruses',
		102: 'Poor customer experience',
		103: 'Phishing',
		104: 'Scam',
		105: 'Potentially illegal',
		201: 'Misleading claims or unethical',
		202: 'Privacy risks',
		203: 'Suspicious',
		204: 'Hate, discrimination',
		205: 'Spam',
		206: 'Potentially unwanted programs',
		207: 'Ads / pop-ups',
		301: 'Online tracking',
		302: 'Alternative or controversial medicine',
		303: 'Opinions, religion, politics',
		401: 'Adult content',
		402: 'Incidental nudity',
		403: 'Gruesome or shocking',
		404: 'Site for kids',
		501: 'Good site'
	};

	return (label[categoryId]) ? label[categoryId] : 'Other';
}
