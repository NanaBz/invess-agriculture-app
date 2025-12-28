
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../features/dashboard';
import RequestsScreen from '../../features/requests';
import ApprovalsScreen from '../../features/approvals';
import WarehouseScreen from '../../features/warehouse';
import InvoicesScreen from '../../features/invoices';
import ReportsScreen from '../../features/reports';
import NotificationsScreen from '../../features/notifications';
import { LucideHome, LucideFileText, LucideCheckCircle, LucideWarehouse, LucideReceipt, LucideBarChart, LucideBell, LucideUser } from '../../components/Icon';
import ProfileScreen from '../../features/profile/ProfileScreen';
import UsersScreen from '../../features/profile/UsersScreen';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/userSlice';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();

const roleTabs: Record<string, { name: string; component: any; icon: any }[]> = {
  'Sales Agent': [
    { name: 'Dashboard', component: DashboardScreen, icon: LucideHome },
    { name: 'Requests', component: RequestsScreen, icon: LucideFileText },
    { name: 'Notifications', component: NotificationsScreen, icon: LucideBell },
    { name: 'Profile', component: ProfileScreen, icon: LucideUser },
  ],
  'Compliance Officer': [
    { name: 'Dashboard', component: DashboardScreen, icon: LucideHome },
    { name: 'Approvals', component: ApprovalsScreen, icon: LucideCheckCircle },
    { name: 'Notifications', component: NotificationsScreen, icon: LucideBell },
    { name: 'Profile', component: ProfileScreen, icon: LucideUser },
  ],
  'Warehouse Officer': [
    { name: 'Dashboard', component: DashboardScreen, icon: LucideHome },
    { name: 'Warehouse', component: WarehouseScreen, icon: LucideWarehouse },
    { name: 'Waybill', component: InvoicesScreen, icon: LucideReceipt },
    { name: 'Notifications', component: NotificationsScreen, icon: LucideBell },
    { name: 'Profile', component: ProfileScreen, icon: LucideUser },
  ],
  'Admin/Manager': [
    { name: 'Dashboard', component: DashboardScreen, icon: LucideHome },
    { name: 'Requests', component: RequestsScreen, icon: LucideFileText },
    { name: 'Approvals', component: ApprovalsScreen, icon: LucideCheckCircle },
    { name: 'Warehouse', component: WarehouseScreen, icon: LucideWarehouse },
    { name: 'Waybill', component: InvoicesScreen, icon: LucideReceipt },
    { name: 'Reports', component: ReportsScreen, icon: LucideBarChart },
    { name: 'Users', component: UsersScreen, icon: LucideUser },
    { name: 'Notifications', component: NotificationsScreen, icon: LucideBell },
    { name: 'Profile', component: ProfileScreen, icon: LucideUser },
  ],
};

export default function Tabs() {
  const user = useSelector((state: RootState) => state.user.user);
  const role = user?.role || null;
  const name = user?.name || '';
  const tabs = role ? roleTabs[role] : [];
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      router.replace('/auth');
    }
  }, [role, router]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!role) return null;

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#fff' },
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/invess-logo.jpg')}
              style={{
                width: 32,
                height: 32,
                marginRight: 8,
                borderRadius: 16,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#7ED957',
                overflow: 'hidden',
              }}
              resizeMode="contain"
            />
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#7ED957' }}>Invess Agriculture LTD</Text>
              <Text style={{ fontSize: 14, color: '#222' }}>
                {name ? `Welcome, ${name}!` : role ? `Welcome, ${role}!` : 'Welcome!'}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
          </TouchableOpacity>
        ),
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#7ED957', borderTopWidth: 2 },
        tabBarActiveBackgroundColor: '#7ED957',
        tabBarInactiveBackgroundColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#7ED957',
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIconStyle: { marginBottom: -4 },
      })}
    >
      {tabs.map(({ name, component, icon: Icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <Icon color={color} size={size} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
