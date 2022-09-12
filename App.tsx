import React, {useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {useNotification} from './src/hooks/useNotification';

const App = () => {
  const {
    getFCMToken,
    setBackgroundMessageHandler,
    setForegroundMessageHandler,
    displayNotification,
  } = useNotification();

  useEffect(() => {
    // get FCM Token and set it to API
    const setFCMTokenToAPI = async () => {
      const FCMToken = await getFCMToken();

      console.log(FCMToken);

      //setTokenToAPI(FCMToken);
    };

    setFCMTokenToAPI();

    // set message handlers
    setBackgroundMessageHandler();
    setForegroundMessageHandler();

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
