import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { StockMovement } from '../../store/warehouseSlice';

interface StockMovementListProps {
  movements: StockMovement[];
}

export default function StockMovementList({ movements }: StockMovementListProps) {
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
            accessibilityLabel={`Stock ${item.type === 'intake' ? 'intake' : 'release'}: ${item.fertilizer}, ${item.quantity} bags of ${item.bagSize} at ${item.warehouse} on ${new Date(item.date).toLocaleString()}${item.note ? ', Note: ' + item.note : ''}`}
            accessibilityRole="summary"
          >
            <View style={styles.header}>
              <Text style={[styles.type, item.type === 'intake' ? styles.intake : styles.release]}>
                {item.type === 'intake' ? '↓ Intake' : '↑ Release'}
              </Text>
              <Text style={styles.bagSize}>{item.bagSize}</Text>
            </View>
            <Text style={styles.fertilizer}>{item.fertilizer}</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detail}>{item.quantity} bags</Text>
              <Text style={styles.warehouse}>{item.warehouse}</Text>
            </View>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
            {item.note ? <Text style={styles.note}>Note: {item.note}</Text> : null}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty} accessibilityLabel="No stock movements yet">
            No movements yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: { 
    color: '#333', 
    fontWeight: 'bold', 
    fontSize: 18, 
    marginBottom: 12,
  },
  item: { 
    backgroundColor: '#fff', 
    padding: 14, 
    borderRadius: 8, 
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1e90ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  type: { 
    fontWeight: 'bold',
    fontSize: 14,
  },
  intake: {
    color: '#4CAF50',
  },
  release: {
    color: '#f44336',
  },
  bagSize: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  fertilizer: {
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detail: { 
    color: '#1e90ff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  warehouse: {
    color: '#666',
    fontSize: 14,
  },
  date: { 
    color: '#888', 
    fontSize: 12,
    marginBottom: 4,
  },
  note: { 
    color: '#FF9800',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  empty: { 
    color: '#888', 
    textAlign: 'center', 
    marginTop: 32,
    fontSize: 14,
  },
});
