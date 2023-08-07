import { FC,useState,useEffect,useMemo } from 'react';
import Drawer from "../Drawer";
import Section from "../Section";
import Track from "../Track";
import {AUTHORITY} from "../../types/authorities";
import useUserInfoStore from "../../store/store";
import { useTranslation } from 'react-i18next';
import {Chat, CHAT_STATUS} from "../../types/chat";
import toast from "../../components/Toast";
import { Subscription, interval } from 'rxjs';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import chatSound from '../../assets/chatSound.mp3';
import * as API_CONF from '../../services/api-conf';
import apis from '../../services/apis';
import {SUBSCRIPTION_INTERVAL} from "../../consts/consts";
import {UserProfileSettings} from "../../types/userProfileSettings";
import SwitchBox from "../SwitchBox";

const UserSettings: FC = () => {
    const { userInfo } = useUserInfoStore();
    const [userDrawerOpen, setUserDrawerOpen] = useState(false);
    const [activeChatsList, setActiveChatsList] = useState<Chat[]>([]);
    const queryClient = useQueryClient();
    const audio = useMemo(() => new Audio(chatSound), []);
    const { t } = useTranslation();
    const getMessages = async () => {
        const { data: res } = await apis(API_CONF.DEV_V2_BASE_URL).get(API_CONF.GET_USER_PROFILE_SETTINGS, {
            params: {
                // TODO: Use actual id from userInfo once it starts using real data
                userId: 1,
            },
        });
        if (res.response) setUserProfileSettings(res.response);
    };

    const forwardedChats = useMemo(
        () =>
            activeChatsList
                ? activeChatsList.filter(
                    (c) =>
                        c.status === CHAT_STATUS.REDIRECTED &&
                        c.customerSupportId === userInfo?.idCode
                ).length
                : 0,
        [activeChatsList]
    );

    const handleUserProfileSettingsChange = (key: string, checked: boolean) => {
        if (!userProfileSettings) return;
        const newSettings = {
            ...userProfileSettings,
            [key]: checked,
        };
        userProfileSettingsMutation.mutate(newSettings);
    };

    const userProfileSettingsMutation = useMutation({
        mutationFn: async (data: UserProfileSettings) => {
            await apis(API_CONF.DEV_V2_BASE_URL).post(API_CONF.SET_USER_PROFILE_SETTINGS, data);
            setUserProfileSettings(data);
        },
        onError: async (error: AxiosError) => {
            await queryClient.invalidateQueries(['cs-get-user-profile-settings']);
            toast.open({
                type: 'error',
                title: t('global.notificationError'),
                message: error.message,
            });
        },
    });

    const unansweredChats = useMemo(
        () =>
            activeChatsList
                ? activeChatsList.filter((c) => c.customerSupportId === '').length
                : 0,
        [activeChatsList]
    );

    useEffect(() => {
        let subscription: Subscription;
        if (unansweredChats > 0) {
            if (userProfileSettings.newChatSoundNotifications) audio.play();
            if (userProfileSettings.newChatEmailNotifications)
                if (userProfileSettings.newChatPopupNotifications) {
                    // TODO send email notification
                    toast.open({
                        type: 'info',
                        title: t('global.notification'),
                        message: t('settings.users.newUnansweredChat'),
                    });
                }
            subscription = interval(SUBSCRIPTION_INTERVAL).subscribe(() => {
                if (userProfileSettings.newChatSoundNotifications) audio.play();
                if (userProfileSettings.newChatPopupNotifications) {
                    toast.open({
                        type: 'info',
                        title: t('global.notification'),
                        message: t('settings.users.newUnansweredChat'),
                    });
                }
            });
        }
        return () => {
            if (subscription) subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unansweredChats]);

    const [userProfileSettings, setUserProfileSettings] =
        useState<UserProfileSettings>({
            userId: 1,
            forwardedChatPopupNotifications: false,
            forwardedChatSoundNotifications: true,
            forwardedChatEmailNotifications: false,
            newChatPopupNotifications: false,
            newChatSoundNotifications: true,
            newChatEmailNotifications: false,
            useAutocorrect: true,
        });

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <>
    <Drawer
        title={userInfo.displayName}
        onClose={() => setUserDrawerOpen(false)}
        style={{ width: 400 }}
    >
        <Section>
            <Track gap={8} direction="vertical" align="left">
                {[
                    {
                        label: t('settings.users.displayName') + ' test',
                        value: userInfo.displayName + 'kek ',
                    },
                    {
                        label: t('settings.users.userRoles'),
                        value: userInfo.authorities
                            .map((r) => t(`roles.${r}`))
                            .join(', '),
                    },
                    { label: t('settings.users.email'), value: userInfo.email },
                ].map((meta, index) => (
                    <Track key={`${meta.label}-${index}`} gap={24} align="left">
                        <p style={{ flex: '0 0 120px' }}>{meta.label}:</p>
                        <p>{meta.value}</p>
                    </Track>
                ))}
            </Track>
        </Section>
        {[
            AUTHORITY.ADMINISTRATOR,
            AUTHORITY.CUSTOMER_SUPPORT_AGENT,
            AUTHORITY.SERVICE_MANAGER,
        ].some((auth) => userInfo.authorities.includes(auth)) && (
            <>
                <Section>
                    <Track gap={8} direction="vertical" align="left">
                        <p className="h6">{t('settings.users.autoCorrector')}</p>
                        <SwitchBox
                            name="useAutocorrect"
                            label={t('settings.users.useAutocorrect')}
                            checked={userProfileSettings.useAutocorrect}
                            onCheckedChange={(checked) =>
                                handleUserProfileSettingsChange('useAutocorrect', checked)
                            }
                        />
                    </Track>
                </Section>
                <Section>
                    <Track gap={8} direction="vertical" align="left">
                        <p className="h6">{t('settings.users.emailNotifications')}</p>
                        <SwitchBox
                            name="forwardedChatEmailNotifications"
                            label={t('settings.users.newForwardedChat')}
                            checked={
                                userProfileSettings.forwardedChatEmailNotifications
                            }
                            onCheckedChange={(checked) =>
                                handleUserProfileSettingsChange(
                                    'forwardedChatEmailNotifications',
                                    checked
                                )
                            }
                        />
                        <SwitchBox
                            name="newChatEmailNotifications"
                            label={t('settings.users.newUnansweredChat')}
                            checked={userProfileSettings.newChatEmailNotifications}
                            onCheckedChange={(checked) =>
                                handleUserProfileSettingsChange(
                                    'newChatEmailNotifications',
                                    checked
                                )
                            }
                        />
                    </Track>
                </Section>
                <Section>
                    <Track gap={8} direction="vertical" align="left">
                        <p className="h6">{t('settings.users.soundNotifications')}</p>
                        <SwitchBox
                            name="forwardedChatSoundNotifications"
                            label={t('settings.users.newForwardedChat')}
                            checked={
                                userProfileSettings.forwardedChatSoundNotifications
                            }
                            onCheckedChange={(checked) =>
                                handleUserProfileSettingsChange(
                                    'forwardedChatSoundNotifications',
                                    checked
                                )
                            }
                        />
                        <SwitchBox
                            name="newChatSoundNotifications"
                            label={t('settings.users.newUnansweredChat')}
                            checked={userProfileSettings.newChatSoundNotifications}
                            onCheckedChange={(checked) =>
                                handleUserProfileSettingsChange(
                                    'newChatSoundNotifications',
                                    checked
                                )
                            }
                        />
                    </Track>
                </Section>
                <Section>
                    <Track gap={8} direction="vertical" align="left">
                        <p className="h6">{t('settings.users.popupNotifications')}</p>
                        <SwitchBox
                            name="forwardedChatPopupNotifications"
                            label={t('settings.users.newForwardedChat')}
                            checked={
                                userProfileSettings.forwardedChatPopupNotifications
                            }
                            onCheckedChange={(checked) =>
                                handleUserProfileSettingsChange(
                                    'forwardedChatPopupNotifications',
                                    checked
                                )
                            }
                        />
                        <SwitchBox
                            name="newChatPopupNotifications"
                            label={t('settings.users.newUnansweredChat')}
                            checked={userProfileSettings.newChatPopupNotifications}
                            onCheckedChange={(checked) =>
                                handleUserProfileSettingsChange(
                                    'newChatPopupNotifications',
                                    checked
                                )
                            }
                        />
                    </Track>
                </Section>
            </>
        )}
    </Drawer>
        </>
    );
};

export default UserSettings;
