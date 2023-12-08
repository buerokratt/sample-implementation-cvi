## Header component

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
- Add to `package.json` @buerokratt-ria/header: followed by version, list of available version could be found [here](CHANGELOG.md)

## Adding dependency as local package
- When you build the package file, put it in `root` directory of the application
- Add to `package.json` @buerokratt-ria/header: file:name-of-the-generated-package
  - If having import issues like `NOT FOUND` try adding to `vite.config.ts` 
    `resolve: {
    alias: {
        '@buerokratt-ria': `${path.resolve(__dirname, 'node_modules/@buerokratt-ria/header/src')}`
        },
    }`

## Using package
* Importing components
  * `import { Header } from '@buerokratt-ria/header/src/index'` for Header only
* Make sure that App.tsx fetches initial user info and stores it in store that provided by application
    * If you want to use local package, put created package to the root of react app and add depenency like "@buerokratt-ria/header": "file:buerokratt-ria-header-0.0.5.tgz" (use proper version)

### Using Header component
* Example of using header component  
  <Header
    user={useUserInfoStore.getState()}  
  />

* Using user store is critical for header to function since it contains information about user that would be shown in Header
  * User store script in examples folder
  * You must fetch initial data in App.tsx file and then delegate it to header for displaying

### Implemented examples:
* https://github.com/buerokratt/Training-Module
* https://github.com/buerokratt/Service-Module
* https://github.com/buerokratt/Analytics-Module
