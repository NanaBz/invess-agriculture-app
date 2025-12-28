
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function ReportsScreen() {
  const stock = useSelector((state: RootState) => state.warehouse.stock);
  const movements = useSelector((state: RootState) => state.warehouse.movements);
  const requests = useSelector((state: RootState) => state.requests.requests);
  const invoices = useSelector((state: RootState) => state.invoices.invoices);

  // Total stock across all warehouses in Metric Tons
  // Rule: 4 bags of 25kg = 1 MT; 2 bags of 50kg = 1 MT
  const totalStockMT = Object.values(stock).reduce((warehouseAcc, fertArray) => {
    const warehouseTotal = fertArray.reduce((acc, f) => acc + f.quantity25kg / 4 + f.quantity50kg / 2, 0);
    return warehouseAcc + warehouseTotal;
  }, 0);

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const approvedRequests = requests.filter(r => r.status === 'Approved').length;
  const rejectedRequests = requests.filter(r => r.status === 'Rejected').length;
  const paidInvoices = invoices.filter(i => i.status === 'Paid').length;
  const unpaidInvoices = invoices.filter(i => i.status === 'Unpaid').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Summary Reports</Text>
      <View style={styles.cardRow}>
        <View
          style={styles.card}
          accessible
          accessibilityLabel={`Total stock: ${totalStockMT.toFixed(2)} metric tons`}
          accessibilityRole="summary"
        >
          <Text style={styles.cardTitle}>Total Stock</Text><Text style={styles.cardValue}>{totalStockMT.toFixed(2)} MT</Text>
        </View>
        <View
          style={styles.card}
          accessible
          accessibilityLabel={`Pending requests: ${pendingRequests}`}
          accessibilityRole="summary"
        >
          <Text style={styles.cardTitle}>Pending Requests</Text><Text style={styles.cardValue}>{pendingRequests}</Text>
        </View>
      </View>
      <View style={styles.cardRow}>
        <View
          style={styles.card}
          accessible
          accessibilityLabel={`Approved requests: ${approvedRequests}`}
          accessibilityRole="summary"
        >
          <Text style={styles.cardTitle}>Approved</Text><Text style={styles.cardValue}>{approvedRequests}</Text>
        </View>
        <View
          style={styles.card}
          accessible
          accessibilityLabel={`Rejected requests: ${rejectedRequests}`}
          accessibilityRole="summary"
        >
          <Text style={styles.cardTitle}>Rejected</Text><Text style={styles.cardValue}>{rejectedRequests}</Text>
        </View>
      </View>
      <View style={styles.cardRow}>
        <View
          style={styles.card}
          accessible
          accessibilityLabel={`Paid invoices: ${paidInvoices}`}
          accessibilityRole="summary"
        >
          <Text style={styles.cardTitle}>Paid Invoices</Text><Text style={styles.cardValue}>{paidInvoices}</Text>
        </View>
        <View
          style={styles.card}
          accessible
          accessibilityLabel={`Unpaid invoices: ${unpaidInvoices}`}
          accessibilityRole="summary"
        >
          <Text style={styles.cardTitle}>Unpaid Invoices</Text><Text style={styles.cardValue}>{unpaidInvoices}</Text>
        </View>
      </View>
      <Text style={[styles.header, { marginTop: 24 }]}>Recent Stock Movements</Text>
      {movements.slice(0, 10).map(m => (
        <View
          key={m.id}
          style={styles.movement}
          accessible
          accessibilityLabel={`Stock ${m.type === 'intake' ? 'intake' : 'release'}: ${m.quantity} bags at ${m.warehouse} on ${new Date(m.date).toLocaleString()}${m.note ? ', Note: ' + m.note : ''}`}
          accessibilityRole="summary"
        >
          <Text style={styles.movementType}>{m.type === 'intake' ? 'Intake' : 'Release'}</Text>
          <Text style={styles.movementDetail}>{m.quantity} bags - {m.warehouse}</Text>
          <Text style={styles.movementDate}>{new Date(m.date).toLocaleString()}</Text>
          {m.note ? <Text style={styles.movementNote}>Note: {m.note}</Text> : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  header: { color: '#7ED957', fontWeight: 'bold', fontSize: 20, marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  card: { backgroundColor: '#7ED957', flex: 1, marginHorizontal: 4, borderRadius: 8, padding: 16, alignItems: 'center' },
  cardTitle: { color: '#fff', fontSize: 14 },
  cardValue: { color: '#1e90ff', fontWeight: 'bold', fontSize: 18, marginTop: 4 },
  movement: { backgroundColor: '#7ED957', borderRadius: 8, padding: 12, marginBottom: 10 },
  movementType: { color: '#1e90ff', fontWeight: 'bold' },
  movementDetail: { color: '#fff' },
  movementDate: { color: '#fff', fontSize: 12 },
  movementNote: { color: '#ffc107', fontSize: 12 },
});
