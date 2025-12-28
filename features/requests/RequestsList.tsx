import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Helper function to generate description
const generateDescription = (request: any) => {
  const fertilizersList = request.fertilizers.join(', ');
  const metricTons = request.bagSize === '50kg' 
    ? (request.quantity / 2).toFixed(2) 
    : (request.quantity / 4).toFixed(2);
  
  return `${request.warehouse} - ${fertilizersList} (${request.quantity} bags × ${request.bagSize} = ${metricTons} MT) - ${request.customerName}`;
};

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
            <View style={styles.itemHeader}>
              <Text style={styles.warehouse}>{item.warehouse}</Text>
              <Text style={[styles.status, 
                item.status === 'Approved' && styles.statusApproved,
                item.status === 'Rejected' && styles.statusRejected
              ]}>{item.status}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>
              {generateDescription(item)}
            </Text>
            <View style={styles.itemFooter}>
              <Text style={styles.customer}>{item.customerName}</Text>
              <Text style={styles.phone}>{item.customerPhone}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No requests found. Create one to get started!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  createButton: { backgroundColor: '#1e90ff', padding: 12, borderRadius: 8, marginBottom: 16 },
  createButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  item: { 
    backgroundColor: '#7ED957', 
    padding: 16, 
    borderRadius: 8, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  warehouse: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18,
  },
  status: { 
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statusApproved: {
    backgroundColor: '#4CAF50',
  },
  statusRejected: {
    backgroundColor: '#f44336',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 8,
    marginTop: 4,
  },
  customer: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  phone: {
    color: '#fff',
    fontSize: 13,
  },
  empty: { color: '#888', textAlign: 'center', marginTop: 32, fontSize: 16 },
});
