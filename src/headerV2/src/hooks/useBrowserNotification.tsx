import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useBrowserNotification = () => {
  const { t } = useTranslation();

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      const options = {
        body: t('notification.newMessage'),
        tag: 'active-message-notifications',
      };
      new Notification(t('notification.title'), options);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return { showNotification, requestNotificationPermission }
}
