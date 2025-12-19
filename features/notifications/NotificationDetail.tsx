import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type NotificationType = 'info' | 'warning' | 'success';
type NotificationItem = {
  title: string;
  message: string;
  date: string | number | Date;
  type: NotificationType;
};
type Props = {
  notification: NotificationItem | null;
  onBack: () => void;
};

export default function NotificationDetail({ notification, onBack }: Props) {
  if (!notification) return null;
  const typeStyleMap: Record<NotificationType, any> = {
    info: styles.info,
    warning: styles.warning,
    success: styles.success,
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}><Text style={styles.back}>&lt; Back</Text></TouchableOpacity>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={[styles.message, typeStyleMap[notification.type]]}>{notification.message}</Text>
      <Text style={styles.date}>{new Date(notification.date).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 8, flex: 1 },
  back: { color: '#1e90ff', marginBottom: 12 },
  title: { color: '#7ED957', fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  message: { marginBottom: 8 },
  info: { color: '#1e90ff' },
  warning: { color: '#dc3545' },
  success: { color: '#fff' },
  date: { color: '#fff', fontSize: 12, marginBottom: 8 },
});
