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
  notifications: [], // Only real notifications from app events
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'date' | 'read'>>) => {
      const newNotif: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(newNotif);
    },
    markRead: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { addNotification, markRead, markAllRead, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
