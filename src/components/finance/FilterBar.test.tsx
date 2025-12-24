import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const defaultProps = {
    filterType: 'all' as const,
    onFilterTypeChange: vi.fn(),
    startDate: null,
    endDate: null,
    onStartDateChange: vi.fn(),
    onEndDateChange: vi.fn(),
    onClearDateRange: vi.fn(),
    onClearAllFilters: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
  });

  it('renders filter type buttons', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
  });

  it('calls onFilterTypeChange when filter button is clicked', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByText('Income'));
    expect(defaultProps.onFilterTypeChange).toHaveBeenCalledWith('income');
  });

  it('renders the date range filter', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByTestId('date-range-filter')).toBeInTheDocument();
  });

  it('passes date props to DateRangeFilter', () => {
    render(<FilterBar {...defaultProps} startDate="2024-01-01" endDate="2024-01-31" />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  describe('Clear All Filters Button', () => {
    it('does not show Clear All Filters button when no filters are active', () => {
      render(<FilterBar {...defaultProps} />);
      expect(screen.queryByTestId('clear-all-filters')).not.toBeInTheDocument();
    });

    it('shows Clear All Filters button when filter type is not "all"', () => {
      render(<FilterBar {...defaultProps} filterType="income" />);
      expect(screen.getByTestId('clear-all-filters')).toBeInTheDocument();
      expect(screen.getByText('Clear All Filters')).toBeInTheDocument();
    });

    it('shows Clear All Filters button when start date is set', () => {
      render(<FilterBar {...defaultProps} startDate="2024-01-01" />);
      expect(screen.getByTestId('clear-all-filters')).toBeInTheDocument();
    });

    it('shows Clear All Filters button when end date is set', () => {
      render(<FilterBar {...defaultProps} endDate="2024-01-31" />);
      expect(screen.getByTestId('clear-all-filters')).toBeInTheDocument();
    });

    it('calls onClearAllFilters when Clear All Filters button is clicked', () => {
      render(<FilterBar {...defaultProps} filterType="income" />);
      fireEvent.click(screen.getByTestId('clear-all-filters'));
      expect(defaultProps.onClearAllFilters).toHaveBeenCalled();
    });

    it('shows Clear All Filters button when both filter type and dates are set', () => {
      render(
        <FilterBar
          {...defaultProps}
          filterType="expense"
          startDate="2024-01-01"
          endDate="2024-01-31"
        />
      );
      expect(screen.getByTestId('clear-all-filters')).toBeInTheDocument();
    });
  });
});
