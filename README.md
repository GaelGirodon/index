# Index

A simple, lightweight (~13 KiB _gzipped_) and static websites index page
featuring:

- A search bar using a fuzzy search algorithm
- Support for multiple websites indexes
- Saving of recently visited websites

> _Use case:_
> create an entrypoint for personal or company web tools and resources
> that can be set as a browser home or new tab page.

## Usage

- Download the [latest release](https://github.com/GaelGirodon/index/releases/latest):

```bash
DOWNLOAD_URL="https://github.com/GaelGirodon/index/releases/latest/download"
curl -sL "$DOWNLOAD_URL/index.tar.gz" | tar xvz
```

- Create the configuration file: [`config.json`](./example/config.json)
  ([schema](./src/schemas/config.schema.json))
- Create an index file: [`index.json`](./example/index.json)
  ([schema](./src/schemas/index.schema.json))
- Serve files:
  - Start a web server (e.g. using `php -S localhost:8080`,
    `npx http-server`, etc.), or,
  - Deploy files to a static web server (e.g. GitHub/GitLab Pages)

## License

**Index** is licensed under the GNU General Public License.
