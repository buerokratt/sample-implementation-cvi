# Changelog
All changes to this project will be documented in this file.

## [0.1.34] - 30-04-2025

- Improved adding comment to away status UI

## [0.1.32] - 11-04-2025

- Fixed Activity Change alignment with status

## [0.1.31] - 11-04-2025

- Modified Change Status to Change Status Comment

## [0.1.30] - 11-04-2025

- Added Offline Status Comment

## [0.1.29] - 10-04-2025

- Modified Idle Timeout Constant

## [0.1.28] - 10-04-2025

- Removed Idle Notification

## [0.1.27] - 25-03-2025

- Fixed Status Green to yellow flow
- Enhanced Active - Idle - Offline switch flow

## [0.1.26] - 24-03-2025

- Fixed logic behind active chats length method.

## [0.1.25] - 19-03-2025

- Updated active chat counts that used in menu to just display overall active chats length.

## [0.1.24] - 18-03-2025

- Disabled Api Request Cache

## [0.1.23] - 14-03-2025

- Fixed csa status change on idle

## [0.1.22] - 04-03-2025

- Fixed forwarded chats and validations notifications
- Handled focused chat
- Fixed Notifications for unrelated csa's

## [0.1.21] - 12-02-2025

- Added customer support activity on error handle

## [0.1.20] - 27-01-2025

- Fixed Active Chats Ding
- Removed CSA Status from pending chats

## [0.1.19] - 17-01-2025

- Modified Validations Endpoint

## [0.1.18] - 13-01-2025

- Added sse event into header to track chats properly

## [0.1.17] - 06-12-2024

- Added Validation Messages

## [0.1.16] - 19-11-2024

- Added check for local to ignore token check for developers

## [0.1.15] - 11-11-2024

- Updated token expiration check

## [0.1.14] - 07-07-2024

- Replace Howler with audio
- Passed State to useChatNotifyEffect Hook
- Passed User info given to header to the header store
- Checked for CSA Status before playing sound or showing notification

## [0.1.11] - 07-07-2024

- Header is updated to send notifications for every new message instead of every new chat

## [0.1.9] - 20-06-2024

- Improvements and bug fixes

## [0.1.8] - 19-06-2024

- Improvements and bug fixes

## [0.1.7] - 18-06-2024

- Improvements and bug fixes

## [0.1.6] - 30-05-2024

- Hide some user settings if `REACT_APP_ENABLE_HIDDEN_FEATURES` is `TRUE`

## [0.1.5] - 25-04-2024

- Updated api call addresses 

## [0.1.4] - 02-15-2024

- Updated store file to match chatbot changes.
- Updated /types/chat file to match chatbot changes.

## [0.1.3] - 01-01-2024

- Updated usage of activity.active

## [0.1.2] - 09-01-2024

- Remove audio error console message.

## [0.1.1] - 06-12-2023

- Initial version of Header component for ruuter v2.
