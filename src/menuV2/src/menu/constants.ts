export const isHiddenFeaturesEnabled = 
  import.meta.env.REACT_APP_ENABLE_HIDDEN_FEATURES?.toLowerCase().trim() == 'true' ||
  import.meta.env.REACT_APP_ENABLE_HIDDEN_FEATURES?.toLowerCase().trim() == '1';
