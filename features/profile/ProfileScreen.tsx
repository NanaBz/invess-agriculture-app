import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateProfile } from '../../store/userSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!name) {
      setError('Name cannot be empty.');
      return;
    }
    setError(null);
    setSaving(true);
    // For now, just update local state. Backend integration can be added later.
    dispatch(updateProfile({ name }));
    setSaving(false);
    setPassword('');
    Alert.alert('Profile updated', 'Your changes have been saved.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        accessibilityLabel="Name input"
      />
      {error ? (
        <Text style={{ color: 'red', marginBottom: 8 }} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
      <Text style={styles.label}>Role</Text>
      <Text style={styles.role} accessibilityLabel={`Role: ${user?.role || ''}`}>{user?.role || ''}</Text>
      <Text style={styles.label}>Change Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter new password"
        secureTextEntry
        accessibilityLabel="New password input"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={saving}
        accessibilityLabel="Save profile changes"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7ED957',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  role: {
    fontSize: 16,
    color: '#1e90ff',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#7ED957',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
