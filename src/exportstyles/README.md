## Styles component

### General information

Changelog file could be found here [link](CHANGELOG.md)

## Creating package

To create npm package for future usage:
* Navigate to the root directory of the package.
* Run `npm pack` command, to create package file.
  * If you made updates to the package please relate to this [file](MAKING_CHANGES.md) before creating package

To publish created package:
* Run `npm publish --access public`
* Authorize in npm and package would be published

## Adding dependency from remote
- Since this package currently being deployed to @buerokratt-ria account therefore it would need to be related as @buerokratt-ria
- Add to `package.json` @buerokratt-ria/styles: followed by version, list of available version could be found [here](CHANGELOG.md)

## Adding dependency as local package
- When you build the package file, put it in `root` directory of the application
- Add to `package.json` @buerokratt-ria/styles: file:name-of-the-generated-package
  - If having import issues like `NOT FOUND` try adding to `vite.config.ts` 
    `resolve: {
    alias: {
        '@buerokratt-ria': `${path.resolve(__dirname, 'node_modules/@buerokratt-ria/styles')}`
        },
    }`

### Using Styles component
* This is prebuilt set of rules and styles used by Buerokratt.
* within scss files start import with @buerokratt-ria/styles... followed by rule you want to import
* within regular components you can relate to index.ts file that has all exports described.

### Implemented examples:
* https://github.com/buerokratt/Training-Module
* https://github.com/buerokratt/Service-Module
* https://github.com/buerokratt/Analytics-Module
