import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function StockMovementList({ movements }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Movement Log</Text>
      <FlatList
        data={movements}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={styles.item}
            accessible
            accessibilityLabel={`Stock ${item.type === 'intake' ? 'intake' : 'release'}: ${item.quantity} bags at ${item.warehouse} on ${new Date(item.date).toLocaleString()}${item.note ? ', Note: ' + item.note : ''}`}
            accessibilityRole="summary"
          >
            <Text style={styles.type}>{item.type === 'intake' ? 'Intake' : 'Release'}</Text>
            <Text style={styles.detail}>{item.quantity} bags - {item.warehouse}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
            {item.note ? <Text style={styles.note}>Note: {item.note}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty} accessibilityLabel="No stock movements yet">No movements yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  item: { backgroundColor: '#222', padding: 12, borderRadius: 8, marginBottom: 10 },
  type: { color: '#1e90ff', fontWeight: 'bold' },
  detail: { color: '#fff' },
  date: { color: '#888', fontSize: 12 },
  note: { color: '#ffc107', fontSize: 12 },
  empty: { color: '#888', textAlign: 'center', marginTop: 32 },
});
