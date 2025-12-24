import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import StatsGrid from './StatsGrid';

describe('StatsGrid', () => {
  const defaultProps = {
    totalIncome: 10000,
    totalExpense: 7500,
    netBalance: 2500,
  };

  it('renders the stats grid container', () => {
    render(<StatsGrid {...defaultProps} />);
    expect(screen.getByTestId('stats-grid')).toBeInTheDocument();
  });

  it('renders all three stat cards', () => {
    render(<StatsGrid {...defaultProps} />);
    const statCards = screen.getAllByTestId('stat-card');
    expect(statCards).toHaveLength(3);
  });

  it('displays the correct stat names', () => {
    render(<StatsGrid {...defaultProps} />);
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Balance')).toBeInTheDocument();
  });

  it('displays formatted currency values', () => {
    render(<StatsGrid {...defaultProps} />);
    expect(screen.getByText('$10,000.00')).toBeInTheDocument();
    expect(screen.getByText('$7,500.00')).toBeInTheDocument();
    expect(screen.getByText('$2,500.00')).toBeInTheDocument();
  });

  it('handles zero values correctly', () => {
    render(<StatsGrid totalIncome={0} totalExpense={0} netBalance={0} />);
    const zeroValues = screen.getAllByText('$0.00');
    expect(zeroValues).toHaveLength(3);
  });
});
