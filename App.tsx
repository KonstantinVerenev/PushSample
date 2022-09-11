import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {useNotification} from './src/hooks/useNotification';

import {useMessaging} from './src/hooks/useMessaging';

const App = () => {
  const {getFCMToken, foregroundMessageHandler, backgroundMessageHandler} =
    useMessaging();
  const {displayNotification} = useNotification();

  //
  const [token, setToken] = useState('');

  // both handlers on one function
  async function onMessageReceived({
    notification,
  }: {
    notification: {title: string; body: string};
  }) {
    displayNotification(notification.title, notification.body);
  }

  //
  useEffect(() => {
    //get FCM Token
    const setFCMTokenToState = async () => {
      const FCMToken = await getFCMToken();

      console.log(FCMToken);

      setToken(FCMToken);
    };

    setFCMTokenToState();

    // Here we can sent Token to API
    // fetch token

    // set message handlers
    foregroundMessageHandler(onMessageReceived);
    backgroundMessageHandler(onMessageReceived);

    //return need to unsubscribe off foreground messages, back ground listener need to be called on entry point
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>PUSH SAMPLE</Text>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonWrapper}>
          <Button
            title="PUSH LOCAL NOTIFICATION"
            onPress={() => {
              displayNotification('Local push', 'Hello from local');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  buttonsWrapper: {
    marginTop: 50,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
});

export default App;
