/*
 * Store.js
 * Application global store
 */

import { derived, writable } from "svelte/store";

/**
 * Application configuration
 * @type {import("svelte/store").Writable<Config>}
 */
export const config = writable({ indexes: [] });

/**
 * Items from the selected index
 * @type {import("svelte/store").Writable<Item[]>}
 */
export const items = writable([]);

/**
 * Most and recent visited items
 * @type {import("svelte/store").Writable<Item[]>}
 */
export const visitedItems = writable([]);

/**
 * User search query
 * @type {import("svelte/store").Writable<string>}
 */
export const query = writable("");

/**
 * Parsed user search query (`local` is used for the search in this tool,
 * `target` is the query to be sent to the selected search engine)
 * @type {import("svelte/store").Readable<{local: string, target: string}>}
 */
export const parsedQuery = derived(query, (q) => {
    const parts = (q ?? "").split(":", 2);
    return { local: parts[0].trim(), target: parts.at(-1).trim() };
  }
);

/**
 * Search results
 * @type {import("svelte/store").Writable<Item[]>}
 */
export const results = writable([]);

/**
 * Selected item in the results list
 * @type {import("svelte/store").Writable<Item>}
 */
export const selectedResultItem = writable(null);
