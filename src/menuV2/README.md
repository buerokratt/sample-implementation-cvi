## MainNavigation component

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
- Add to `package.json` @buerokratt-ria/menu: followed by version, list of available version could be found [here](CHANGELOG.md)

## Adding dependency as local package
- When you build the package file, put it in `root` directory of the application
- Add to `package.json` @buerokratt-ria/header: file:name-of-the-generated-package
  - If having import issues like `NOT FOUND` try adding to `vite.config.ts` 
    `resolve: {
    alias: {
        '@buerokratt-ria': `${path.resolve(__dirname, 'node_modules/@buerokratt-ria/menu/src')}`
        },
    }`

## Using package
* Importing component
  * `import { MainNavigation } from '@buerokratt-ria/menu/src'` for Header and Menu
  * If you want to use local package, put created package to the root of react app and add dependency like "@buerokratt-ria/header": "file:buerokratt-ria-menu-0.0.5.tgz" (use proper version)
### Using MainNavigation component
  * MainNavigation uses four env variable:
    * use `REACT_APP_MENU_URL` & `REACT_APP_MENU_PATH` to set the url for json that contains the menu item array
    * use `REACT_APP_MENU_JSON` with json string of the menu item array
      * `REACT_APP_MENU_JSON` will overrides buth the local file provieded by package and the `REACT_APP_MENU_URL` & `REACT_APP_MENU_PATH`
    * If you want to use only local file provided by package then remove `REACT_APP_MENU_JSON`, `REACT_APP_MENU_URL` & `REACT_APP_MENU_PATH` variables
    * `REACT_APP_SERVICE_ID` set of values seperated by comma resembling current module, examples of this value could be found in following links
    
    

### Implemented examples:
* https://github.com/buerokratt/Training-Module
* https://github.com/buerokratt/Service-Module
* https://github.com/buerokratt/Analytics-Module
