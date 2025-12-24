export type FinanceTab = 'transactions' | 'categories' | 'summary';
export type FilterType = 'all' | 'income' | 'expense';

export interface TabConfig {
  id: FinanceTab;
  label: string;
}

export interface FilterOption {
  value: FilterType;
  label: string;
  activeClass: string;
}

export const tabsConfig: TabConfig[] = [
  { id: 'transactions', label: 'Transactions' },
  { id: 'categories', label: 'Categories' },
  { id: 'summary', label: 'Summary' },
];

export const filterOptions: FilterOption[] = [
  {
    value: 'all',
    label: 'All',
    activeClass: 'bg-glass-white text-white',
  },
  {
    value: 'income',
    label: 'Income',
    activeClass: 'bg-accent-teal/30 text-accent-teal',
  },
  {
    value: 'expense',
    label: 'Expense',
    activeClass: 'bg-accent-rose/30 text-accent-rose',
  },
];

export const chartColors = {
  income: '#2dd4bf', // accent-teal
  expense: '#fb7185', // accent-rose
  balance: '#22d3ee', // accent-cyan
  neutral: '#666666',
};

export const paymentMethods = [
  { value: 'cash', label: 'Cash' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'mobile_payment', label: 'Mobile Payment' },
  { value: 'other', label: 'Other' },
];

export const categoryIcons = [
  '💰',
  '💵',
  '💳',
  '🏠',
  '🚗',
  '🍔',
  '🛒',
  '💊',
  '🎮',
  '📚',
  '✈️',
  '🎁',
  '💼',
  '📱',
  '🔧',
  '👕',
  '🎬',
  '🏥',
  '🎓',
  '🐕',
];

export const categoryColors = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#eab308', // yellow
  '#84cc16', // lime
  '#22c55e', // green
  '#10b981', // emerald
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#0ea5e9', // sky
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#d946ef', // fuchsia
  '#ec4899', // pink
  '#f43f5e', // rose
];
