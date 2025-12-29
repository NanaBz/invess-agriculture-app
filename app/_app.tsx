import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import store from '../store';

function usePushNotifications(user: any) {
  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (!Constants.isDevice) return;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') return;
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;
      // Save token to backend for this user
      if (user && token) {
        fetch('https://your-backend-url.com/api/users/push-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, token }),
        });
      }
    }
    registerForPushNotificationsAsync();
  }, [user]);
}

function AppInner({ Component, pageProps }: any) {
  const user = useSelector((state: any) => state.user.user);
  usePushNotifications(user);
  return <Component {...pageProps} />;
}

export default function App(props: any) {
  return (
    <Provider store={store}>
      <AppInner {...props} />
    </Provider>
  );
}

