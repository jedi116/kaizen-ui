import type { ReactNode } from 'react';
import { createElement } from 'react';
import { LayoutDashboard, Wallet, Dumbbell, Utensils, Settings } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  active?: boolean;
  badge?: string;
}

export const sidebarNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: createElement(LayoutDashboard, { className: 'w-5 h-5' }),
    active: true,
  },
  {
    id: 'finance',
    label: 'Finance',
    href: '/finance',
    icon: createElement(Wallet, { className: 'w-5 h-5' }),
    active: true,
  },
  {
    id: 'workouts',
    label: 'Workouts',
    href: '/workouts',
    icon: createElement(Dumbbell, { className: 'w-5 h-5' }),
    active: false,
    badge: 'Soon',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    href: '/nutrition',
    icon: createElement(Utensils, { className: 'w-5 h-5' }),
    active: false,
    badge: 'Soon',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: createElement(Settings, { className: 'w-5 h-5' }),
    active: true,
  },
];

export const appInfo = {
  name: 'Kaizen',
  tagline: 'Personal Self-Improvement',
  description:
    'Track your finances, workouts, and nutrition all in one place. Build better habits and achieve your goals.',
};
