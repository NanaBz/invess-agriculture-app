import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockMovement {
  id: string;
  type: 'intake' | 'release';
  warehouse: string;
  quantity: number;
  date: string;
  note?: string;
}

interface WarehouseState {
  stock: Record<string, number>; // warehouse name -> quantity
  movements: StockMovement[];
}

const initialState: WarehouseState = {
  stock: {
  Teachermante: 120,
  Teikwame: 80,
  Techiman: 60,
  Tamale: 40,
  Tema: 30,
  },
  movements: [],
};

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<{ warehouse: string; quantity: number; note?: string }>) => {
      state.stock[action.payload.warehouse] = (state.stock[action.payload.warehouse] || 0) + action.payload.quantity;
      state.movements.unshift({
        id: Date.now().toString(),
        type: 'intake',
        warehouse: action.payload.warehouse,
        quantity: action.payload.quantity,
        date: new Date().toISOString(),
        note: action.payload.note,
      });
    },
    releaseStock: (state, action: PayloadAction<{ warehouse: string; quantity: number; note?: string }>) => {
      state.stock[action.payload.warehouse] = Math.max(0, (state.stock[action.payload.warehouse] || 0) - action.payload.quantity);
      state.movements.unshift({
        id: Date.now().toString(),
        type: 'release',
        warehouse: action.payload.warehouse,
        quantity: action.payload.quantity,
        date: new Date().toISOString(),
        note: action.payload.note,
      });
    },
  },
});

export const { addStock, releaseStock } = warehouseSlice.actions;
export default warehouseSlice.reducer;
