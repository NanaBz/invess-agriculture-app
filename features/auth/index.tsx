import React, { useEffect } from 'react';
import LoginScreenWired from './LoginScreenWired';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { View, ActivityIndicator } from 'react-native';

const AuthScreen = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    // If user is already logged in, navigate to home
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, router]);

  if (user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <LoginScreenWired />;
};

export default AuthScreen;
