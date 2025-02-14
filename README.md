# Index

[![release](https://img.shields.io/github/v/release/GaelGirodon/index?style=flat-square)](https://github.com/GaelGirodon/index/releases/latest)
[![license](https://img.shields.io/github/license/GaelGirodon/index?color=blue&style=flat-square)](./LICENSE)

A simple, lightweight (~19 KiB _gzipped_), and static websites index page,
featuring:

- A search bar using a fuzzy search algorithm
- Support for multiple websites indexes
- Support for websites and search engines
- Saving of recently visited websites
- 🇫🇷 French and 🇬🇧 English translations

> **Use case:** create an entrypoint page for personal or company web tools
> and resources, that can be set as a browser home or new tab page.

## Install

- Download the [latest release](https://github.com/GaelGirodon/index/releases/latest):

```bash
DOWNLOAD_URL="https://github.com/GaelGirodon/index/releases/latest/download"
curl -sL "$DOWNLOAD_URL/index.tar.gz" | tar xvz
```

- Create the configuration file: [`config.json`](./example/config.json)
  ([schema](./src/schemas/config.schema.json))
- Create an index file: [`index.json`](./example/index.json)
  ([schema](./src/schemas/index.schema.json))
- Test the index page with a local web server (e.g. `php -S localhost:8080`,
  `npx http-server`, etc.)
- Deploy files to a static web server (e.g. GitHub/GitLab Pages, Nginx, etc.)

## Usage

- Select an index to browse using the dropdown
- Type in the search field to find results
- Select a result using <kbd>↓</kbd> and <kbd>↑</kbd> keys
- Open the selected result by pressing the <kbd>Enter</kbd> key
  or 🖱️ _click_ on a result to open it

_Search engines_

- If the selected result address expects a query (`%s` in the URL),
  the search field content will be inserted before navigating to
  the target address:<br>
  `🔎 my query` + `https://search.company.org/?q=%s`
  → `https://search.company.org/?q=my%20query`
- If the query contains a `:` separator, only the second part will be sent,
  allowing both to search in the index first, and to use a different query to
  send to the selected result (e.g. another search engine), without altering
  currently displayed results:<br>
  `🔎 query for index: target query` + `https://search.company.org/?q=%s`
  → `https://search.company.org/?q=target%20query`

## License

**Index** is licensed under the GNU General Public License.
