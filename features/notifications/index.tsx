
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import NotificationsList from './NotificationsList';
import NotificationDetail from './NotificationDetail';
import { markRead, markAllRead } from '../../store/notificationsSlice';

export default function NotificationsScreen() {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any>(null);

  const handleSelect = (notif: any) => {
    dispatch(markRead(notif.id));
    setSelected(notif);
  };
  const handleBack = () => setSelected(null);
  const handleMarkAllRead = () => dispatch(markAllRead());

  return (
    <View style={{ flex: 1 }}>
      {!selected && (
        <NotificationsList notifications={notifications} onSelect={handleSelect} onMarkAllRead={handleMarkAllRead} />
      )}
      {selected && (
        <NotificationDetail notification={selected} onBack={handleBack} />
      )}
    </View>
  );
}
