import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { FertilizerStock } from '../../store/warehouseSlice';

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

const BAG_SIZES: ('1kg' | '25kg' | '50kg')[] = ['1kg', '25kg', '50kg'];

interface StockFormProps {
  warehouses: string[];
  warehouseStock: Record<string, FertilizerStock[]>;
  onSubmit: any;
  onCancel: () => void;
  type: 'intake' | 'release' | null;
}

export default function StockForm({ warehouses, warehouseStock, onSubmit, onCancel, type }: StockFormProps) {
  const [warehouse, setWarehouse] = useState(warehouses[0] || '');
  const [fertilizer, setFertilizer] = useState('');
  const [bagSize, setBagSize] = useState<'1kg' | '25kg' | '50kg'>('50kg');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getAvailableQuantity = () => {
    if (!warehouse || !fertilizer || type !== 'release') return 0;
    const stock = warehouseStock[warehouse];
    if (!stock) return 0;
    const fertilizerStock = stock.find(f => f.fertilizer === fertilizer);
    if (!fertilizerStock) return 0;
    if (bagSize === '1kg') return fertilizerStock.quantity1kg;
    if (bagSize === '25kg') return fertilizerStock.quantity25kg;
    return fertilizerStock.quantity50kg;
  };

  const handleSubmit = () => {
    if (!warehouse) {
      setError('Please select a warehouse.');
      return;
    }
    if (!fertilizer) {
      setError('Please select a fertilizer.');
      return;
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setError('Please enter a valid quantity.');
      return;
    }
    
    // Check if releasing more than available
    if (type === 'release') {
      const available = getAvailableQuantity();
      if (Number(quantity) > available) {
        setError(`Cannot release ${quantity} bags. Only ${available} bags available.`);
        return;
      }
    }
    
    setError(null);
    onSubmit({ 
      warehouse, 
      fertilizer, 
      bagSize, 
      quantity: Number(quantity), 
      note 
    });
  };

  const availableQty = getAvailableQuantity();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {type === 'intake' ? 'Add Stock' : 'Release Stock'}
      </Text>

      {/* Warehouse Selection */}
      <Text style={styles.label}>Warehouse *</Text>
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

      {/* Fertilizer Selection */}
      <Text style={styles.label}>Select Fertilizer *</Text>
      <View style={styles.fertilizerGrid}>
        {FERTILIZERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.fertilizerOption, fertilizer === f && styles.fertilizerOptionSelected]}
            onPress={() => setFertilizer(f)}
          >
            <View style={[styles.radioBullet, fertilizer === f && styles.radioBulletSelected]}>
              {fertilizer === f && <View style={styles.radioBulletInner} />}
            </View>
            <Text style={[styles.fertilizerOptionText, fertilizer === f && styles.fertilizerOptionTextSelected]}>
              {f}
            </Text>
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
            accessibilityLabel={`Select bag size: ${size}${bagSize === size ? ' (selected)' : ''}`}
            accessibilityRole="radio"
          >
            <View style={[styles.radio, bagSize === size && styles.radioSelected]}>
              {bagSize === size && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Show available quantity for release */}
      {type === 'release' && fertilizer && (
        <View style={styles.availableBox}>
          <Text style={styles.availableText}>
            Available: {availableQty} bags ({bagSize})
          </Text>
        </View>
      )}

      {/* Quantity Input */}
      <Text style={styles.label}>Quantity (bags) *</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        keyboardType="numeric"
        accessibilityLabel="Quantity in bags"
      />

      {/* Note */}
      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Add a note..."
        accessibilityLabel="Note (optional)"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#222', 
    padding: 16, 
    borderRadius: 8,
    maxHeight: '95%',
    width: '95%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7ED957',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: { 
    color: '#fff', 
    fontWeight: 'bold', 
    marginTop: 12,
    marginBottom: 8,
  },
  pickerRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 8,
    gap: 8,
  },
  picker: { 
    backgroundColor: '#111', 
    borderRadius: 6, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  selected: { 
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
  pickerText: { 
    color: '#fff',
    fontSize: 14,
  },
  selectedText: { 
    color: '#fff', 
    fontWeight: 'bold',
  },
  fertilizerScroll: {
    maxHeight: 400,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 6,
  },
  fertilizerItem: {
    backgroundColor: '#111',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  fertilizerSelected: {
    backgroundColor: '#7ED957',
    borderColor: '#7ED957',
  },
  fertilizerText: {
    color: '#fff',
    fontSize: 14,
  },
  fertilizerTextSelected: {
    fontWeight: 'bold',
  },
  fertilizerGrid: {
    marginBottom: 12,
  },
  fertilizerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  fertilizerOptionSelected: {
    backgroundColor: '#7ED957',
    borderColor: '#7ED957',
  },
  radioBullet: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#7ED957',
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBulletSelected: {
    borderColor: '#7ED957',
  },
  radioBulletInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7ED957',
  },
  fertilizerOptionText: {
    color: '#fff',
    fontSize: 13,
    flex: 1,
  },
  fertilizerOptionTextSelected: {
    fontWeight: 'bold',
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
    color: '#fff',
    fontSize: 14,
  },
  availableBox: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  availableText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  input: { 
    backgroundColor: '#111', 
    color: '#fff', 
    borderRadius: 6, 
    padding: 12, 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  error: {
    color: '#ff6b6b',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
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
