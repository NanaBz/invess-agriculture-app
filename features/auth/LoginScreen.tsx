import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const roles = [
  'Sales Agent',
  'Compliance Officer',
  'Warehouse Officer',
  'Admin/Manager',
];

export default function LoginScreen({ onLogin }: { onLogin: (role: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [error, setError] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/invess-logo.jpg')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.companyName}>Invess Agriculture</Text>
      <Text style={styles.title}>Fertilizer Stock Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        accessibilityLabel="Username input"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="Password input"
      />
      <View style={styles.rolePicker}>
        {roles.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleButton, role === r && styles.roleButtonSelected]}
            onPress={() => setRole(r)}
            accessibilityLabel={`Select role: ${r}`}
            accessibilityState={{ selected: role === r }}
          >
            <Text style={role === r ? styles.roleTextSelected : styles.roleText}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {error ? (
        <Text style={{ color: 'red', marginBottom: 8 }} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          if (!username || !password) {
            setError('Please enter both username and password.');
            return;
          }
          setError(null);
          onLogin(role);
        }}
        accessibilityLabel="Login button"
        accessibilityRole="button"
      >
        <Text style={styles.loginText}>Login</Text>
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
    backgroundColor: '#fff', // White background to mask black corners
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
  rolePicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  roleButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    backgroundColor: '#f5f5f5',
  },
  roleButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  roleText: {
    color: '#333',
  },
  roleTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 12,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
