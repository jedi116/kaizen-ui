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
    showAggregation: false,
    onToggleAggregation: vi.fn(),
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

  it('renders aggregation toggle button', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('Show Aggregation')).toBeInTheDocument();
  });

  it('shows Hide Aggregation when showAggregation is true', () => {
    render(<FilterBar {...defaultProps} showAggregation={true} />);
    expect(screen.getByText('Hide Aggregation')).toBeInTheDocument();
  });

  it('calls onToggleAggregation when button is clicked', () => {
    render(<FilterBar {...defaultProps} />);
    fireEvent.click(screen.getByText('Show Aggregation'));
    expect(defaultProps.onToggleAggregation).toHaveBeenCalled();
  });

  it('passes date props to DateRangeFilter', () => {
    render(<FilterBar {...defaultProps} startDate="2024-01-01" endDate="2024-01-31" />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});
