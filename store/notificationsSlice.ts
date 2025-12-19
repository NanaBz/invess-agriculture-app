import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [
  // Removed Sunyani warehouse notification
  { id: '2', title: 'Request Approved', message: 'Your request for Teachermante has been approved.', date: '2025-08-18T15:30:00Z', read: false, type: 'success' },
  { id: '3', title: 'Invoice Due', message: 'Invoice for Teikwame warehouse is due.', date: '2025-08-17T12:00:00Z', read: true, type: 'info' },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markRead: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
  },
});

export const { markRead, markAllRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
