import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    expect(screen.getByText(/Master Your Life with/)).toBeInTheDocument();
    expect(screen.getByText('Kaizen')).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<Hero />);
    expect(screen.getByText(/Track your finances, workouts, and nutrition/)).toBeInTheDocument();
  });

  it('renders the badge text', () => {
    render(<Hero />);
    expect(screen.getByText('Your personal improvement journey starts here')).toBeInTheDocument();
  });

  it('renders Get Started Free button', () => {
    render(<Hero />);
    expect(screen.getByText('Get Started Free')).toBeInTheDocument();
  });

  it('renders Sign In button', () => {
    render(<Hero />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('links Get Started to register page', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /get started free/i });
    expect(link).toHaveAttribute('href', '/register');
  });

  it('links Sign In to login page', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /sign in/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('renders stats section', () => {
    render(<Hero />);
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Free to use')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Life modules')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Always available')).toBeInTheDocument();
  });
});
