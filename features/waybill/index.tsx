import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import WaybillForm from './WaybillForm';

export default function WaybillScreen() {
  const waybills = useSelector((state: RootState) => state.waybills.waybills);
  const [showForm, setShowForm] = React.useState(false);

  // Polling for live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // dispatch(fetchWaybills()) or trigger a refetch here
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!showForm && (
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>Waybills</Text>
          <FlatList
            data={waybills}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item}>
                <Text style={styles.title}>{item.waybillNumber || 'Waybill #' + item.id}</Text>
                <Text style={styles.subtitle}>{item.sourceWarehouse} → {item.destinationWarehouse}</Text>
                <Text style={styles.status}>{item.status}</Text>
                <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.createBtn} onPress={() => setShowForm(true)}>
            <Text style={styles.createText}>+ Create Waybill</Text>
          </TouchableOpacity>
        </View>
      )}
      {showForm && (
        <WaybillForm
          warehouses={["Teachermante", "Teikwame", "Techiman", "Tamale", "Tema"]}
          fertilizers={["NPK 23:10:05 gray/reddish", "NPK 20:10:10 gray/reddish", "NPK 15:15:15 gray/reddish", "MOP", "DAP", "TSP", "POTASSIUM NITRATE", "CALCIUM NITRATE", "COCOA FERTILIZER", "UREA 46%", "SULPHATE OF AMMONIA (CRYSTAL)", "SULPHATE OF AMMONIA (GRANULAR)", "KISERIATE"]}
          onSubmit={() => setShowForm(false)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 22, fontWeight: 'bold', margin: 16 },
  item: { backgroundColor: '#fff', borderRadius: 8, padding: 16, margin: 8, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 15, color: '#333', marginTop: 4 },
  status: { fontSize: 14, color: '#1e90ff', marginTop: 4 },
  date: { fontSize: 13, color: '#888', marginTop: 4 },
  createBtn: { backgroundColor: '#7ED957', borderRadius: 8, padding: 14, margin: 16, alignItems: 'center' },
  createText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
