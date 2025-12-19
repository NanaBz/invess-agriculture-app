import React from 'react';
import { Text } from 'react-native';

// Simple emoji-based icons for web fallback
const iconMap: Record<string, string> = {
  Home: '🏠',
  FileText: '📄',
  CheckCircle: '✅',
  Warehouse: '🏭',
  Receipt: '🧾',
  BarChart: '📊',
  Bell: '🔔',
  User: '👤',
  LogOut: '🚪',
};

type IconProps = { color?: string; size?: number };

export const LucideHome = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.Home}</Text>;
export const LucideFileText = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.FileText}</Text>;
export const LucideCheckCircle = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.CheckCircle}</Text>;
export const LucideWarehouse = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.Warehouse}</Text>;
export const LucideReceipt = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.Receipt}</Text>;
export const LucideBarChart = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.BarChart}</Text>;
export const LucideBell = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.Bell}</Text>;
export const LucideUser = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.User}</Text>;
export const LucideLogOut = ({ size = 24 }: IconProps) => <Text style={{ fontSize: size }}>{iconMap.LogOut}</Text>;
