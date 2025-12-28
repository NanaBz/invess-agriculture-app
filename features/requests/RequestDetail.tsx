import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function RequestDetail({ request, onBack }: any) {
  if (!request) return null;
  
  // Calculate metric tons
  const metricTons = request.bagSize === '50kg' 
    ? (request.quantity / 2).toFixed(2) 
    : (request.quantity / 4).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>&lt; Back to Requests</Text>
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title}>Request Details</Text>
        <View style={[styles.statusBadge, 
          request.status === 'Approved' && styles.statusApproved,
          request.status === 'Rejected' && styles.statusRejected,
          request.status === 'Pending' && styles.statusPending
        ]}>
          <Text style={styles.statusText}>{request.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Warehouse</Text>
        <Text style={styles.sectionContent}>{request.warehouse}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fertilizers Requested</Text>
        {request.fertilizers.map((fertilizer: string, index: number) => (
          <View key={index} style={styles.fertilizerItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.fertilizerText}>{fertilizer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bag Size:</Text>
          <Text style={styles.detailValue}>{request.bagSize}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text style={styles.detailValue}>{request.quantity} bags</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Weight:</Text>
          <Text style={styles.detailValue}>{metricTons} Metric Tons</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>{request.customerName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{request.customerPhone}</Text>
        </View>
      </View>

      {request.createdAt && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Created</Text>
          <Text style={styles.sectionContent}>
            {new Date(request.createdAt).toLocaleString()}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#fff', 
    padding: 16, 
    flex: 1 
  },
  back: { 
    color: '#1e90ff', 
    marginBottom: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { 
    color: '#7ED957', 
    fontWeight: 'bold', 
    fontSize: 24,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusPending: {
    backgroundColor: '#FFA726',
  },
  statusApproved: {
    backgroundColor: '#4CAF50',
  },
  statusRejected: {
    backgroundColor: '#f44336',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#7ED957',
  },
  sectionTitle: {
    color: '#7ED957',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  sectionContent: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
  },
  fertilizerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    color: '#7ED957',
    fontSize: 20,
    marginRight: 8,
    lineHeight: 22,
  },
  fertilizerText: {
    color: '#333',
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
  detailValue: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
