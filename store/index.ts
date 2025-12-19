import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import requestsReducer from './requestsSlice';
import warehouseReducer from './warehouseSlice';
import invoicesReducer from './invoicesSlice';
import notificationsReducer from './notificationsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    requests: requestsReducer,
    warehouse: warehouseReducer,
    invoices: invoicesReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
