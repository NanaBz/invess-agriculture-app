import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ApprovalDetail({ request, onBack, onApprove, onReject }: any) {
  if (!request) return null;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        accessibilityLabel="Go back to approvals list"
        accessibilityRole="button"
      >
        <Text style={styles.back}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{request.title}</Text>
      <Text style={styles.status}>Status: {request.status}</Text>
      <Text style={styles.desc}>{request.description}</Text>
      {request.status === 'Pending' && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.approve}
            onPress={() => onApprove(request.id)}
            accessibilityLabel="Approve request"
            accessibilityRole="button"
          >
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reject}
            onPress={() => onReject(request.id)}
            accessibilityLabel="Reject request"
            accessibilityRole="button"
          >
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 8, flex: 1 },
  back: { color: '#1e90ff', marginBottom: 12 },
  title: { color: '#7ED957', fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  status: { color: '#1e90ff', marginBottom: 8 },
  desc: { color: '#222', marginBottom: 16 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  approve: { backgroundColor: '#7ED957', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12 },
  approveText: { color: '#fff', fontWeight: 'bold' },
  reject: { backgroundColor: '#dc3545', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  rejectText: { color: '#fff', fontWeight: 'bold' },
});
