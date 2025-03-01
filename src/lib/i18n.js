/*
 * i18n.js
 * Internationalisation service
 */

/**
 * Current language
 */
const language = ["en", "fr"]
  .find(l => l === navigator?.language?.toLowerCase()?.slice(0, 2)) ?? "en";

/**
 * Get the string associated to the given key
 * for the current navigator language.
 * @param {string} key String key
 * @param {...string} args String value arguments
 * @returns String value
 */
export default function getString(key, ...args) {
  let value = strings?.[key]?.[language] ?? "";
  return value.replace(/\{([0-9]+)}/g, (_, i) => args[i] ?? "");
}

/**
 * Application strings
 * @type {{ [key: string]: { [lang: "en"|"fr"]: string } }}
 */
const strings = {
  "title": {
    "en": "Index",
    "fr": "Index"
  },
  "logo.alt": {
    "en": "Logo",
    "fr": "Logo"
  },
  "index-select.desc": {
    "en": "Select an index",
    "fr": "Sélectionner un index"
  },
  "search-bar.icon.alt": {
    "en": "Magnifying glass search icon",
    "fr": "Icône de loupe de recherche"
  },
  "search-bar.desc": {
    "en": "Search in the selected index",
    "fr": "Rechercher dans l'index sélectionné"
  },
  "search-bar.placeholder": {
    "en": "Search",
    "fr": "Rechercher"
  },
  "search-bar.hint.target-query": {
    "en": ": {0} query",
    "fr": " : requête {0}"
  },
  "item.desc": {
    "en": "Navigate to {0}",
    "fr": "Accéder à {0}"
  },
  "item.desc.search": {
    "en": "Search for \"{1}\" on {0}",
    "fr": "Rechercher \"{1}\" sur {0}"
  },
  "item.visited.desc": {
    "en": "Recently visited",
    "fr": "Récemment visité"
  },
  "results.none": {
    "en": "No result found for \"{0}\"",
    "fr": "Aucun résultat trouvé pour \"{0}\""
  },
  "results.contribute": {
    "en": "Contribute to this page",
    "fr": "Contribuer à cette page"
  },
  "settings.title": {
    "en": "Settings",
    "fr": "Paramètres"
  },
  "settings.clear-data": {
    "en": "Clear data",
    "fr": "Effacer les données"
  },
  "settings.clear-data.desc": {
    "en": "Clear local data and reload the page",
    "fr": "Effacer les données locales et recharger la page"
  },
  "settings.contribute": {
    "en": "Contribute",
    "fr": "Contribuer"
  },
  "settings.contribute.desc": {
    "en": "Contribute to this page",
    "fr": "Contribuer à cette page"
  },
  "settings.toggle.open": {
    "en": "Open settings",
    "fr": "Ouvrir les paramètres"
  },
  "settings.toggle.close": {
    "en": "Close settings",
    "fr": "Fermer les paramètres"
  },
  "settings.toggle.icon.alt": {
    "en": "Settings toggle icon",
    "fr": "Icône d'ouverture/fermeture des paramètres"
  }
};
