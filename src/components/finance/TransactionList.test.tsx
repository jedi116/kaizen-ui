import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import TransactionList from './TransactionList';
import type { FinanceJournal } from '../../types';

// Save the original IntersectionObserver
const originalIntersectionObserver = window.IntersectionObserver;

// Mock IntersectionObserver as a class
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor(callback: IntersectionObserverCallback) {
    // Store the callback if needed for testing
    MockIntersectionObserver.callback = callback;
  }

  static callback: IntersectionObserverCallback | null = null;
}

beforeAll(() => {
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

afterAll(() => {
  window.IntersectionObserver = originalIntersectionObserver;
});

const mockTransactions: FinanceJournal[] = [
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
    category: {
      ID: 1,
      user_id: 1,
      name: 'Employment',
      type: 'income',
      icon: '💼',
      color: '#10b981',
      CreatedAt: '',
      UpdatedAt: '',
    },
    CreatedAt: '2024-01-15T00:00:00Z',
    UpdatedAt: '2024-01-15T00:00:00Z',
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
    category: {
      ID: 2,
      user_id: 1,
      name: 'Food',
      type: 'expense',
      icon: '🛒',
      color: '#f43f5e',
      CreatedAt: '',
      UpdatedAt: '',
    },
    CreatedAt: '2024-01-16T00:00:00Z',
    UpdatedAt: '2024-01-16T00:00:00Z',
  },
];

describe('TransactionList', () => {
  const defaultProps = {
    transactions: mockTransactions,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders transactions', () => {
    render(<TransactionList {...defaultProps} />);

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });

  it('shows empty state when no transactions', () => {
    render(<TransactionList {...defaultProps} transactions={[]} />);

    expect(screen.getByText('No transactions yet')).toBeInTheDocument();
  });

  it('displays transaction amounts with correct formatting', () => {
    render(<TransactionList {...defaultProps} />);

    expect(screen.getByText('+$5,000.00')).toBeInTheDocument();
    expect(screen.getByText('-$150.00')).toBeInTheDocument();
  });

  it('groups transactions by date', () => {
    render(<TransactionList {...defaultProps} />);

    // Both transactions should be visible (they are on different dates)
    // The component groups by date, so we check that both transactions appear
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();

    // Also verify that date headers exist (format: "Monday, January 15")
    // Check for any text containing the date day
    const dateHeaders = document.querySelectorAll('h4');
    expect(dateHeaders.length).toBeGreaterThan(0);
  });

  it('shows category badges', () => {
    render(<TransactionList {...defaultProps} />);

    expect(screen.getByText('Employment')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('calls onEdit when edit action is clicked', () => {
    render(<TransactionList {...defaultProps} />);

    // Find and click the more menu button
    const moreButtons = screen.getAllByRole('button');
    // The more button is the last one in each transaction row
    fireEvent.click(moreButtons[0]);

    // Click edit
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(defaultProps.onEdit).toHaveBeenCalled();
  });

  it('calls onDelete when delete action is clicked', () => {
    render(<TransactionList {...defaultProps} />);

    // Find and click the more menu button
    const moreButtons = screen.getAllByRole('button');
    fireEvent.click(moreButtons[0]);

    // Click delete
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(defaultProps.onDelete).toHaveBeenCalled();
  });

  describe('Infinite Scroll', () => {
    it('displays total count when provided', () => {
      render(<TransactionList {...defaultProps} totalCount={100} />);

      expect(screen.getByText(/Showing 2 of 100 transactions/)).toBeInTheDocument();
    });

    it('shows loading indicator when fetching next page', () => {
      render(<TransactionList {...defaultProps} isFetchingNextPage={true} />);

      expect(screen.getByText('Loading more transactions...')).toBeInTheDocument();
    });

    it('shows end of list message when no more pages', () => {
      render(<TransactionList {...defaultProps} hasNextPage={false} />);

      expect(screen.getByText("You've reached the end of the list")).toBeInTheDocument();
    });

    it('does not show end of list when there are more pages', () => {
      render(<TransactionList {...defaultProps} hasNextPage={true} />);

      expect(screen.queryByText("You've reached the end of the list")).not.toBeInTheDocument();
    });

    it('sets up IntersectionObserver for infinite scroll', () => {
      const fetchNextPage = vi.fn();

      render(
        <TransactionList {...defaultProps} hasNextPage={true} fetchNextPage={fetchNextPage} />
      );

      expect(MockIntersectionObserver.callback).not.toBeNull();
    });

    it('does not show loading or end message for empty list', () => {
      render(<TransactionList {...defaultProps} transactions={[]} />);

      expect(screen.queryByText('Loading more transactions...')).not.toBeInTheDocument();
      expect(screen.queryByText("You've reached the end of the list")).not.toBeInTheDocument();
    });
  });

  describe('Transaction Display', () => {
    it('shows payment method when available', () => {
      render(<TransactionList {...defaultProps} />);

      expect(screen.getByText('bank transfer')).toBeInTheDocument();
      expect(screen.getByText('credit card')).toBeInTheDocument();
    });

    it('applies correct color for income transactions', () => {
      render(<TransactionList {...defaultProps} />);

      const salaryAmount = screen.getByText('+$5,000.00');
      expect(salaryAmount).toHaveClass('text-accent-teal');
    });

    it('applies correct color for expense transactions', () => {
      render(<TransactionList {...defaultProps} />);

      const groceriesAmount = screen.getByText('-$150.00');
      expect(groceriesAmount).toHaveClass('text-accent-rose');
    });
  });
});
