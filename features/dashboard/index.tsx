
import React from 'react';
import { View, Text, StyleSheet, ScrollView , useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';


const DashboardScreen = () => {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  // Placeholder data
  const stockLevels = [
  { warehouse: 'Teachermante', stock: 120 },
  { warehouse: 'Teikwame', stock: 80 },
  { warehouse: 'Techiman', stock: 60 },
  { warehouse: 'Tamale', stock: 40 },
  { warehouse: 'Tema', stock: 30 },
  ];
  const pendingRequests = 5;
  const alerts = [
  // Removed Sunyani warehouse warning
    { message: '3 requests pending approval', type: 'info' },
  ];
  const styles = getStyles(colors);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle} accessibilityRole="header" accessibilityLabel="Stock Levels, Real-Time">Stock Levels (Real-Time)</Text>
      <View style={styles.card} accessibilityLabel="Stock levels by warehouse">
        {stockLevels.map((item) => (
          <View key={item.warehouse} style={styles.row} accessibilityLabel={`Warehouse ${item.warehouse}, ${item.stock} bags`}>
            <Text style={styles.label}>{item.warehouse}</Text>
            <Text style={styles.value}>{item.stock} bags</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle} accessibilityRole="header" accessibilityLabel="Pending Requests">Pending Requests</Text>
      <View style={styles.card} accessibilityLabel={`You have ${pendingRequests} pending requests`}>
        <Text style={styles.value}>{pendingRequests} requests</Text>
      </View>

      <Text style={styles.sectionTitle} accessibilityRole="header" accessibilityLabel="Alerts">Alerts</Text>
      <View style={styles.card} accessibilityLabel="Alerts list">
        {alerts.map((alert, idx) => (
          <Text key={idx} style={[styles.alert, alert.type === 'warning' ? styles.warning : styles.info]} accessibilityLabel={alert.message}>
            {alert.message}
          </Text>
        ))}
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
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    label: {
      color: '#fff',
      fontSize: 16,
    },
    value: {
      color: '#1e90ff',
      fontWeight: 'bold',
      fontSize: 16,
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
