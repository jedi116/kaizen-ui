import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import ModuleCard from './ModuleCard';

describe('ModuleCard', () => {
  const defaultProps = {
    name: 'Finance',
    description: 'Track income & expenses',
    icon: <span data-testid="module-icon">💰</span>,
    href: '/finance',
    gradient: 'from-accent-cyan to-accent-teal',
    active: true,
  };

  it('renders the module name', () => {
    render(<ModuleCard {...defaultProps} />);
    expect(screen.getByText('Finance')).toBeInTheDocument();
  });

  it('renders the module description', () => {
    render(<ModuleCard {...defaultProps} />);
    expect(screen.getByText('Track income & expenses')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<ModuleCard {...defaultProps} />);
    expect(screen.getByTestId('module-icon')).toBeInTheDocument();
  });

  it('links to the correct href', () => {
    render(<ModuleCard {...defaultProps} />);
    const link = screen.getByTestId('module-card');
    expect(link).toHaveAttribute('href', '/finance');
  });

  it('shows Coming Soon badge when inactive', () => {
    render(<ModuleCard {...defaultProps} active={false} />);
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('does not show Coming Soon badge when active', () => {
    render(<ModuleCard {...defaultProps} active={true} />);
    expect(screen.queryByText('Coming Soon')).not.toBeInTheDocument();
  });
});
