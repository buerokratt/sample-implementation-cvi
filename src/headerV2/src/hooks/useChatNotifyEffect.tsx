import { useEffect } from "react";
import { interval } from "rxjs";
import { useTranslation } from "react-i18next";
import { useDing } from "./useAudio.tsx";
import { ToastContextType } from "../context/ToastContext.tsx";
import { useBrowserNotification } from "./useBrowserNotification";

const useChatNotifyEffect = ({ toast, useStore }: { toast: ToastContextType | null, useStore: any }) => {
  const { t } = useTranslation();
  const { showNotification } = useBrowserNotification();

  const unansweredChatsLength = useStore((state) => state.unansweredChatsLength());
  const validationMessagesLength = useStore((state) => state.validationMessagesLength());
  const messagesMap = useStore((state) => state.messagesMap());
  const activeChatsLength = useStore((state) => state.activeChats.length);
  const newChatSoundNotifications = useStore((state) => state.userProfileSettings.newChatSoundNotifications);
  const newChatPopupNotifications = useStore((state) => state.userProfileSettings.newChatPopupNotifications);
  const forwardedChatsLength = useStore((state) => state.forwordedChatsLength());
  const forwardedChatSoundNotifications = useStore((state) => state.userProfileSettings.forwardedChatSoundNotifications);
  const forwardedChatPopupNotifications = useStore((state) => state.userProfileSettings.forwardedChatPopupNotifications);
  const csaStatus = useStore((state) => state.csaStatus);

  const ding = useDing();

  const handleNewMessage = () => {
    if (unansweredChatsLength <= 0) return;

    if (newMessagesDetected("byk_header_unansweredChatsMessagesMap", messagesMap)) {
      if (newChatSoundNotifications) ding?.play();
      if (newChatPopupNotifications) {
        toast?.open({
          type: "info",
          title: t("global.notification"),
          message: t("settings.users.newUnansweredChat"),
        });
      }
      showNotification()
    }
  };

  const handleForwordMessage = () => {
    if (forwardedChatsLength <= 0)
      return;

    if (samePreviousValue("byk_header_forwardedChatsLength", forwardedChatsLength))
      return;

    if (forwardedChatSoundNotifications) ding?.play();
    if (forwardedChatPopupNotifications)
      toast?.open({
        type: "info",
        title: t("global.notification"),
        message: t("settings.users.newForwardedChat"),
      });
  };

  const handleValidationMessage = () => {
    if (validationMessagesLength <= 0) return;

    if (samePreviousValue("byk_header_validationMessagesLength", validationMessagesLength)) return;

    if (newChatSoundNotifications) ding?.play();
    if (newChatPopupNotifications)
      toast?.open({
        type: "info",
        title: t("global.notification"),
        message: t("settings.users.newValidationMessage"),
      });
  };

  useEffect(() => {
    handleNewMessage();
  }, [unansweredChatsLength, activeChatsLength, messagesMap]);

  useEffect(() => {
    handleForwordMessage();
  }, [forwardedChatsLength, activeChatsLength, messagesMap]);

  useEffect(() => {
    handleValidationMessage();
  }, [validationMessagesLength]);

  useEffect(() => {
    const subscription = interval(2 * 60 * 1000).subscribe(() => {
      handleNewMessage();
      handleForwordMessage();
    });

    return () => subscription?.unsubscribe();
  }, []);
}

const samePreviousValue = (key: string, value: number) => {
  const previousValue = parseInt(localStorage.getItem(key) || "0");
  if (previousValue === value)
    return true;
  localStorage.setItem(key, value.toString());
  return false;
}

const newMessagesDetected = (key: string, currentMessagesMap: Map<string, number>) => {
  const previousMessagesMap = JSON.parse(localStorage.getItem(key) || "{}");

  let newMessages = false;
  for (const [id, value] of currentMessagesMap.entries()) {
    if (!previousMessagesMap[id] || previousMessagesMap[id] < value) {
      newMessages = true;
      break;
    }
  }

  localStorage.setItem(key, JSON.stringify(Object.fromEntries(currentMessagesMap)));
  return newMessages;
};

export default useChatNotifyEffect;
