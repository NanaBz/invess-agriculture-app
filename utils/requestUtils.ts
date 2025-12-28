// Utility functions for request management

export interface RequestData {
  warehouse: string;
  fertilizers: string[];
  bagSize: '25kg' | '50kg';
  quantity: number;
  customerName: string;
  customerPhone: string;
}

/**
 * Calculate metric tons from bag quantity and size
 * 50kg bags: 2 bags = 1 metric ton
 * 25kg bags: 4 bags = 1 metric ton
 */
export const calculateMetricTons = (quantity: number, bagSize: '25kg' | '50kg'): number => {
  const divisor = bagSize === '50kg' ? 2 : 4;
  return quantity / divisor;
};

/**
 * Generate a descriptive title for the request
 */
export const generateRequestDescription = (request: RequestData): string => {
  const fertilizersList = request.fertilizers.join(', ');
  const metricTons = calculateMetricTons(request.quantity, request.bagSize).toFixed(2);
  
  return `${request.warehouse} - ${fertilizersList} (${request.quantity} bags × ${request.bagSize} = ${metricTons} MT) - ${request.customerName}`;
};

/**
 * List of available fertilizers
 */
export const FERTILIZERS = [
  'NPK 23:10:05 gray/reddish',
  'NPK 20:10:10 gray/reddish',
  'NPK 15:15:15 gray/reddish',
  'MOP',
  'DAP',
  'TSP',
  'POTASSIUM NITRATE',
  'CALCIUM NITRATE',
  'COCOA FERTILIZER',
  'UREA 46%',
  'SULPHATE OF AMMONIA (CRYSTAL)',
  'SULPHATE OF AMMONIA (GRANULAR)',
  'KISERIATE',
] as const;

/**
 * List of available warehouses
 */
export const WAREHOUSES = [
  'Teachermante',
  'Teikwame',
  'Techiman',
  'Tamale',
  'Tema',
] as const;

export type Fertilizer = typeof FERTILIZERS[number];
export type Warehouse = typeof WAREHOUSES[number];
