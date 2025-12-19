import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type NotificationType = 'info' | 'warning' | 'success';





export default function NotificationsList({ notifications, onSelect, onMarkAllRead }: any) {
const typeStyleMap: Record<NotificationType, any> = {
  info: styles.info,
  warning: styles.warning,
  success: styles.success,
};
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.markAll}
        onPress={onMarkAllRead}
        accessibilityLabel="Mark all notifications as read"
        accessibilityRole="button"
      >
        <Text style={styles.markAllText}>Mark all as read</Text>
      </TouchableOpacity>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, !item.read && styles.unread]}
            onPress={() => onSelect(item)}
            accessibilityLabel={`Notification: ${item.title}. ${item.message}. ${item.read ? 'Read' : 'Unread'}`}
            accessibilityRole="button"
            accessibilityState={{ selected: !item.read }}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={[styles.message, typeStyleMap[item.type as NotificationType] || styles.info]}>{item.message}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notifications.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  markAll: { alignSelf: 'flex-end', marginBottom: 8 },
  markAllText: { color: '#1e90ff', fontWeight: 'bold' },
  item: { backgroundColor: '#7ED957', padding: 16, borderRadius: 8, marginBottom: 12 },
  unread: { borderColor: '#1e90ff', borderWidth: 2 },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  message: { marginTop: 4 },
  info: { color: '#1e90ff' },
  warning: { color: '#dc3545' },
  success: { color: '#fff' },
  date: { color: '#fff', fontSize: 12, marginTop: 2 },
  empty: { color: '#888', textAlign: 'center', marginTop: 32 },
});
