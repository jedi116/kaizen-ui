import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import QuickActions from './QuickActions';

describe('QuickActions', () => {
  it('renders the component', () => {
    render(<QuickActions />);
    expect(screen.getByTestId('quick-actions')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<QuickActions />);
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });

  it('renders all quick action buttons', () => {
    render(<QuickActions />);
    const buttons = screen.getAllByTestId('quick-action-button');
    expect(buttons).toHaveLength(4);
  });

  it('displays correct action names', () => {
    render(<QuickActions />);
    expect(screen.getByText('Add Income')).toBeInTheDocument();
    expect(screen.getByText('Add Expense')).toBeInTheDocument();
    expect(screen.getByText('Log Workout')).toBeInTheDocument();
    expect(screen.getByText('Log Meal')).toBeInTheDocument();
  });

  it('displays correct action descriptions', () => {
    render(<QuickActions />);
    expect(screen.getByText('Record earnings')).toBeInTheDocument();
    expect(screen.getByText('Track spending')).toBeInTheDocument();
    expect(screen.getByText('Track exercise')).toBeInTheDocument();
    expect(screen.getByText('Track nutrition')).toBeInTheDocument();
  });

  it('shows Soon badge for coming soon actions', () => {
    render(<QuickActions />);
    const soonBadges = screen.getAllByText('Soon');
    expect(soonBadges.length).toBeGreaterThan(0);
  });
});
