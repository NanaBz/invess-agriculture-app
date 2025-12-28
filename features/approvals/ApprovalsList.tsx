import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Helper function to generate description
const generateShortDescription = (request: any) => {
  const fertCount = request.fertilizers?.length || 0;
  const metricTons = request.bagSize === '50kg' 
    ? (request.quantity / 2).toFixed(2) 
    : (request.quantity / 4).toFixed(2);
  
  return `${fertCount} fertilizer${fertCount !== 1 ? 's' : ''} • ${request.quantity} bags (${request.bagSize}) • ${metricTons} MT`;
};

export default function ApprovalsList({ requests, onSelect }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pending Approvals</Text>
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelect(item)}
            accessibilityLabel={`Request from ${item.customerName} for ${item.warehouse} warehouse. Tap to view details.`}
            accessibilityRole="button"
          >
            <View style={styles.header}>
              <Text style={styles.warehouse}>{item.warehouse}</Text>
              <Text style={styles.statusBadge}>Pending</Text>
            </View>
            
            <Text style={styles.description}>
              {generateShortDescription(item)}
            </Text>
            
            <View style={styles.footer}>
              <View style={styles.customerInfo}>
                <Text style={styles.customerLabel}>Customer:</Text>
                <Text style={styles.customerName}>{item.customerName}</Text>
              </View>
              <Text style={styles.phone}>{item.customerPhone}</Text>
            </View>
            
            {item.createdAt && (
              <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString()}
              </Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.empty} accessibilityLabel="No pending requests">
              No pending requests.
            </Text>
            <Text style={styles.emptySubtext}>All caught up!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7ED957',
    marginBottom: 16,
  },
  item: { 
    backgroundColor: '#f9f9f9',
    padding: 16, 
    borderRadius: 8, 
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  warehouse: { 
    color: '#333',
    fontWeight: 'bold', 
    fontSize: 18,
  },
  statusBadge: {
    backgroundColor: '#FFA726',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerLabel: {
    color: '#888',
    fontSize: 13,
    marginRight: 6,
  },
  customerName: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  phone: {
    color: '#1e90ff',
    fontSize: 13,
    fontWeight: '500',
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 64,
  },
  emptyIcon: {
    fontSize: 64,
    color: '#7ED957',
    marginBottom: 16,
  },
  empty: { 
    color: '#666', 
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
  },
});
