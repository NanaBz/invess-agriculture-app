import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Request {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface RequestsState {
  requests: Request[];
}

const initialState: RequestsState = {
  requests: [
  { id: '1', title: 'Fertilizer for Teachermante', description: 'Need 100 bags for Teachermante warehouse', status: 'Pending' },
  { id: '2', title: 'Restock Teikwame', description: 'Requesting 50 bags for Teikwame', status: 'Approved' },
  ],
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newRequest: Request = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        status: 'Pending',
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
