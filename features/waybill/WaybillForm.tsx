import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addWaybill, WaybillItem } from '../../store/waybillsSlice';
import { addNotification } from '../../store/notificationsSlice';

const BAG_SIZES: ('1kg' | '25kg' | '50kg')[] = ['1kg', '25kg', '50kg'];

export default function WaybillForm({ warehouses, fertilizers, onSubmit, onCancel, prefill }: any) {
  const dispatch = useDispatch();
  const [sourceWarehouse, setSourceWarehouse] = useState(prefill?.sourceWarehouse || '');
  const [destinationWarehouse, setDestinationWarehouse] = useState(prefill?.destinationWarehouse || '');
  const [driverName, setDriverName] = useState(prefill?.driverName || '');
  const [driverPhone, setDriverPhone] = useState(prefill?.driverPhone || '');
  const [items, setItems] = useState<WaybillItem[]>(prefill?.items || []);
  const [waybillNumber, setWaybillNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    setItems([...items, { fertilizer: '', bagSize: '50kg', quantity: 0 }]);
  };

  const updateItem = (idx: number, field: keyof WaybillItem, value: any) => {
    const newItems = [...items];
    (newItems[idx] as any)[field] = value;
    setItems(newItems);
  };

  const handleSubmit = () => {
    if (!sourceWarehouse || !destinationWarehouse || !driverName || !driverPhone || items.length === 0) {
      setError('Please fill all required fields and add at least one item.');
      return;
    }
    if (items.some(i => !i.fertilizer || !i.bagSize || i.quantity <= 0)) {
      setError('Please fill all item details correctly.');
      return;
    }
    setError(null);
    dispatch(addWaybill({
      waybillNumber,
      date: new Date().toISOString(),
      sourceWarehouse,
      destinationWarehouse,
      items,
      driverName,
      driverPhone,
      status: 'Pending',
    }));
    dispatch(addNotification({
      title: 'Waybill Created',
      message: `Waybill for ${sourceWarehouse} → ${destinationWarehouse} created.`,
      type: 'info',
    }));
    if (onSubmit) onSubmit();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create Waybill</Text>
      <Text style={styles.label}>Waybill Number</Text>
      <TextInput style={styles.input} value={waybillNumber} onChangeText={setWaybillNumber} placeholder="Enter waybill number" />
      <Text style={styles.label}>Source Warehouse *</Text>
      <View style={styles.pickerRow}>
        {warehouses.map((w: string) => (
          <TouchableOpacity key={w} style={[styles.picker, sourceWarehouse === w && styles.selected]} onPress={() => setSourceWarehouse(w)}>
            <Text style={sourceWarehouse === w ? styles.selectedText : styles.pickerText}>{w}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Destination Warehouse *</Text>
      <View style={styles.pickerRow}>
        {warehouses.map((w: string) => (
          <TouchableOpacity key={w} style={[styles.picker, destinationWarehouse === w && styles.selected]} onPress={() => setDestinationWarehouse(w)}>
            <Text style={destinationWarehouse === w ? styles.selectedText : styles.pickerText}>{w}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Driver Name *</Text>
      <TextInput style={styles.input} value={driverName} onChangeText={setDriverName} placeholder="Enter driver name" />
      <Text style={styles.label}>Driver Phone *</Text>
      <TextInput style={styles.input} value={driverPhone} onChangeText={setDriverPhone} placeholder="Enter driver phone" keyboardType="phone-pad" />
      <Text style={styles.label}>Items *</Text>
      {items.map((item, idx) => (
        <View key={idx} style={styles.itemRow}>
          <View style={styles.fertilizerPicker}>
            {fertilizers.map((f: string) => (
              <TouchableOpacity key={f} style={[styles.picker, item.fertilizer === f && styles.selected]} onPress={() => updateItem(idx, 'fertilizer', f)}>
                <Text style={item.fertilizer === f ? styles.selectedText : styles.pickerText}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bagSizePicker}>
            {BAG_SIZES.map((size) => (
              <TouchableOpacity key={size} style={[styles.picker, item.bagSize === size && styles.selected]} onPress={() => updateItem(idx, 'bagSize', size)}>
                <Text style={item.bagSize === size ? styles.selectedText : styles.pickerText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput style={styles.inputSmall} value={item.quantity.toString()} onChangeText={v => updateItem(idx, 'quantity', parseInt(v) || 0)} placeholder="Qty" keyboardType="numeric" />
        </View>
      ))}
      <TouchableOpacity style={styles.addItemBtn} onPress={addItem}><Text style={styles.addItemText}>+ Add Item</Text></TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}><Text style={styles.submitText}>Create Waybill</Text></TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 15, fontWeight: 'bold', marginTop: 12 },
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 },
  picker: { backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, marginBottom: 8 },
  selected: { backgroundColor: '#7ED957' },
  pickerText: { color: '#333' },
  selectedText: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 6, marginBottom: 8 },
  inputSmall: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, width: 60, marginLeft: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  fertilizerPicker: { flexDirection: 'row', flexWrap: 'wrap', flex: 2 },
  bagSizePicker: { flexDirection: 'row', flexWrap: 'wrap', flex: 1 },
  addItemBtn: { backgroundColor: '#1e90ff', borderRadius: 8, padding: 10, alignItems: 'center', marginVertical: 8 },
  addItemText: { color: '#fff', fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  submitBtn: { backgroundColor: '#7ED957', borderRadius: 8, padding: 12 },
  submitText: { color: '#fff', fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#eee', borderRadius: 8, padding: 12 },
  cancelText: { color: '#333', fontWeight: 'bold' },
  error: { color: '#d32f2f', marginTop: 8 },
});
