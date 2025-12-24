import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import RecentTransactions from './RecentTransactions';
import type { FinanceJournal } from '../../types';

const mockTransactions: FinanceJournal[] = [
  {
    ID: 1,
    user_id: 1,
    category_id: 1,
    type: 'income',
    amount: 1000,
    title: 'Salary',
    description: 'Monthly salary',
    date: '2024-01-15T00:00:00Z',
    payment_method: 'bank_transfer',
    location: '',
    is_recurring: true,
    receipt_url: '',
    category: {
      ID: 1,
      user_id: 1,
      name: 'Salary',
      type: 'income',
      description: '',
      color: '#22c55e',
      icon: '💰',
      is_active: true,
      CreatedAt: '',
      UpdatedAt: '',
      DeletedAt: null,
    },
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: null,
  },
  {
    ID: 2,
    user_id: 1,
    category_id: 2,
    type: 'expense',
    amount: 50,
    title: 'Coffee',
    description: 'Morning coffee',
    date: '2024-01-14T00:00:00Z',
    payment_method: 'cash',
    location: 'Cafe',
    is_recurring: false,
    receipt_url: '',
    category: {
      ID: 2,
      user_id: 1,
      name: 'Food',
      type: 'expense',
      description: '',
      color: '#ef4444',
      icon: '☕',
      is_active: true,
      CreatedAt: '',
      UpdatedAt: '',
      DeletedAt: null,
    },
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: null,
  },
];

describe('RecentTransactions', () => {
  it('renders the component', () => {
    render(<RecentTransactions transactions={[]} />);
    expect(screen.getByTestId('recent-transactions')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<RecentTransactions transactions={[]} />);
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
  });

  it('displays empty state when no transactions', () => {
    render(<RecentTransactions transactions={[]} />);
    expect(screen.getByText('No transactions yet')).toBeInTheDocument();
    expect(screen.getByText('Add your first transaction')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(<RecentTransactions transactions={[]} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders transaction items', () => {
    render(<RecentTransactions transactions={mockTransactions} />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Coffee')).toBeInTheDocument();
  });

  it('displays formatted currency for income', () => {
    render(<RecentTransactions transactions={mockTransactions} />);
    expect(screen.getByText('+$1,000.00')).toBeInTheDocument();
  });

  it('displays formatted currency for expense', () => {
    render(<RecentTransactions transactions={mockTransactions} />);
    expect(screen.getByText('-$50.00')).toBeInTheDocument();
  });

  it('limits displayed transactions based on maxItems', () => {
    const manyTransactions = Array.from({ length: 10 }, (_, i) => ({
      ...mockTransactions[0],
      ID: i + 1,
      title: `Transaction ${i + 1}`,
    }));
    render(<RecentTransactions transactions={manyTransactions} maxItems={3} />);
    const items = screen.getAllByTestId('transaction-item');
    expect(items).toHaveLength(3);
  });

  it('renders View All link', () => {
    render(<RecentTransactions transactions={mockTransactions} />);
    expect(screen.getByText('View All')).toBeInTheDocument();
  });
});
