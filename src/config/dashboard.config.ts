import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Wallet, Dumbbell, Utensils } from 'lucide-react';
import { createElement } from 'react';

export interface StatConfig {
  id: string;
  name: string;
  icon: ReactNode;
  getValue: (data: { totalIncome?: number; totalExpense?: number; netBalance?: number }) => number;
  getColor: (value: number) => string;
  getBgColor: (value: number) => string;
  getBorderColor: (value: number) => string;
}

export interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  href: string;
  gradient: string;
  active: boolean;
}

export interface QuickActionConfig {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  href: string;
  iconBgColor: string;
  iconColor: string;
  badge?: string;
}

export const statsConfig: StatConfig[] = [
  {
    id: 'total-income',
    name: 'Total Income',
    icon: createElement(TrendingUp, { className: 'w-5 h-5' }),
    getValue: (data) => data.totalIncome || 0,
    getColor: () => 'text-accent-teal',
    getBgColor: () => 'bg-accent-teal/20',
    getBorderColor: () => 'border-accent-teal/30',
  },
  {
    id: 'total-expenses',
    name: 'Total Expenses',
    icon: createElement(TrendingDown, { className: 'w-5 h-5' }),
    getValue: (data) => data.totalExpense || 0,
    getColor: () => 'text-accent-rose',
    getBgColor: () => 'bg-accent-rose/20',
    getBorderColor: () => 'border-accent-rose/30',
  },
  {
    id: 'net-balance',
    name: 'Net Balance',
    icon: createElement(Wallet, { className: 'w-5 h-5' }),
    getValue: (data) => data.netBalance || 0,
    getColor: (value) => (value >= 0 ? 'text-accent-cyan' : 'text-accent-rose'),
    getBgColor: (value) => (value >= 0 ? 'bg-accent-cyan/20' : 'bg-accent-rose/20'),
    getBorderColor: (value) => (value >= 0 ? 'border-accent-cyan/30' : 'border-accent-rose/30'),
  },
];

export const modulesConfig: ModuleConfig[] = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'Track income & expenses',
    icon: createElement(Wallet, { className: 'w-6 h-6' }),
    href: '/finance',
    gradient: 'from-accent-cyan to-accent-teal',
    active: true,
  },
  {
    id: 'workouts',
    name: 'Workouts',
    description: 'Log exercise routines',
    icon: createElement(Dumbbell, { className: 'w-6 h-6' }),
    href: '/workouts',
    gradient: 'from-accent-violet to-purple-500',
    active: false,
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    description: 'Monitor food intake',
    icon: createElement(Utensils, { className: 'w-6 h-6' }),
    href: '/nutrition',
    gradient: 'from-accent-emerald to-green-500',
    active: false,
  },
];

export const quickActionsConfig: QuickActionConfig[] = [
  {
    id: 'add-income',
    name: 'Add Income',
    description: 'Record earnings',
    icon: createElement(TrendingUp, { className: 'w-5 h-5' }),
    href: '/finance',
    iconBgColor: 'bg-accent-teal/20',
    iconColor: 'text-accent-teal',
  },
  {
    id: 'add-expense',
    name: 'Add Expense',
    description: 'Track spending',
    icon: createElement(TrendingDown, { className: 'w-5 h-5' }),
    href: '/finance',
    iconBgColor: 'bg-accent-rose/20',
    iconColor: 'text-accent-rose',
  },
  {
    id: 'log-workout',
    name: 'Log Workout',
    description: 'Track exercise',
    icon: createElement(Dumbbell, { className: 'w-5 h-5' }),
    href: '/workouts',
    iconBgColor: 'bg-accent-violet/20',
    iconColor: 'text-accent-violet',
    badge: 'Soon',
  },
  {
    id: 'log-meal',
    name: 'Log Meal',
    description: 'Track nutrition',
    icon: createElement(Utensils, { className: 'w-5 h-5' }),
    href: '/nutrition',
    iconBgColor: 'bg-accent-emerald/20',
    iconColor: 'text-accent-emerald',
    badge: 'Soon',
  },
];
