# Index

A simple, lightweight (~14 KiB _gzipped_) and static websites index page
featuring:

- A search bar using a fuzzy search algorithm
- Support for multiple websites indexes
- Saving of recently visited websites
- 🇫🇷 French and 🇬🇧 English translations

> _Use case:_ create an entrypoint page for personal or company web tools
> and resources that can be set as a browser home or new tab page.

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
- Deploy files to a static web server (e.g. GitHub/GitLab Pages)

## Usage

- Select an index to browse using the dropdown
- Type in the search field to find results
- Select a result using <kbd>↓</kbd> and <kbd>↑</kbd> keys
- Open the selected result by pressing the <kbd>Enter</kbd> key<br>
  or 🖱️ _click_ on a result to open it

## License

**Index** is licensed under the GNU General Public License.
