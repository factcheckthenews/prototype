'use strict';

// Source: Oxford New Monitor Corpus 2014
// http://blog.oxforddictionaries.com/2014/11/political-insults/

const slanderTerms = {
	loon: 100,
	twit: 100,
	nitwit: 100,
	trash: 90,
	hippie: 90,
	moron: 87,
	hypocrite: 85,
	fool: 85,
	scum: 85,
	elitist: 80,
	troll: 80,
	shill: 80,
	crony: 80,
	hack: 80,
	lemming: 80,
	loser: 70,
	racist: 70,
	idiot: 70,
	radical: 50,
	bigot: 50,
	wacko: 50,
	blowhard: 50,
	fringe: 50,
	lunatic: 40,
	crazy: 40,
	thug: 40,
	nutjob: 40,
	nut: 40,
	zealot: 20,
	ideologue: 20,
	misogynist: 10,
	extremist: 10,
	obstructionist: 10,
	fanatic: 10
};

/** @method contains
 * @description Searches collection for a slander word
 * @param {Array} collection - Collection to search
 * @returns true or false if political slander term is present in collection
 */
function contains(collection) {
	return collection.some(word => {
		return (word in slanderTerms);
	});
}

/** @method terms
 * @description Fetches slander words used
 * @param {Array} collection - Collection to search
 * @returns array of slander terms used
 */
function terms(collection) {
	return Array.from(new Set(
		collection.filter(word => {
			return (word in slanderTerms);
		})
	));
}

/** @method spectrumLabel
 * @description Labels the slander term on the political spectrum
 * @param {String} term - Term to query
 * @returns 'liberal' or 'conservative' based on how the word is used
 */
function spectrumLabel(term) {
	if (term in slanderTerms) {
		return (slanderTerms[term] > 50) ? 'liberals' : 'conservatives';
	}
	return null;
}

module.exports = {
	in: contains,
	terms: terms,
	label: spectrumLabel
};
