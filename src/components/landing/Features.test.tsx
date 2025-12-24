import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Features from './Features';

describe('Features', () => {
  it('renders the features section', () => {
    render(<Features />);
    expect(screen.getByTestId('features-section')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<Features />);
    expect(screen.getByText('Everything you need to improve')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<Features />);
    expect(screen.getByText(/Kaizen provides all the tools you need to track/)).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Features />);
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards).toHaveLength(6);
  });

  it('displays feature titles', () => {
    render(<Features />);
    expect(screen.getByText('Finance Tracking')).toBeInTheDocument();
    expect(screen.getByText('Workout Logging')).toBeInTheDocument();
    expect(screen.getByText('Nutrition Monitoring')).toBeInTheDocument();
    expect(screen.getByText('Smart Insights')).toBeInTheDocument();
    expect(screen.getByText('Visual Analytics')).toBeInTheDocument();
    expect(screen.getByText('Goal Setting')).toBeInTheDocument();
  });

  it('displays feature descriptions', () => {
    render(<Features />);
    expect(
      screen.getByText(/Track your income and expenses, categorize transactions/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Log your exercise routines, track progress/)).toBeInTheDocument();
  });

  it('shows Coming Soon badges for unavailable features', () => {
    render(<Features />);
    const comingSoonBadges = screen.getAllByText('Coming Soon');
    expect(comingSoonBadges.length).toBeGreaterThan(0);
  });
});
