
import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import StockList from './StockList';
import StockMovementList from './StockMovementList';
import StockForm from './StockForm';
import { addStock, releaseStock } from '../../store/warehouseSlice';

export default function WarehouseScreen() {
  const stock = useSelector((state: RootState) => state.warehouse.stock);
  const movements = useSelector((state: RootState) => state.warehouse.movements);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState<'intake' | 'release' | null>(null);

  const handleIntake = () => setShowForm('intake');
  const handleRelease = () => setShowForm('release');
  const handleSubmit = (data: { warehouse: string; quantity: number; note?: string }) => {
    if (showForm === 'intake') dispatch(addStock(data));
    else if (showForm === 'release') dispatch(releaseStock(data));
    setShowForm(null);
  };
  const handleCancel = () => setShowForm(null);
  const warehouses = Object.keys(stock);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleIntake}
          accessibilityLabel="Add stock to warehouse"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Add Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRelease}
          accessibilityLabel="Release stock from warehouse"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Release Stock</Text>
        </TouchableOpacity>
      </View>
      <StockList stock={stock} />
      <StockMovementList movements={movements} />
      <Modal visible={!!showForm} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <StockForm warehouses={warehouses} type={showForm} onSubmit={handleSubmit} onCancel={handleCancel} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  button: { backgroundColor: '#1e90ff', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10, marginHorizontal: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  modalBg: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
});
