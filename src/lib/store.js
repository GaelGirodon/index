/*
 * Store.js
 * Application global store
 */

import { writable } from "svelte/store";

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
 * Search results
 * @type {import("svelte/store").Writable<Item[]>}
 */
export const results = writable([]);

/**
 * Selected item in the results list
 * @type {import("svelte/store").Writable<Item>}
 */
export const selectedResultItem = writable(null);
