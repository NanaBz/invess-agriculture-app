import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RequestInput {
  warehouse: string;
  fertilizers: string[];
  bagSize: '1kg' | '25kg' | '50kg';
  quantity: number;
  customerName: string;
  customerPhone: string;
}

interface Request extends RequestInput {
  id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

interface RequestsState {
  requests: Request[];
}

const initialState: RequestsState = {
  requests: [],
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<RequestInput>) => {
      const newRequest: Request = {
        id: Date.now().toString(),
        ...action.payload,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      state.requests.unshift(newRequest);
    },
    approveRequest: (state, action: PayloadAction<string>) => {
      const req = state.requests.find(r => r.id === action.payload);
      if (req) req.status = 'Approved';
    },
    rejectRequest: (state, action: PayloadAction<string>) => {
      const req = state.requests.find(r => r.id === action.payload);
      if (req) req.status = 'Rejected';
    },
    // For future: updateRequest, deleteRequest, etc.
  },
});

export const { addRequest, approveRequest, rejectRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
