export const USER_IDLE_STATUS_TIMEOUT = 900000; // milliseconds - 15 minutes
export const STATUS_COLORS : Record<string, string> = {
    idle: '#FFB511',
    online: '#308653',
    offline: '#D73E3E',
};
export const SUBSCRIPTION_INTERVAL = 2 * 60 * 1000;

export enum CHAT_SESSIONS {
    SESSION_ID_KEY = "tabId",
    SESSION_STATE_KEY = "sessionTabs"
}