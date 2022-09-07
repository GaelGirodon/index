/*
 * storage.js
 * Manage data in the local storage
 */

/**
 * Get the last selected index or the first available index.
 * @param {Index[]} indexes Available indexes
 * @return {Index} The selected index
 */
export function getSelectedIndex(indexes) {
  const selectedIndexName = window.localStorage.getItem("index.selectedIndexName");
  return indexes.find(i => i.name === selectedIndexName)
    ?? (indexes?.length ? indexes[0] : null);
}

/**
 * Save the selected index.
 * @param {Index} index Index to save
 */
export function saveSelectedIndex(index) {
  window.localStorage.setItem("index.selectedIndexName", index.name);
}

/**
 * Get the recently visited items.
 * @returns {Item[]} Recently visited items
 */
export function getVisitedItems() {
  return JSON.parse(window.localStorage.getItem("index.visitedItems") || "[]");
}

/**
 * Save a visited item in the storage.
 * @param {Item} item Visited item to save
 */
export function saveVisitedItem(item) {
  let visitedItems = getVisitedItems();
  visitedItems = [item, ...visitedItems.slice(0, 99)];
  window.localStorage.setItem("index.visitedItems", JSON.stringify(visitedItems));
}

/**
 * Clear all stored items.
 */
export function clear() {
  ["index.selectedIndexName", "index.visitedItems"]
    .forEach(key => window.localStorage.removeItem(key));
}
