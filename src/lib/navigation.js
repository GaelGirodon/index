/*
 * navigation.js
 * Navigation service
 */

import * as storage from "./storage";

/**
 * Navigate to the URL of an item.
 * @param {Item} item The item to navigate to
 * @param {string} query User query for the target search engine
 */
export function navigate(item, query) {
  storage.saveVisitedItem(item);
  window.location.href = item?.url
    ?.replace("%s", () => encodeURIComponent(query));
}
