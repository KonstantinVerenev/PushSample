import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const useNotification = () => {
  const getFCMToken = async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const generatedToken = await messaging().getToken();

    //console.log(generatedToken);

    return generatedToken;
  };

  const setBackgroundMessageHandler = async () => {
    messaging().setBackgroundMessageHandler(async message =>
      console.log(JSON.stringify(message)),
    );
  };

  const setForegroundMessageHandler = () => {
    messaging().onMessage(async message =>
      displayNotification(
        message.notification?.title,
        message.notification?.body,
      ),
    );
  };

  const displayNotification = async (title?: string, body?: string) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Required permission for iOS
    await notifee.requestPermission();

    const notificationId = notifee.displayNotification({
      // id: "string" | updates Notification instead if provided id already exists
      title: title,
      body: body,
      android: {
        channelId,
        //smallIcon: 'icon_name', // | defaults to 'ic_launcher', respectively your app icon
        pressAction: {
          id: 'default',
        },
      },
    });

    return notificationId;
  };

  const cancelAllNotifications = async (): Promise<void> => {
    await notifee.cancelAllNotifications();
  };

  const unregisterDeviceForRemoteMessages = async () => {
    await messaging().unregisterDeviceForRemoteMessages();
  };

  return {
    getFCMToken,
    setForegroundMessageHandler,
    setBackgroundMessageHandler,
    displayNotification,
    cancelAllNotifications,
    unregisterDeviceForRemoteMessages,
  };
};
