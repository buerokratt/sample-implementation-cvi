export const EMERGENCY_NOTICE_LENGTH = 250;
export const WELCOME_MESSAGE_LENGTH = 250;
export const STATUS_COMMENT_LENGTH = 100;
export const USER_IDLE_STATUS_TIMEOUT = 900000; // milliseconds - 15 minutes
export const CHAT_INPUT_LENGTH = 500;
export const TOAST_TIMEOUT = 2000;
export const CHAT_HISTORY_PREFERENCES_KEY = 'chat-history-preferences';

export const isHiddenFeaturesEnabled = 
  import.meta.env.REACT_APP_ENABLE_HIDDEN_FEATURES?.toLowerCase().trim() == 'true' ||
  import.meta.env.REACT_APP_ENABLE_HIDDEN_FEATURES?.toLowerCase().trim() == '1';

export const isValidationsEnabled =
  import.meta.env.REACT_APP_VALIDATIONS_ENABLED?.toLowerCase().trim() == "true" ||
  import.meta.env.REACT_APP_VALIDATIONS_ENABLED?.toLowerCase().trim() == "1";
