import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const useMessaging = () => {
  const getFCMToken = async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const generatedToken = await messaging().getToken();

    console.log(generatedToken);

    return generatedToken;
  };

  const foregroundMessageHandler = (func: any): (() => void) => {
    return messaging().onMessage(func);
  };

  const backgroundMessageHandler = (func: any) => {
    messaging().setBackgroundMessageHandler(func);
  };

  // phone will receive notifications send to this topic
  const subscribeToTopic = async (topic: string) => {
    await requestUserPermission(true); // Notify user we can't send him notifications if deactivated
    await messaging().subscribeToTopic(topic); // must not include "/"
  };

  // phone will not receive notifications send to this topic any longer
  const unsubscribeFromTopic = async (topic: string) => {
    await messaging().unsubscribeFromTopic(topic); // must not include "/"
  };

  // request user permission to send notifications (only needed for ios)
  const requestUserPermission = async (
    alertIfNoPermission: boolean = false,
  ) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // You can choose if you wanna notify the user to activate notifcations in settings after he denied them
    if (!enabled && alertIfNoPermission) {
      Alert.alert(
        'No Permission',
        'We are not allowed to send you notifications. If you want to receive notifications from us , go to the app settings and allow push notifications.',
      );
    }
  };

  const unregisterDeviceForRemoteMessages = async () => {
    await messaging().unregisterDeviceForRemoteMessages();
  };

  return {
    getFCMToken,
    foregroundMessageHandler,
    backgroundMessageHandler,
    subscribeToTopic,
    unsubscribeFromTopic,
    requestUserPermission,
    unregisterDeviceForRemoteMessages,
  };
};
