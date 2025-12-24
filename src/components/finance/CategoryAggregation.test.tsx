import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import CategoryAggregation from './CategoryAggregation';
import type { FinanceJournal, FinanceCategory } from '../../types';

const mockCategories: FinanceCategory[] = [
  {
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
  {
    ID: 2,
    user_id: 1,
    name: 'Food',
    type: 'expense',
    description: '',
    color: '#ef4444',
    icon: '🍔',
    is_active: true,
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: null,
  },
];

const mockJournals: FinanceJournal[] = [
  {
    ID: 1,
    user_id: 1,
    category_id: 1,
    type: 'income',
    amount: 5000,
    title: 'Salary',
    description: '',
    date: '2024-01-15',
    payment_method: 'bank_transfer',
    location: '',
    is_recurring: false,
    receipt_url: '',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: null,
  },
  {
    ID: 2,
    user_id: 1,
    category_id: 2,
    type: 'expense',
    amount: 100,
    title: 'Lunch',
    description: '',
    date: '2024-01-14',
    payment_method: 'cash',
    location: '',
    is_recurring: false,
    receipt_url: '',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: null,
  },
  {
    ID: 3,
    user_id: 1,
    category_id: 2,
    type: 'expense',
    amount: 50,
    title: 'Dinner',
    description: '',
    date: '2024-01-14',
    payment_method: 'cash',
    location: '',
    is_recurring: false,
    receipt_url: '',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: null,
  },
];

describe('CategoryAggregation', () => {
  it('renders the component', () => {
    render(<CategoryAggregation journals={[]} categories={[]} />);
    expect(screen.getByTestId('category-aggregation')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<CategoryAggregation journals={[]} categories={[]} />);
    expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
  });

  it('displays empty state when no transactions', () => {
    render(<CategoryAggregation journals={[]} categories={mockCategories} />);
    expect(screen.getByText('No transactions to aggregate')).toBeInTheDocument();
  });

  it('renders category rows for each category with transactions', () => {
    render(<CategoryAggregation journals={mockJournals} categories={mockCategories} />);
    const categoryRows = screen.getAllByTestId('category-row');
    expect(categoryRows).toHaveLength(2);
  });

  it('displays category names', () => {
    render(<CategoryAggregation journals={mockJournals} categories={mockCategories} />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('displays aggregated totals correctly', () => {
    render(<CategoryAggregation journals={mockJournals} categories={mockCategories} />);
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument(); // 100 + 50
  });

  it('displays transaction count', () => {
    render(<CategoryAggregation journals={mockJournals} categories={mockCategories} />);
    expect(screen.getByText('1 transactions')).toBeInTheDocument();
    expect(screen.getByText('2 transactions')).toBeInTheDocument();
  });

  it('displays grand total', () => {
    render(<CategoryAggregation journals={mockJournals} categories={mockCategories} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$5,150.00')).toBeInTheDocument();
  });

  it('filters by type when specified', () => {
    render(
      <CategoryAggregation journals={mockJournals} categories={mockCategories} type="expense" />
    );
    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('shows percentage badges', () => {
    render(<CategoryAggregation journals={mockJournals} categories={mockCategories} />);
    // The percentages are calculated based on total
    const percentageBadges = screen.getAllByText(/%/);
    expect(percentageBadges.length).toBeGreaterThan(0);
  });
});
