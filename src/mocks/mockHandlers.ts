import { api } from '../components/services/mock-apis';
import {CUSTOM_JWT_INFO} from '../exportcomponents/src/header/services/api-conf';

let stateSwitch = true;

let currentState = {
    idCode: "EE30303039914",
    active: stateSwitch ? 'true' : 'false',
    status: stateSwitch ? 'online' : 'offline'
}

const str = '{"data":{"get_all_active_chats":[{"id":"3d14f0bb-5bb9-4ee0-b82f-ba7c08a0e854","customerSupportId":"EE30303039914","customerSupportDisplayName":"OK","csaTitle":"OG","endUserId":"","endUserFirstName":"","endUserLastName":"","status":"OPEN","created":"2023-10-11T09:01:06.529+00:00","updated":"2023-11-03T14:25:15.737+00:00","ended":null,"endUserEmail":"","endUserPhone":"","endUserOs":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36","endUserUrl":"https://dev.buerokratt.ee/","externalId":"","forwardedTo":"","forwardedToName":"","receivedFrom":"","receivedFromName":"","lastMessage":"klienditeenindaja","contactsMessage":null,"lastMessageTimestamp":"2023-10-11T09:01:06.520+00:00","lastMessageEvent":"greeting"},{"id":"da5d1716-df64-4a67-80ee-285132f6b6b0","customerSupportId":"EE30303039914","customerSupportDisplayName":"OK","csaTitle":"OG","endUserId":"","endUserFirstName":"","endUserLastName":"","status":"OPEN","created":"2023-10-11T11:18:48.421+00:00","updated":"2023-11-03T14:23:53.835+00:00","ended":null,"endUserEmail":"","endUserPhone":"","endUserOs":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0","endUserUrl":"https://dev.buerokratt.ee/","externalId":"","forwardedTo":"","forwardedToName":"","receivedFrom":"","receivedFromName":"","lastMessage":"tere","contactsMessage":null,"lastMessageTimestamp":"2023-10-11T11:18:48.413+00:00","lastMessageEvent":"greeting"},{"id":"58e12d9b-90f0-4494-8594-fc1dba5ec4dc","customerSupportId":"EE30303039914","customerSupportDisplayName":"OK","csaTitle":"OG","endUserId":"","endUserFirstName":"","endUserLastName":"","status":"OPEN","created":"2023-10-12T07:15:29.610+00:00","updated":"2023-11-03T09:18:23.735+00:00","ended":null,"endUserEmail":"","endUserPhone":"","endUserOs":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36","endUserUrl":"https://dev.buerokratt.ee/","externalId":"","forwardedTo":"","forwardedToName":"","receivedFrom":"","receivedFromName":"","lastMessage":"suuna","contactsMessage":null,"lastMessageTimestamp":"2023-10-12T07:15:29.528+00:00","lastMessageEvent":"greeting"},{"id":"308d710e-7c58-4ead-94ba-a63edbf96dcb","customerSupportId":"EE30303039816","customerSupportDisplayName":"Janina","csaTitle":"test","endUserId":"","endUserFirstName":"","endUserLastName":"","status":"OPEN","created":"2023-11-08T14:58:42.037+00:00","updated":"2023-11-08T14:58:48.997+00:00","ended":null,"endUserEmail":"","endUserPhone":"","endUserOs":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36","endUserUrl":"https://dev.buerokratt.ee/","externalId":"","forwardedTo":"","forwardedToName":"","receivedFrom":"","receivedFromName":"","lastMessage":"suuna","contactsMessage":null,"lastMessageTimestamp":"2023-11-08T14:58:56.831+00:00","lastMessageEvent":"message-read"}]},"error":null}';

export const allChats =
    api
        .onGet('cs-get-all-active-chats')
        .reply(200,JSON.parse(str))
export const customJwt =
    api
        .onGet('mock-response')
        .reply(200, {
            data: {
                custom_jwt_userinfo: {
                    firstName: "Rasmus",
                    lastName: "Eimla",
                    idCode: "EE30303039914",
                    displayName: "Rasmuss",
                    JWTCreated: '1691471980000',
                    login: "EE30303039914",
                    csaEmail: "rasmus@gmail.com",
                    authorities: [
                        "ROLE_ADMINISTRATOR"
                    ],
                    csaTitle: "Super User",
                    JWTExpirationTimestamp: '1691475580000'
                }
            },
            error: null
        });

export const getUserRole =
    api
        .onGet( 'cs-get-user-role')
        .reply(200, {
            data: {
                get_user: [
                    {
                        "authorities":
                            ["ROLE_ADMINISTRATOR"]
                    }]
            },
            error: null
        })

export const getProfieSettings =
    api
        .onGet("cs-get-user-profile-settings?userId=*")
        .reply(200, {
            response: null
        })

export const getUserProfileSettings =
    api
        .onPost("cs-get-user-profile-settings")
        .reply(200,{
            "response": {
                "userId'": 1,
                "forwardedChatPopupNotifications": true,
                "forwardedChatSoundNotifications": true,
                "forwardedChatEmailNotifications": true,
                "newChatPopupNotifications": true,
                "newChatSoundNotifications": true,
                "newChatEmailNotifications": true,
                "useAutocorrect": false
            }
        })

export const setProfileSettings =
    api
        .onPost('/')
        .reply(200, {})
export const getCustomerSupportActivity =
    api
        .onGet('cs-get-customer-support-activity')
        .reply(200, {
            data: {
                get_customer_support_activity: [
                    {
                        idCode: currentState.idCode,
                        active: currentState.active,
                        status: currentState.status
                    }
                ]
            },
            error: null
        })

export const setCustomerSupportActivity =
    api
        .onPost('cs-set-customer-support-activity', {
            idCode: currentState.idCode,
            active: currentState.active,
            status: currentState.status
        })
        .reply(200, {
            idCode: currentState.idCode,
            active: currentState.active,
            status: currentState.status
        })
