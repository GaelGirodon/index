/*
 * navigation.js
 * Navigation service
 */

import * as storage from "./storage";

/**
 * Navigate to the URL of an item.
 * @param {Item} item The item to navigate to
 */
export function navigate(item) {
  storage.saveVisitedItem(item);
  window.location.href = item?.url;
}
