import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import ModulesGrid from './ModulesGrid';

describe('ModulesGrid', () => {
  it('renders the modules grid container', () => {
    render(<ModulesGrid />);
    expect(screen.getByTestId('modules-grid')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<ModulesGrid />);
    expect(screen.getByText('Your Modules')).toBeInTheDocument();
  });

  it('renders all three module cards', () => {
    render(<ModulesGrid />);
    const moduleCards = screen.getAllByTestId('module-card');
    expect(moduleCards).toHaveLength(3);
  });

  it('displays correct module names', () => {
    render(<ModulesGrid />);
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Workouts')).toBeInTheDocument();
    expect(screen.getByText('Nutrition')).toBeInTheDocument();
  });

  it('shows Coming Soon for inactive modules', () => {
    render(<ModulesGrid />);
    const comingSoonBadges = screen.getAllByText('Coming Soon');
    expect(comingSoonBadges.length).toBeGreaterThan(0);
  });
});
