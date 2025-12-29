import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FertilizerStock {
  fertilizer: string;
  quantity1kg: number;
  quantity25kg: number;
  quantity50kg: number;
}

export interface StockMovement {
  id: string;
  type: 'intake' | 'release';
  warehouse: string;
  fertilizer: string;
  bagSize: '1kg' | '25kg' | '50kg';
  quantity: number;
  date: string;
  note?: string;
}

export interface AddStockPayload {
  warehouse: string;
  fertilizer: string;
  bagSize: '1kg' | '25kg' | '50kg';
  quantity: number;
  note?: string;
}

export interface ReleaseStockPayload {
  warehouse: string;
  fertilizer: string;
  bagSize: '1kg' | '25kg' | '50kg';
  quantity: number;
  note?: string;
}

interface WarehouseState {
  stock: Record<string, FertilizerStock[]>; // warehouse name -> array of fertilizer stocks
  movements: StockMovement[];
}

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

const WAREHOUSES = ['Teachermante', 'Teikwame', 'Techiman', 'Tamale', 'Tema'];

// Initialize each warehouse with all fertilizers at 0 quantity
const initializeWarehouseStock = (): Record<string, FertilizerStock[]> => {
  const stock: Record<string, FertilizerStock[]> = {};
  WAREHOUSES.forEach(warehouse => {
    stock[warehouse] = FERTILIZERS.map(fertilizer => ({
      fertilizer,
      quantity1kg: 0,
      quantity25kg: 0,
      quantity50kg: 0,
    }));
  });
  return stock;
};

const initialState: WarehouseState = {
  stock: initializeWarehouseStock(),
  movements: [],
};

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<AddStockPayload>) => {
      const { warehouse, fertilizer, bagSize, quantity, note } = action.payload;
      
      if (!state.stock[warehouse]) {
        state.stock[warehouse] = FERTILIZERS.map(f => ({
          fertilizer: f,
          quantity1kg: 0,
          quantity25kg: 0,
          quantity50kg: 0,
        }));
      }
      
      const fertilizerStock = state.stock[warehouse].find(f => f.fertilizer === fertilizer);
      if (fertilizerStock) {
        if (bagSize === '1kg') {
          fertilizerStock.quantity1kg += quantity;
        } else if (bagSize === '25kg') {
          fertilizerStock.quantity25kg += quantity;
        } else {
          fertilizerStock.quantity50kg += quantity;
        }
      }
      
      state.movements.unshift({
        id: Date.now().toString(),
        type: 'intake',
        warehouse,
        fertilizer,
        bagSize,
        quantity,
        date: new Date().toISOString(),
        note,
      });
    },
    releaseStock: (state, action: PayloadAction<ReleaseStockPayload>) => {
      const { warehouse, fertilizer, bagSize, quantity, note } = action.payload;
      
      if (!state.stock[warehouse]) return;
      
      const fertilizerStock = state.stock[warehouse].find(f => f.fertilizer === fertilizer);
      if (fertilizerStock) {
        if (bagSize === '1kg') {
          fertilizerStock.quantity1kg = Math.max(0, fertilizerStock.quantity1kg - quantity);
        } else if (bagSize === '25kg') {
          fertilizerStock.quantity25kg = Math.max(0, fertilizerStock.quantity25kg - quantity);
        } else {
          fertilizerStock.quantity50kg = Math.max(0, fertilizerStock.quantity50kg - quantity);
        }
      }
      
      state.movements.unshift({
        id: Date.now().toString(),
        type: 'release',
        warehouse,
        fertilizer,
        bagSize,
        quantity,
        date: new Date().toISOString(),
        note,
      });
    },
  },
});

export const { addStock, releaseStock } = warehouseSlice.actions;
export default warehouseSlice.reducer;
