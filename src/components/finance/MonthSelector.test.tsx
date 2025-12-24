import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import MonthSelector from './MonthSelector';

describe('MonthSelector', () => {
  const defaultProps = {
    selectedMonth: new Date(2024, 0, 1), // January 2024
    onMonthChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    render(<MonthSelector {...defaultProps} />);
    expect(screen.getByTestId('month-selector')).toBeInTheDocument();
  });

  it('displays the selected month and year', () => {
    render(<MonthSelector {...defaultProps} />);
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('navigates to previous month when left arrow is clicked', () => {
    render(<MonthSelector {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Previous month'));

    expect(defaultProps.onMonthChange).toHaveBeenCalledWith(new Date(2023, 11, 1)); // December 2023
  });

  it('navigates to next month when right arrow is clicked', () => {
    render(<MonthSelector {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Next month'));

    expect(defaultProps.onMonthChange).toHaveBeenCalledWith(new Date(2024, 1, 1)); // February 2024
  });

  it('disables next month button when current month is selected', () => {
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    render(
      <MonthSelector selectedMonth={currentMonth} onMonthChange={defaultProps.onMonthChange} />
    );

    const nextButton = screen.getByLabelText('Next month');
    expect(nextButton).toBeDisabled();
  });

  it('enables next month button when past month is selected', () => {
    const pastMonth = new Date(2020, 0, 1);

    render(<MonthSelector selectedMonth={pastMonth} onMonthChange={defaultProps.onMonthChange} />);

    const nextButton = screen.getByLabelText('Next month');
    expect(nextButton).not.toBeDisabled();
  });

  it('shows Quick Select button', () => {
    render(<MonthSelector {...defaultProps} />);
    expect(screen.getByText('Quick Select')).toBeInTheDocument();
  });

  it('shows preset options when Quick Select is clicked', () => {
    render(<MonthSelector {...defaultProps} />);

    fireEvent.click(screen.getByText('Quick Select'));

    expect(screen.getByText('This Month')).toBeInTheDocument();
    expect(screen.getByText('Last Month')).toBeInTheDocument();
    expect(screen.getByText('Last 3 Months')).toBeInTheDocument();
  });

  it('selects This Month preset', () => {
    const now = new Date();
    const expectedMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    render(<MonthSelector {...defaultProps} />);

    fireEvent.click(screen.getByText('Quick Select'));
    fireEvent.click(screen.getByText('This Month'));

    expect(defaultProps.onMonthChange).toHaveBeenCalledWith(expectedMonth);
  });

  it('selects Last Month preset', () => {
    const now = new Date();
    const expectedMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    render(<MonthSelector {...defaultProps} />);

    fireEvent.click(screen.getByText('Quick Select'));
    fireEvent.click(screen.getByText('Last Month'));

    expect(defaultProps.onMonthChange).toHaveBeenCalledWith(expectedMonth);
  });

  it('selects Last 3 Months preset', () => {
    const now = new Date();
    const expectedMonth = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    render(<MonthSelector {...defaultProps} />);

    fireEvent.click(screen.getByText('Quick Select'));
    fireEvent.click(screen.getByText('Last 3 Months'));

    expect(defaultProps.onMonthChange).toHaveBeenCalledWith(expectedMonth);
  });

  it('closes preset dropdown after selection', () => {
    render(<MonthSelector {...defaultProps} />);

    fireEvent.click(screen.getByText('Quick Select'));
    expect(screen.getByText('This Month')).toBeInTheDocument();

    fireEvent.click(screen.getByText('This Month'));
    expect(screen.queryByText('Last Month')).not.toBeInTheDocument();
  });

  it('displays different months correctly', () => {
    const { rerender } = render(<MonthSelector {...defaultProps} />);
    expect(screen.getByText('January 2024')).toBeInTheDocument();

    rerender(
      <MonthSelector
        selectedMonth={new Date(2024, 6, 1)}
        onMonthChange={defaultProps.onMonthChange}
      />
    );
    expect(screen.getByText('July 2024')).toBeInTheDocument();

    rerender(
      <MonthSelector
        selectedMonth={new Date(2023, 11, 1)}
        onMonthChange={defaultProps.onMonthChange}
      />
    );
    expect(screen.getByText('December 2023')).toBeInTheDocument();
  });
});
