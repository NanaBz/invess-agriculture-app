import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RequestDetail({ request, onBack }: any) {
  if (!request) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}><Text style={styles.back}>&lt; Back</Text></TouchableOpacity>
      <Text style={styles.title}>{request.title}</Text>
      <Text style={styles.status}>Status: {request.status}</Text>
      <Text style={styles.desc}>{request.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 8, flex: 1 },
  back: { color: '#1e90ff', marginBottom: 12 },
  title: { color: '#7ED957', fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  status: { color: '#1e90ff', marginBottom: 8 },
  desc: { color: '#222' },
});
