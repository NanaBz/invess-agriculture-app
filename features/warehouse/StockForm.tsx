import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function StockForm({ warehouses, onSubmit, onCancel, type }: any) {
  const [warehouse, setWarehouse] = useState(warehouses[0] || '');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!warehouse || !quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setError('Please select a warehouse and enter a valid quantity.');
      return;
    }
    setError(null);
    onSubmit({ warehouse, quantity: Number(quantity), note });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Warehouse</Text>
      <View style={styles.pickerRow}>
        {warehouses.map((w: string) => (
          <TouchableOpacity
            key={w}
            style={[styles.picker, warehouse === w && styles.selected]}
            onPress={() => setWarehouse(w)}
            accessibilityLabel={`Select warehouse: ${w}${warehouse === w ? ' (selected)' : ''}`}
            accessibilityRole="button"
            accessibilityState={{ selected: warehouse === w }}
          >
            <Text style={warehouse === w ? styles.selectedText : styles.pickerText}>{w}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Bags"
        keyboardType="numeric"
        accessibilityLabel="Quantity in bags"
      />
      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Note"
        accessibilityLabel="Note (optional)"
      />
      {error ? (
        <Text style={{ color: 'red', marginBottom: 8 }} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.cancel}
          onPress={onCancel}
          accessibilityLabel="Cancel stock operation"
          accessibilityRole="button"
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submit}
          onPress={handleSubmit}
          accessibilityLabel={type === 'intake' ? 'Add stock' : 'Release stock'}
          accessibilityRole="button"
        >
          <Text style={styles.submitText}>{type === 'intake' ? 'Add Stock' : 'Release Stock'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#222', padding: 16, borderRadius: 8 },
  label: { color: '#fff', fontWeight: 'bold', marginTop: 8 },
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
  picker: { backgroundColor: '#111', borderRadius: 6, padding: 8, marginRight: 8, marginBottom: 8 },
  selected: { backgroundColor: '#1e90ff' },
  pickerText: { color: '#fff' },
  selectedText: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#111', color: '#fff', borderRadius: 6, padding: 8, marginTop: 4 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  cancel: { marginRight: 16 },
  cancelText: { color: '#888' },
  submit: { backgroundColor: '#1e90ff', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  submitText: { color: '#fff', fontWeight: 'bold' },
});
