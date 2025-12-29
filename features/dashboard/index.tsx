

import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Colors } from '../../constants/Colors';


const DashboardScreen = () => {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  // Get real data from Redux store
  const warehouseStock = useSelector((state: RootState) => state.warehouse.stock);
  const requests = useSelector((state: RootState) => state.requests.requests);
  // Stock levels by warehouse, separated by bag size
  const stockLevels = Object.entries(warehouseStock).map(([warehouse, stocks]) => {
    const total1kg = stocks.reduce((sum, s) => sum + (s.quantity1kg || 0), 0);
    const total25kg = stocks.reduce((sum, s) => sum + s.quantity25kg, 0);
    const total50kg = stocks.reduce((sum, s) => sum + s.quantity50kg, 0);
    return { warehouse, total1kg, total25kg, total50kg };
  });
  // Pending requests count
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  // Alerts: show pending approvals if any
  const alerts = pendingRequests > 0
    ? [{ message: `${pendingRequests} requests pending approval`, type: 'info' }]
    : [];
  const styles = getStyles(colors);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle} accessibilityRole="header" accessibilityLabel="Stock Levels, Real-Time">Stock Levels (Real-Time)</Text>
      <View style={styles.card} accessibilityLabel="Stock levels by warehouse">
        {stockLevels.length === 0 ? (
          <Text style={styles.label}>No warehouse data</Text>
        ) : (
          stockLevels.map((item) => (
            <View key={item.warehouse} style={styles.row} accessibilityLabel={`Warehouse ${item.warehouse}, ${item.total1kg} bags 1kg, ${item.total25kg} bags 25kg, ${item.total50kg} bags 50kg`}>
              <Text style={styles.label}>{item.warehouse}</Text>
              <View style={styles.valueRow}>
                <Text style={styles.valueSmall}>{item.total1kg} bags 1kg</Text>
                <Text style={styles.valueSmall}>{item.total25kg} bags 25kg</Text>
                <Text style={styles.valueSmall}>{item.total50kg} bags 50kg</Text>
              </View>
            </View>
          ))
        )}
      </View>

      <Text style={styles.sectionTitle} accessibilityRole="header" accessibilityLabel="Pending Requests">Pending Requests</Text>
      <View style={styles.card} accessibilityLabel={`You have ${pendingRequests} pending requests`}>
        <Text style={styles.valueSmall}>{pendingRequests} requests</Text>
      </View>

      <Text style={styles.sectionTitle} accessibilityRole="header" accessibilityLabel="Alerts">Alerts</Text>
      <View style={styles.card} accessibilityLabel="Alerts list">
        {alerts.length === 0 ? (
          <Text style={styles.info}>No alerts</Text>
        ) : (
          alerts.map((alert, idx) => (
            <Text key={idx} style={[styles.alert, alert.type === 'warning' ? styles.warning : styles.info]} accessibilityLabel={alert.message}>
              {alert.message}
            </Text>
          ))
        )}
      </View>

      <Text style={styles.note} accessibilityLabel="All data updates in real time. Live sync coming soon.">* All data updates in real time (live sync coming soon)</Text>
    </ScrollView>
  );
};



function getStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      color: '#7ED957',
    },
    card: {
      backgroundColor: '#7ED957',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 6,
      flexWrap: 'wrap',
    },
    label: {
      color: '#fff',
      fontSize: 14,
      minWidth: 90,
      fontWeight: 'bold',
      marginRight: 6,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
    },
    valueSmall: {
      color: '#1e90ff',
      fontWeight: 'bold',
      fontSize: 12,
      marginLeft: 0,
      marginRight: 12,
    },
    alert: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    warning: {
      color: '#dc3545',
    },
    info: {
      color: '#1e90ff',
    },
    note: {
      marginTop: 24,
      fontSize: 12,
      color: '#888',
      textAlign: 'center',
    },
  });
}

export default DashboardScreen;
