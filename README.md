# NodeJS Express Template

![GitHub package.json version][version] ![NPM Version][npm-version] ![Node Version][node-version] ![GitHub last commit][last-commit]  ![GitHub License][license]

![nodejs](https://nodejs.org/static/logos/nodejsDark.svg) <img src="https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-svg-png-icon-download-1.png" width="30" > <img src="https://raw.githubusercontent.com/openjs-foundation/artwork/master/projects/express/express-logo-horizontal-black.svg" width="300">


NodeJS Express Template is a starter repository using a common pattern for creating microservices in NodeJS.

## Installation

Make sure you have the latest version of NodeJS or preferably NVM installed and then install the node_modules

```bash
npm install
```

## Usage

*Environment Variables*: Located in [src/env.js](src/env.js) with default values, for any new variables simply add the key to the `vars` object in this file along with an optional default, example:
```javascript
const vars = {
  ...
  NEW_KEY: "default_value"
}
```

**development**

To start a local development server with live-reload run the following:

```bash
npm start
```

**build**

When you are ready to package your changes into a minified JS file, you can build by running:

```bash
npm run build
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

[last-commit]: https://img.shields.io/github/last-commit/ranson21/tmpl-nodejs-express
[version]: https://img.shields.io/github/package-json/v/ranson21/tmpl-nodejs-express
[license]: https://img.shields.io/github/license/ranson21/tmpl-nodejs-express
[node-version]: https://badge.fury.io/js/node.svg
[npm-version]: https://badge.fury.io/js/npm.svg
