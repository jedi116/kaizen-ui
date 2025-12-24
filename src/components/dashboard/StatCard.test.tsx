import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import StatCard from './StatCard';

describe('StatCard', () => {
  const defaultProps = {
    name: 'Total Income',
    value: 5000,
    icon: <span data-testid="icon">💰</span>,
    color: 'text-accent-teal',
    bgColor: 'bg-accent-teal/20',
    borderColor: 'border-accent-teal/30',
  };

  it('renders the stat name', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('Total Income')).toBeInTheDocument();
  });

  it('renders the formatted currency value', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies the correct color class to value', () => {
    render(<StatCard {...defaultProps} />);
    const valueElement = screen.getByText('$5,000.00');
    expect(valueElement).toHaveClass('text-accent-teal');
  });

  it('renders with custom className', () => {
    render(<StatCard {...defaultProps} className="custom-class" />);
    expect(screen.getByTestId('stat-card')).toHaveClass('custom-class');
  });

  it('handles zero value correctly', () => {
    render(<StatCard {...defaultProps} value={0} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('handles negative value correctly', () => {
    render(<StatCard {...defaultProps} value={-500} />);
    expect(screen.getByText('-$500.00')).toBeInTheDocument();
  });
});
