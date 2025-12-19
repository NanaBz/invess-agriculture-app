import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import type { UserRole } from '../../store/userSlice';
import { apiClient } from '../../services/api';
import { setUser, setError } from '../../store/userSlice';
import { getErrorMessage } from '../../utils/errorUtils';
import SignUpScreen from './SignUpScreen';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('admin@example.com'); // Pre-fill for dev
  const [password, setPassword] = useState('password123'); // Pre-fill for dev
  const [error, setErrorLocal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorLocal('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorLocal(null);

    try {
      const response = await apiClient.login(email, password);
      // Cast role to our union type
      const role = response.user.role as UserRole;
      dispatch(setUser({ user: { ...response.user, role }, token: response.token }));
    } catch (err) {
      const friendlyError = getErrorMessage(err);
      setErrorLocal(friendlyError);
      dispatch(setError(friendlyError));
    } finally {
      setLoading(false);
    }
  };

  // Show sign-up screen if toggled
  if (showSignUp) {
    return (
      <SignUpScreen
        onSignUpSuccess={() => setShowSignUp(false)}
        onBackToLogin={() => setShowSignUp(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/invess-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.companyName}>Invess Agriculture</Text>
      <Text style={styles.title}>Fertilizer Stock Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
        accessibilityLabel="Email input"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        accessibilityLabel="Password input"
      />

      {error ? (
        <Text
          style={styles.errorText}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
        >
          {error}
        </Text>
      ) : null}

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
        accessibilityLabel="Login button"
        accessibilityRole="button"
        accessibilityState={{ disabled: loading }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.devHint}>Demo: admin@example.com / password123</Text>

      <TouchableOpacity
        style={styles.signUpLink}
        onPress={() => setShowSignUp(true)}
        accessibilityLabel="Go to sign up"
        accessibilityRole="button"
      >
        <Text style={styles.signUpLinkText}>Don&apos;t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#7ED957',
    overflow: 'hidden',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7ED957',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 12,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#90caf9',
    opacity: 0.6,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  devHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  signUpLink: {
    marginTop: 16,
  },
  signUpLinkText: {
    color: '#007bff',
    fontSize: 14,
    textAlign: 'center',
  },
});
