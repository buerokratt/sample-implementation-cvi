import {Chat} from "../types/chat";

export const filterChatsByDomains = (
    chats: Chat[],
    domains: string[],
    extraFilter?: (chat: Chat) => boolean
) => {
    return chats.filter(c =>
        domains.some(d => (c.endUserUrl || "").includes(d)) &&
        (extraFilter ? extraFilter(c) : true)
    );
}