/*
 * typedefs.json
 * Custom type definitions
 */

/**
 * @typedef Config
 * @type {object}
 *
 * @property {string} [title] Page title: a short string (optional)
 * @property {string} [logo] Main logo: a URL or data string (optional)
 * @property {string} [source] Configuration and indexes source repository:
 *                             a URL, e.g. to a Git repository (optional)
 * @property {Index[]} indexes Available indexes list
 */

/**
 * @typedef Index
 * @type {object}
 *
 * @property {string} name Index display name: a short string
 * @property {string} [icon] Index icon: an emoji unicode character (optional)
 * @property {string} url Index JSON path: an absolute or relative URL
 */

/**
 * @typedef Item
 * @type {object}
 *
 * @property {string} name Index item display name: a short string
 * @property {string} icon Index item icon: URL, data string or emoji unicode character
 * @property {string[]} [keywords] Index item additional keywords (taken into account for search)
 * @property {string} [description] Index item short description
 * @property {string} url Index item resource URL
 */
