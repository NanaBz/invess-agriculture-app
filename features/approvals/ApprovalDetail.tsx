import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ApprovalDetail({ request, onBack, onApprove, onReject }: any) {
  if (!request) return null;
  
  // Calculate metric tons
  let metricTons = '0.00';
  if (request.bagSize === '50kg') metricTons = (request.quantity / 2).toFixed(2);
  else if (request.bagSize === '25kg') metricTons = (request.quantity / 4).toFixed(2);
  else if (request.bagSize === '1kg') metricTons = (request.quantity / 1000).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        accessibilityLabel="Go back to approvals list"
        accessibilityRole="button"
      >
        <Text style={styles.back}>&lt; Back to Approvals</Text>
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title}>Request Approval</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Pending Review</Text>
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
          <Text style={styles.sectionTitle}>Request Date</Text>
          <Text style={styles.sectionContent}>
            {new Date(request.createdAt).toLocaleString()}
          </Text>
        </View>
      )}

      {request.status === 'Pending' && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.reject}
            onPress={() => onReject(request.id)}
            accessibilityLabel="Reject request"
            accessibilityRole="button"
          >
            <Text style={styles.rejectText}>✗ Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.approve}
            onPress={() => onApprove(request.id)}
            accessibilityLabel="Approve request"
            accessibilityRole="button"
          >
            <Text style={styles.approveText}>✓ Approve</Text>
          </TouchableOpacity>
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
    backgroundColor: '#FFA726',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  section: {
    marginBottom: 20,
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
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 20,
    gap: 12,
  },
  approve: { 
    backgroundColor: '#4CAF50', 
    borderRadius: 8, 
    paddingHorizontal: 24, 
    paddingVertical: 14,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  approveText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  reject: { 
    backgroundColor: '#f44336', 
    borderRadius: 8, 
    paddingHorizontal: 24, 
    paddingVertical: 14,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rejectText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
});
