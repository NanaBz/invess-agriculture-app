import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function RequestsList({ requests, onSelect, onCreate }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton} onPress={onCreate}>
        <Text style={styles.createButtonText}>+ New Request</Text>
      </TouchableOpacity>
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No requests found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  createButton: { backgroundColor: '#1e90ff', padding: 12, borderRadius: 8, marginBottom: 16 },
  createButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  item: { backgroundColor: '#7ED957', padding: 16, borderRadius: 8, marginBottom: 12 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  status: { color: '#1e90ff', marginTop: 4 },
  empty: { color: '#888', textAlign: 'center', marginTop: 32 },
});
