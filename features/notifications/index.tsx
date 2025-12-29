
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import NotificationsList from './NotificationsList';
import NotificationDetail from './NotificationDetail';
import { markRead, markAllRead, removeNotification } from '../../store/notificationsSlice';

export default function NotificationsScreen() {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
    // Polling for live updates
    useEffect(() => {
      const interval = setInterval(() => {
        // dispatch(fetchNotifications()) or trigger a refetch here
      }, 10000);
      return () => clearInterval(interval);
    }, []);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any>(null);

  const handleSelect = (notif: any) => {
    dispatch(markRead(notif.id));
    setSelected(notif);
  };
  const handleBack = () => setSelected(null);
  const handleMarkAllRead = () => dispatch(markAllRead());

  const handleClear = (id: string) => dispatch(removeNotification(id));

  return (
    <View style={{ flex: 1 }}>
      {!selected && (
        <NotificationsList
          notifications={notifications}
          onSelect={handleSelect}
          onMarkAllRead={handleMarkAllRead}
          onClear={handleClear}
        />
      )}
      {selected && (
        <NotificationDetail notification={selected} onBack={handleBack} />
      )}
    </View>
  );
}
