import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import DateRangeFilter from './DateRangeFilter';

describe('DateRangeFilter', () => {
  const defaultProps = {
    startDate: null,
    endDate: null,
    onStartDateChange: vi.fn(),
    onEndDateChange: vi.fn(),
    onClear: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    render(<DateRangeFilter {...defaultProps} />);
    expect(screen.getByTestId('date-range-filter')).toBeInTheDocument();
  });

  it('renders two date inputs', () => {
    render(<DateRangeFilter {...defaultProps} />);
    // Date inputs don't have role="textbox", they are generic inputs
    const container = screen.getByTestId('date-range-filter');
    const inputs = container.querySelectorAll('input[type="date"]');
    expect(inputs).toHaveLength(2);
  });

  it('displays the "to" separator', () => {
    render(<DateRangeFilter {...defaultProps} />);
    expect(screen.getByText('to')).toBeInTheDocument();
  });

  it('does not show clear button when no dates are set', () => {
    render(<DateRangeFilter {...defaultProps} />);
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  it('shows clear button when startDate is set', () => {
    render(<DateRangeFilter {...defaultProps} startDate="2024-01-01" />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('shows clear button when endDate is set', () => {
    render(<DateRangeFilter {...defaultProps} endDate="2024-01-31" />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('calls onStartDateChange when start date is changed', () => {
    render(<DateRangeFilter {...defaultProps} />);
    const container = screen.getByTestId('date-range-filter');
    const inputs = container.querySelectorAll('input[type="date"]');
    fireEvent.change(inputs[0], { target: { value: '2024-01-01' } });
    expect(defaultProps.onStartDateChange).toHaveBeenCalledWith('2024-01-01');
  });

  it('calls onEndDateChange when end date is changed', () => {
    render(<DateRangeFilter {...defaultProps} />);
    const container = screen.getByTestId('date-range-filter');
    const inputs = container.querySelectorAll('input[type="date"]');
    fireEvent.change(inputs[1], { target: { value: '2024-01-31' } });
    expect(defaultProps.onEndDateChange).toHaveBeenCalledWith('2024-01-31');
  });

  it('calls onClear when clear button is clicked', () => {
    render(<DateRangeFilter {...defaultProps} startDate="2024-01-01" />);
    fireEvent.click(screen.getByText('Clear'));
    expect(defaultProps.onClear).toHaveBeenCalled();
  });

  it('displays provided date values', () => {
    render(<DateRangeFilter {...defaultProps} startDate="2024-01-01" endDate="2024-01-31" />);
    const container = screen.getByTestId('date-range-filter');
    const inputs = container.querySelectorAll('input[type="date"]');
    expect(inputs[0]).toHaveValue('2024-01-01');
    expect(inputs[1]).toHaveValue('2024-01-31');
  });
});
