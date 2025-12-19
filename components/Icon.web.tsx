import React from 'react';
import { Home, FileText, CheckCircle, Warehouse, Receipt, BarChart, Bell, User, LogOut } from 'lucide-react';

type IconProps = { color?: string; size?: number };

// Wrapper to match the native icon API
const createIcon = (Icon: any) => ({ color = '#000', size = 24 }: IconProps) => (
  <Icon color={color} size={size} strokeWidth={2} />
);

export const LucideHome = createIcon(Home);
export const LucideFileText = createIcon(FileText);
export const LucideCheckCircle = createIcon(CheckCircle);
export const LucideWarehouse = createIcon(Warehouse);
export const LucideReceipt = createIcon(Receipt);
export const LucideBarChart = createIcon(BarChart);
export const LucideBell = createIcon(Bell);
export const LucideUser = createIcon(User);
export const LucideLogOut = createIcon(LogOut);
