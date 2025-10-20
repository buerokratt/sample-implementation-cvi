import {CHAT_SESSIONS} from "../consts/consts";

export const isLastSession = (): boolean => {
    const currentState = JSON.parse(
        localStorage.getItem(CHAT_SESSIONS.SESSION_STATE_KEY) as string
    ) || { ids: [], count: 0 };
    return currentState.count <= 1;
};

export const wasPageReloaded = () => {
    return window.performance
        .getEntriesByType("navigation")
        .map((nav) => (nav as PerformanceNavigationTiming).type)
        .includes("reload");
};

export const wasPageReloadedNavigate = () => {
    return window.performance.getEntriesByType("navigation").some((nav) => {
        const type = (nav as PerformanceNavigationTiming).type;
        return type === "reload" || type === "navigate";
    });
};