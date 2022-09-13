/*
 * fuzzy.js
 * Simple fuzzy search algorithm
 */

/**
 * Bonus score given when there is a match from the start of a word.
 * @type {number}
 */
const initialStartBonus = 3;

/**
 * Maximum bonus score given when multiple consecutive characters match.
 * @type {number}
 */
const maxConsecutiveBonus = 6;

/**
 * Value to add to the consecutive bonus for each consecutive
 * character match, to reward them incrementally.
 * @type {number}
 */
const consecutiveBonusIncr = 2;

/**
 * Match the search and the value using a fuzzy search algorithm.
 * @param {string} value Value to match
 * @param {string} search String to search in the value
 * @returns {number} Matching score
 */
export function fuzzyMatch(value, search) {
  let score = 0; // Total score
  let pos = 0; // Position in the search
  let consecutiveBonus = 0; // Current consecutive bonus
  let startBonus = initialStartBonus; // Current start bonus

  for (let i = 0; i < value.length && pos < search.length; i++) {
    if (value[i] === search[pos]) {
      score += 1 // Basic match point
        + Math.max(0, startBonus) // Bonus when matching from a word start
        + Math.min(consecutiveBonus, maxConsecutiveBonus); // Consecutive match bonus
      consecutiveBonus += consecutiveBonusIncr;
      pos++;
    } else {
      // No match: disabling the consecutive bonus
      consecutiveBonus = 0;
    }
    // Update the start bonus
    if (isNaN(parseInt(value[i])) && value[i].toUpperCase() === value[i].toLowerCase()) {
      // Reset the start bonus on a new word (non-alphanumeric character)
      startBonus = initialStartBonus - 1; // Next start bonus is lower than the first one
    } else {
      // Decrement the start bonus as we're getting away from the word start
      startBonus--;
    }
  }
  return pos >= search.length ? score : 0;
}
