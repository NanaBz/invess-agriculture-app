import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function InvoicesList({ invoices, onSelect }: any) {
  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelect(item)}
            accessibilityLabel={`Invoice for ${item.warehouse}, amount: ₵${item.amount}, status: ${item.status}, date: ${item.date}`}
            accessibilityRole="button"
          >
            <Text style={styles.title}>{item.warehouse}</Text>
            <Text style={styles.amount}>₵{item.amount}</Text>
            <Text style={[styles.status, item.status === 'Paid' ? styles.paid : styles.unpaid]}>{item.status}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty} accessibilityLabel="No invoices found">No invoices found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { backgroundColor: '#7ED957', padding: 16, borderRadius: 8, marginBottom: 12 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  amount: { color: '#1e90ff', fontWeight: 'bold', marginTop: 4 },
  status: { marginTop: 4, fontWeight: 'bold', color: '#1e90ff' },
  paid: { color: '#fff' },
  unpaid: { color: '#fff' },
  date: { color: '#fff', fontSize: 12, marginTop: 2 },
  empty: { color: '#888', textAlign: 'center', marginTop: 32 },
});
