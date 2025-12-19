import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function InvoiceDetail({ invoice, onBack, onMarkPaid, onMarkUnpaid }: any) {
  const [error, setError] = useState<string | null>(null);
  if (!invoice) return null;

  // Simulate error handling for marking paid/unpaid (replace with real API error handling later)
  const handleMarkPaid = () => {
    try {
      // Simulate possible error
      if (Math.random() < 0.05) throw new Error('Failed to mark as paid. Please try again.');
      setError(null);
      onMarkPaid(invoice.id);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const handleMarkUnpaid = () => {
    try {
      if (Math.random() < 0.05) throw new Error('Failed to mark as unpaid. Please try again.');
      setError(null);
      onMarkUnpaid(invoice.id);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        accessibilityLabel="Go back to invoices list"
        accessibilityRole="button"
      >
        <Text style={styles.back}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{invoice.warehouse}</Text>
      <Text style={styles.amount}>₵{invoice.amount}</Text>
      <Text style={[styles.status, invoice.status === 'Paid' ? styles.paid : styles.unpaid]}>{invoice.status}</Text>
      <Text style={styles.date}>{invoice.date}</Text>
      <Text style={styles.details}>{invoice.details}</Text>
      {error ? (
        <Text style={{ color: 'red', marginBottom: 8 }} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
      {invoice.status === 'Unpaid' ? (
        <TouchableOpacity
          style={styles.action}
          onPress={handleMarkPaid}
          accessibilityLabel="Mark invoice as paid"
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>Mark as Paid</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.action}
          onPress={handleMarkUnpaid}
          accessibilityLabel="Mark invoice as unpaid"
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>Mark as Unpaid</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 8, flex: 1 },
  back: { color: '#1e90ff', marginBottom: 12 },
  title: { color: '#7ED957', fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  amount: { color: '#1e90ff', fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  status: { fontWeight: 'bold', marginBottom: 8, color: '#1e90ff' },
  paid: { color: '#fff' },
  unpaid: { color: '#fff' },
  date: { color: '#888', fontSize: 12, marginBottom: 8 },
  details: { color: '#222', marginBottom: 16 },
  action: { backgroundColor: '#7ED957', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-start' },
  actionText: { color: '#fff', fontWeight: 'bold' },
});
