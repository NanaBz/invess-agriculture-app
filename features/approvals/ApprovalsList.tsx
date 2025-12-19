import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ApprovalsList({ requests, onSelect }: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelect(item)}
            accessibilityLabel={`Request: ${item.title}, status: ${item.status}`}
            accessibilityRole="button"
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty} accessibilityLabel="No pending requests">No pending requests.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { backgroundColor: '#7ED957', padding: 16, borderRadius: 8, marginBottom: 12 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  status: { color: '#1e90ff', marginTop: 4 },
  empty: { color: '#888', textAlign: 'center', marginTop: 32 },
});
