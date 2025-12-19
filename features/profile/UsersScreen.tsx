import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { apiClient } from '../../services/api';
import { getErrorMessage } from '../../utils/errorUtils';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export default function UsersScreen() {
  const user = useSelector((state: RootState) => state.user.user);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is admin
  const isAdmin = user?.role === 'Admin/Manager' || user?.role === 'Admin';

  const fetchUsers = async () => {
    if (!isAdmin) {
      setError('You do not have permission to view users.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.listUsers();
      setUsers(data);
    } catch (err) {
      const friendlyError = getErrorMessage(err);
      setError(friendlyError);
      Alert.alert('Error', friendlyError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  if (!isAdmin) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Only admins can view this page.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>Role: </Text>
        <Text style={[styles.roleValue, getRoleStyle(item.role)]}>{item.role}</Text>
      </View>
      {item.createdAt && (
        <Text style={styles.createdAt}>
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      )}
    </View>
  );

  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'Admin/Manager':
        return styles.roleAdmin;
      case 'Sales Agent':
        return styles.roleSales;
      case 'Warehouse Officer':
        return styles.roleWarehouse;
      case 'Compliance Officer':
        return styles.roleCompliance;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Users Management</Text>
        <Text style={styles.userCount}>Total: {users.length}</Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUserItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No users found.</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userCount: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  roleValue: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  roleAdmin: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
  },
  roleSales: {
    backgroundColor: '#4ecdc4',
    color: '#fff',
  },
  roleWarehouse: {
    backgroundColor: '#ffa502',
    color: '#fff',
  },
  roleCompliance: {
    backgroundColor: '#9b59b6',
    color: '#fff',
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
