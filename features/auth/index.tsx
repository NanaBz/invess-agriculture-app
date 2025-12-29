
import React, { useEffect } from 'react';
import LoginScreenWired from './LoginScreenWired';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setUser } from '../../store/userSlice';
import { View, ActivityIndicator } from 'react-native';


const IS_LOCAL = process.env.EXPO_PUBLIC_BYPASS_LOGIN === 'true' || __DEV__;

const AuthScreen = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Bypass login in local/dev mode
    if (IS_LOCAL && !user) {
      dispatch(setUser({
        user: {
          id: 'local-test-user',
          name: 'Local Tester',
          email: 'local@test.dev',
          role: 'Admin/Manager',
        },
        token: 'local-dev-token',
      }));
      return;
    }
    // If user is already logged in, navigate to home
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, router, dispatch]);

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
