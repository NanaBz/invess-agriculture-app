import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
  id: string;
  warehouse: string;
  amount: number;
  status: 'Paid' | 'Unpaid';
  date: string;
  details: string;
}

interface InvoicesState {
  invoices: Invoice[];
}

const initialState: InvoicesState = {
  invoices: [
  { id: '1', warehouse: 'Teachermante', amount: 5000, status: 'Unpaid', date: '2025-08-01', details: '100 bags delivered' },
  { id: '2', warehouse: 'Teikwame', amount: 2500, status: 'Paid', date: '2025-07-25', details: '50 bags delivered' },
  ],
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    markPaid: (state, action: PayloadAction<string>) => {
      const inv = state.invoices.find(i => i.id === action.payload);
      if (inv) inv.status = 'Paid';
    },
    markUnpaid: (state, action: PayloadAction<string>) => {
      const inv = state.invoices.find(i => i.id === action.payload);
      if (inv) inv.status = 'Unpaid';
    },
  },
});

export const { markPaid, markUnpaid } = invoicesSlice.actions;
export default invoicesSlice.reducer;
