import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import type { FertilizerStock } from '../../store/warehouseSlice';

interface StockListProps {
  stock: Record<string, FertilizerStock[]>;
  onSelectWarehouse: (warehouse: string) => void;
}

export default function StockList({ stock, onSelectWarehouse }: StockListProps) {
  // 4 bags of 25kg = 1 MT; 2 bags of 50kg = 1 MT
  const calculateTotalStock = (fertilizerStocks: FertilizerStock[]) => {
    const total = fertilizerStocks.reduce((acc, f) => {
      return acc + f.quantity25kg / 4 + f.quantity50kg / 2;
    }, 0);
    return total.toFixed(2);
  };

  const data = Object.entries(stock).map(([warehouse, fertilizerStocks]) => ({ 
    warehouse, 
    totalMetricTons: calculateTotalStock(fertilizerStocks),
    fertilizerStocks
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Warehouses</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.warehouse}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.warehouseCard}
            onPress={() => onSelectWarehouse(item.warehouse)}
            accessible
            accessibilityLabel={`Warehouse: ${item.warehouse}, Total stock: ${item.totalMetricTons} metric tons. Tap to view details.`}
            accessibilityRole="button"
          >
            <View style={styles.cardHeader}>
              <Text style={styles.warehouseName}>{item.warehouse}</Text>
              <Text style={styles.arrow}>›</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.totalLabel}>Total Stock</Text>
              <Text style={styles.totalValue}>{item.totalMetricTons} MT</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty} accessibilityLabel="No stock data">
            No stock data available.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7ED957',
    marginBottom: 12,
  },
  warehouseCard: {
    backgroundColor: '#7ED957',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  warehouseName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  arrow: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 8,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 14,
  },
  totalValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});

