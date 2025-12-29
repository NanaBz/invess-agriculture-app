import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { RequestInput } from '../../store/requestsSlice';

const FERTILIZERS = [
  'NPK 23:10:05 gray/reddish',
  'NPK 20:10:10 gray/reddish',
  'NPK 15:15:15 gray/reddish',
  'MOP',
  'DAP',
  'TSP',
  'POTASSIUM NITRATE',
  'CALCIUM NITRATE',
  'COCOA FERTILIZER',
  'UREA 46%',
  'SULPHATE OF AMMONIA (CRYSTAL)',
  'SULPHATE OF AMMONIA (GRANULAR)',
  'KISERIATE',
];

const WAREHOUSES = [
  'Teachermante',
  'Teikwame',
  'Techiman',
  'Tamale',
  'Tema',
];

const BAG_SIZES: ('1kg' | '25kg' | '50kg')[] = ['1kg', '25kg', '50kg'];

export default function RequestForm({ onSubmit, onCancel }: any) {
  const [warehouse, setWarehouse] = useState('');
  const [selectedFertilizers, setSelectedFertilizers] = useState<string[]>([]);
  const [bagSize, setBagSize] = useState<'1kg' | '25kg' | '50kg'>('50kg');
  const [quantity, setQuantity] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggleFertilizer = (fertilizer: string) => {
    if (selectedFertilizers.includes(fertilizer)) {
      setSelectedFertilizers(selectedFertilizers.filter(f => f !== fertilizer));
    } else {
      setSelectedFertilizers([...selectedFertilizers, fertilizer]);
    }
  };

  const handleSubmit = () => {
    if (!warehouse) {
      setError('Please select a warehouse.');
      return;
    }
    if (selectedFertilizers.length === 0) {
      setError('Please select at least one fertilizer.');
      return;
    }
    if (!quantity || parseInt(quantity) <= 0) {
      setError('Please enter a valid quantity.');
      return;
    }
    if (!customerName.trim()) {
      setError('Please enter customer name.');
      return;
    }
    if (!customerPhone.trim()) {
      setError('Please enter customer phone number.');
      return;
    }
    
    setError(null);
    const requestData: RequestInput = {
      warehouse,
      fertilizers: selectedFertilizers,
      bagSize,
      quantity: parseInt(quantity),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
    };
    onSubmit(requestData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>New Request</Text>
      
      {/* Warehouse Selection */}
      <Text style={styles.label}>Warehouse *</Text>
      <View style={styles.warehouseContainer}>
        {WAREHOUSES.map((wh) => (
          <TouchableOpacity
            key={wh}
            style={[styles.warehouseButton, warehouse === wh && styles.warehouseButtonSelected]}
            onPress={() => setWarehouse(wh)}
          >
            <Text style={[styles.warehouseButtonText, warehouse === wh && styles.warehouseButtonTextSelected]}>
              {wh}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Fertilizer Selection */}
      <Text style={styles.label}>Select Fertilizer(s) *</Text>
      <View style={styles.checkboxContainer}>
        {FERTILIZERS.map((fertilizer) => (
          <TouchableOpacity
            key={fertilizer}
            style={styles.checkboxItem}
            onPress={() => toggleFertilizer(fertilizer)}
          >
            <View style={[styles.checkbox, selectedFertilizers.includes(fertilizer) && styles.checkboxChecked]}>
              {selectedFertilizers.includes(fertilizer) && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>{fertilizer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bag Size Selection */}
      <Text style={styles.label}>Bag Size *</Text>
      <View style={styles.radioContainer}>
        {BAG_SIZES.map((size) => (
          <TouchableOpacity
            key={size}
            style={styles.radioItem}
            onPress={() => setBagSize(size)}
          >
            <View style={[styles.radio, bagSize === size && styles.radioSelected]}>
              {bagSize === size && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quantity */}
      <Text style={styles.label}>Quantity (number of bags) *</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        keyboardType="numeric"
        accessibilityLabel="Quantity input"
      />

      {/* Customer Information */}
      <Text style={styles.label}>Customer Name *</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Enter customer name"
        accessibilityLabel="Customer name input"
      />

      <Text style={styles.label}>Customer Phone Number *</Text>
      <TextInput
        style={styles.input}
        value={customerPhone}
        onChangeText={setCustomerPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        accessibilityLabel="Customer phone input"
      />

      {/* Error Message */}
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.cancel}
          onPress={onCancel}
          accessibilityLabel="Cancel request"
          accessibilityRole="button"
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submit}
          onPress={handleSubmit}
          accessibilityLabel="Submit request"
          accessibilityRole="button"
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 8,
    maxHeight: '90%',
    width: '90%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7ED957',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: { 
    color: '#7ED957', 
    fontWeight: 'bold', 
    marginTop: 12,
    marginBottom: 8,
  },
  warehouseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  warehouseButton: {
    backgroundColor: '#e5ffe5',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  warehouseButtonSelected: {
    backgroundColor: '#7ED957',
    borderColor: '#7ED957',
  },
  warehouseButtonText: {
    color: '#333',
    fontSize: 14,
  },
  warehouseButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    marginBottom: 8,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#7ED957',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#7ED957',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: '#333',
    fontSize: 14,
    flex: 1,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#7ED957',
    borderRadius: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#7ED957',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7ED957',
  },
  radioLabel: {
    color: '#333',
    fontSize: 14,
  },
  input: { 
    backgroundColor: '#e5ffe5', 
    color: '#222', 
    borderRadius: 6, 
    padding: 12, 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error: { 
    color: 'red', 
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginTop: 16,
    marginBottom: 16,
  },
  cancel: { 
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cancelText: { 
    color: '#888',
    fontSize: 16,
  },
  submit: { 
    backgroundColor: '#1e90ff', 
    borderRadius: 6, 
    paddingHorizontal: 20, 
    paddingVertical: 10,
  },
  submitText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
});
