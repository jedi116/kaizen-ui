import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import FinanceSummary from './FinanceSummary';
import type { JournalSummary, FinanceCategory, FinanceJournal } from '../../types';

// Mock recharts to avoid rendering issues in tests
vi.mock('recharts', () => ({
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Cell: () => <div />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tooltip: () => <div />,
  Legend: () => <div />,
}));

const mockSummary: JournalSummary = {
  total_income: 10000,
  total_expense: 3000,
  net_balance: 7000,
  entry_count: 15,
};

const mockCategories: FinanceCategory[] = [
  {
    ID: 1,
    user_id: 1,
    name: 'Employment',
    type: 'income',
    icon: '💼',
    color: '#10b981',
    CreatedAt: '',
    UpdatedAt: '',
  },
  {
    ID: 2,
    user_id: 1,
    name: 'Food',
    type: 'expense',
    icon: '🛒',
    color: '#f43f5e',
    CreatedAt: '',
    UpdatedAt: '',
  },
];

const mockJournals: FinanceJournal[] = [
  {
    ID: 1,
    user_id: 1,
    category_id: 1,
    title: 'Salary',
    description: 'Monthly salary',
    amount: 5000,
    type: 'income',
    date: '2024-01-15T00:00:00Z',
    payment_method: 'bank_transfer',
    CreatedAt: '',
    UpdatedAt: '',
  },
  {
    ID: 2,
    user_id: 1,
    category_id: 2,
    title: 'Groceries',
    description: 'Weekly groceries',
    amount: 150,
    type: 'expense',
    date: '2024-01-16T00:00:00Z',
    payment_method: 'credit_card',
    CreatedAt: '',
    UpdatedAt: '',
  },
];

describe('FinanceSummary', () => {
  const defaultProps = {
    summary: mockSummary,
    categories: mockCategories,
    journals: mockJournals,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    render(<FinanceSummary {...defaultProps} />);
    expect(screen.getByTestId('month-selector')).toBeInTheDocument();
  });

  it('displays all stats by default', () => {
    render(<FinanceSummary {...defaultProps} />);

    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Balance')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  it('displays formatted currency values', () => {
    render(<FinanceSummary {...defaultProps} />);

    expect(screen.getByText('$10,000.00')).toBeInTheDocument();
    expect(screen.getByText('$3,000.00')).toBeInTheDocument();
    expect(screen.getByText('$7,000.00')).toBeInTheDocument();
  });

  it('displays transaction count', () => {
    render(<FinanceSummary {...defaultProps} />);

    expect(screen.getByText('15')).toBeInTheDocument();
  });

  describe('View Mode Toggle', () => {
    it('renders view mode toggle buttons', () => {
      render(<FinanceSummary {...defaultProps} />);
      expect(screen.getByTestId('view-mode-toggle')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Income' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expense' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Balance' })).toBeInTheDocument();
    });

    it('shows only income stat when Income view is selected', () => {
      render(<FinanceSummary {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: 'Income' }));

      expect(screen.getByText('Total Income')).toBeInTheDocument();
      expect(screen.queryByText('Total Expenses')).not.toBeInTheDocument();
      expect(screen.queryByText('Transactions')).not.toBeInTheDocument();
    });

    it('shows only expense stat when Expense view is selected', () => {
      render(<FinanceSummary {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: 'Expense' }));

      expect(screen.getByText('Total Expenses')).toBeInTheDocument();
      expect(screen.queryByText('Total Income')).not.toBeInTheDocument();
      expect(screen.queryByText('Transactions')).not.toBeInTheDocument();
    });

    it('shows only balance stat when Balance view is selected', () => {
      render(<FinanceSummary {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: 'Balance' }));

      expect(screen.getByText('Net Balance')).toBeInTheDocument();
      expect(screen.queryByText('Total Income')).not.toBeInTheDocument();
      expect(screen.queryByText('Total Expenses')).not.toBeInTheDocument();
    });

    it('returns to all stats when All view is selected', () => {
      render(<FinanceSummary {...defaultProps} />);

      // Switch to income
      fireEvent.click(screen.getByRole('button', { name: 'Income' }));
      expect(screen.queryByText('Total Expenses')).not.toBeInTheDocument();

      // Switch back to all
      fireEvent.click(screen.getByRole('button', { name: 'All' }));
      expect(screen.getByText('Total Income')).toBeInTheDocument();
      expect(screen.getByText('Total Expenses')).toBeInTheDocument();
      expect(screen.getByText('Net Balance')).toBeInTheDocument();
      expect(screen.getByText('Transactions')).toBeInTheDocument();
    });
  });

  describe('Month Selector', () => {
    it('calls onMonthChange when month is changed', () => {
      const onMonthChange = vi.fn();

      render(
        <FinanceSummary
          {...defaultProps}
          selectedMonth={new Date(2024, 0, 1)}
          onMonthChange={onMonthChange}
        />
      );

      // Navigate to previous month
      fireEvent.click(screen.getByLabelText('Previous month'));

      expect(onMonthChange).toHaveBeenCalled();
    });

    it('displays the selected month', () => {
      render(
        <FinanceSummary
          {...defaultProps}
          selectedMonth={new Date(2024, 5, 1)}
          onMonthChange={vi.fn()}
        />
      );

      expect(screen.getByText('June 2024')).toBeInTheDocument();
    });
  });

  describe('Category Aggregation', () => {
    it('renders category aggregation component', () => {
      render(<FinanceSummary {...defaultProps} />);

      // The CategoryAggregation component should be rendered
      expect(screen.getByText('Category Breakdown')).toBeInTheDocument();
    });
  });

  describe('Null Summary Handling', () => {
    it('handles null summary gracefully', () => {
      render(<FinanceSummary summary={null} categories={mockCategories} journals={mockJournals} />);

      // When summary is null, multiple stats will show $0.00
      const zeroAmounts = screen.getAllByText('$0.00');
      expect(zeroAmounts.length).toBeGreaterThan(0);
    });
  });

  describe('Charts', () => {
    it('renders expense breakdown chart', () => {
      render(<FinanceSummary {...defaultProps} />);

      expect(screen.getByText('Expense Breakdown')).toBeInTheDocument();
    });

    it('shows income breakdown when Income view is selected', () => {
      render(<FinanceSummary {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: 'Income' }));

      expect(screen.getByText('Income Breakdown')).toBeInTheDocument();
    });
  });
});
