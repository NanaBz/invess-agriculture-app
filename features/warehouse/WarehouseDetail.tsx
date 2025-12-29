import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import type { FertilizerStock } from '../../store/warehouseSlice';

interface WarehouseDetailProps {
  warehouse: string;
  stock: FertilizerStock[];
  onBack: () => void;
}

export default function WarehouseDetail({ warehouse, stock, onBack }: WarehouseDetailProps) {
  // 1kg * 100 = 1 MT; 4 bags of 25kg = 1 MT; 2 bags of 50kg = 1 MT
  const toMetricTons = (qty1: number, qty25: number, qty50: number) => qty1 / 100 + qty25 / 4 + qty50 / 2;

  const calculateTotal = (fertilizer: FertilizerStock) => {
    return toMetricTons(fertilizer.quantity1kg, fertilizer.quantity25kg, fertilizer.quantity50kg).toFixed(2);
  };

  const getTotalStock = () => {
    const total = stock.reduce((acc, f) => acc + toMetricTons(f.quantity1kg, f.quantity25kg, f.quantity50kg), 0);
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>&lt; Back to Warehouses</Text>
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title}>{warehouse}</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalLabel}>Total Stock</Text>
          <Text style={styles.totalValue}>{getTotalStock()} MT</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {stock.map((fertilizer, index) => {
          const hasStock = fertilizer.quantity1kg > 0 || fertilizer.quantity25kg > 0 || fertilizer.quantity50kg > 0;
          const metricTons = calculateTotal(fertilizer);
          
          return (
            <View 
              key={index} 
              style={[
                styles.fertilizerCard,
                !hasStock && styles.fertilizerCardEmpty
              ]}
            >
              <Text style={styles.fertilizerName}>{fertilizer.fertilizer}</Text>
              <View style={styles.quantityRow}>
                <View style={styles.quantityItem}>
                  <Text style={styles.quantityLabel}>1kg bags</Text>
                  <Text style={styles.quantityValue}>{fertilizer.quantity1kg}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.quantityItem}>
                  <Text style={styles.quantityLabel}>25kg bags</Text>
                  <Text style={styles.quantityValue}>{fertilizer.quantity25kg}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.quantityItem}>
                  <Text style={styles.quantityLabel}>50kg bags</Text>
                  <Text style={styles.quantityValue}>{fertilizer.quantity50kg}</Text>
                </View>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalMetric}>Total: {metricTons} MT</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  back: {
    color: '#1e90ff',
    fontSize: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7ED957',
    marginBottom: 12,
  },
  totalBadge: {
    backgroundColor: '#7ED957',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  totalLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  totalValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  fertilizerCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7ED957',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fertilizerCardEmpty: {
    opacity: 0.5,
    borderLeftColor: '#ccc',
  },
  fertilizerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  quantityLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  quantityValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7ED957',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 8,
    alignItems: 'center',
  },
  totalMetric: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e90ff',
  },
});
