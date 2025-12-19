import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'Sales Agent' | 'Compliance Officer' | 'Warehouse Officer' | 'Admin/Manager' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setUser(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    setRole(state, action: PayloadAction<UserRole>) {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    setName(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    updateProfile(state, action: PayloadAction<{ name: string }>) {
      if (state.user) {
        state.user.name = action.payload.name;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setUser, setRole, setName, updateProfile, logout } = userSlice.actions;
export default userSlice.reducer;
