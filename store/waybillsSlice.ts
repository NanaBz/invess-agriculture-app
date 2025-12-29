import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WaybillStatus = 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled';

export interface WaybillItem {
  fertilizer: string;
  bagSize: '1kg' | '25kg' | '50kg';
  quantity: number;
}

export interface Waybill {
  id: string;
  waybillNumber: string;
  date: string;
  sourceWarehouse: string;
  destinationWarehouse: string;
  items: WaybillItem[];
  driverName: string;
  driverPhone: string;
  status: WaybillStatus;
  relatedRequestId?: string;
}

interface WaybillsState {
  waybills: Waybill[];
}

const initialState: WaybillsState = {
  waybills: [],
};

const waybillsSlice = createSlice({
  name: 'waybills',
  initialState,
  reducers: {
    addWaybill: (state, action: PayloadAction<Omit<Waybill, 'id'>>) => {
      const newWaybill: Waybill = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.waybills.unshift(newWaybill);
    },
    updateWaybillStatus: (state, action: PayloadAction<{ id: string; status: WaybillStatus }>) => {
      const wb = state.waybills.find(w => w.id === action.payload.id);
      if (wb) wb.status = action.payload.status;
    },
    // For future: updateWaybill, deleteWaybill, etc.
  },
});

export const { addWaybill, updateWaybillStatus } = waybillsSlice.actions;
export default waybillsSlice.reducer;
