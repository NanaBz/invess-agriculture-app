import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RequestForm({ onSubmit, onCancel }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!title || !description) {
      setError('Please enter both a title and description.');
      return;
    }
    setError(null);
    onSubmit({ title, description });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Request title"
        accessibilityLabel="Request title input"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        accessibilityLabel="Request description input"
      />
      {error ? (
        <Text style={{ color: 'red', marginBottom: 8 }} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.cancel}
          onPress={onCancel}
          accessibilityLabel="Cancel request"
          accessibilityRole="button"
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submit}
          onPress={handleSubmit}
          accessibilityLabel="Submit request"
          accessibilityRole="button"
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  label: { color: '#7ED957', fontWeight: 'bold', marginTop: 8 },
  input: { backgroundColor: '#e5ffe5', color: '#222', borderRadius: 6, padding: 8, marginTop: 4 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  cancel: { marginRight: 16 },
  cancelText: { color: '#888' },
  submit: { backgroundColor: '#1e90ff', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  submitText: { color: '#fff', fontWeight: 'bold' },
});
