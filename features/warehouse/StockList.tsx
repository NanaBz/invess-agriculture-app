import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function StockList({ stock }: any) {
  const data = Object.entries(stock).map(([warehouse, quantity]) => ({ warehouse, quantity }));
  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={data}
        keyExtractor={item => item.warehouse}
        renderItem={({ item }) => (
          <View
            style={{ backgroundColor: '#7ED957', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}
            accessible
            accessibilityLabel={`Warehouse: ${item.warehouse}, Quantity: ${item.quantity} bags`}
            accessibilityRole="summary"
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{item.warehouse}</Text>
            <Text style={{ color: '#1e90ff', fontWeight: 'bold' }}>{String(item.quantity)} bags</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 32 }} accessibilityLabel="No stock data">No stock data.</Text>}
      />
    </View>
  );
}

