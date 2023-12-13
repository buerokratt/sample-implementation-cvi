# Changelog
All changes to this project will be documented in this file.
## [0.0.29] - 13-12-2023

- Modified Header Endpoints to route to ruuter v2
- Modified Menu Endpoints to route to ruuter v2

## [0.0.28] - 16-11-2023

- Re applied button styles fix from v0.22
- Minor fix in logic for menu collapse

## [0.0.27] - 10-11-2023

- Added translation functionality to menu
- Updated menu opening logic
- Updated header to match code from chat bot
- Removed old url links
- Added appBase param

## [0.0.26] - 24-10-2023

-Updated usersettings

## [0.0.25] - 24-10-2023

-Menu items array fix

## [0.0.23] - 24-10-2023

- Fixed requests using mock data.

## [0.0.22] - 24-10-2023

- Fixed styling issues.
- Fixed requests using mock data.

## [0.0.21] - 18-09-2023

- Changed service id from string to string[] (array)

## [0.0.20] - 15-09-2023

- Updated menu structure data. Changed main navigation component to use added variables. Changed finding current module logic.

## [0.0.19] - 11-09-2023

- Updated 'storeState' type for header. Removed double 'userInfo' interface declaration.

## [0.0.18] - 11-09-2023

- Updated navigation menu default data.

## [0.0.17] - 06-09-2023

- Updated navigation menu link generation.

## [0.0.16] - 01-09-2023

- Updated menu paths

## [0.0.15] - 01-09-2023

- Removed mock handlers export

## [0.0.14] - 01-09-2023

- Added renavigation(loads other app instead of withing current app) to menu structure
- Fix the url propogation for ..-user-profile-settings

## [0.0.13] - 30-08-2023

- Initial stable release
- Updated menu paths
- Updated menu path duplication checking

## [0.0.12] - 29-08-2023

- Updated menu translations

## [0.0.11] - 29-08-2023

- Introducing new variable REACT_APP_RUUTER_V2_ANALYTICS_API_URL that would be used for calling `get/set-user-profile-settings`
- Reworked api file to include base url when calling an api
- Updated header menu to process new variable

## [0.0.10] - 28-08-2023

- Removed unused parts of code including console.log
- Minor fix to API calls

## [0.0.9] - 28-08-2023

- Removed all the mocking parts from exportable component
- Removed MOCK_ENABLE from components

## [0.0.8]

- Reverted api files to inital state
- Introduced new env variable REACT_APP_RUUTER_V1_PRIVATE_API_URL
- Introduced new env variable REACT_APP_RUUTER_V2_PRIVATE_API_URL
- Made MOCK_ENABLED variable to controll mocks

## [0.0.7]

- Introduced mock for api calls

## [0.0.6]

- Reworked processing of menu component
- Added check if menu file could not be fetched then local version would be used as a fallback

## [0.0.5]

- added overall export to index file for better imort

## [0.0.4]

- Temporaly removed usage of CVI styles
- Temporaly removed usage of CVI components

## [0.0.3]

- Header imports fixes

## [0.0.2] - 2022-04-20

- Updated interactions with menu

## [0.0.1] - 2022-04-20

- Initial structure of package was made
