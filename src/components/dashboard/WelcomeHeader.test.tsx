import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import WelcomeHeader from './WelcomeHeader';

describe('WelcomeHeader', () => {
  it('renders the component', () => {
    render(<WelcomeHeader />);
    expect(screen.getByTestId('welcome-header')).toBeInTheDocument();
  });

  it('displays default greeting when no userName provided', () => {
    render(<WelcomeHeader />);
    expect(screen.getByText('Welcome back, there!')).toBeInTheDocument();
  });

  it('displays personalized greeting with first name', () => {
    render(<WelcomeHeader userName="John Doe" />);
    expect(screen.getByText('Welcome back, John!')).toBeInTheDocument();
  });

  it('displays default subtitle', () => {
    render(<WelcomeHeader />);
    expect(screen.getByText("Here's your progress overview for this month")).toBeInTheDocument();
  });

  it('displays custom subtitle', () => {
    render(<WelcomeHeader subtitle="Custom subtitle message" />);
    expect(screen.getByText('Custom subtitle message')).toBeInTheDocument();
  });

  it('renders Add Transaction button', () => {
    render(<WelcomeHeader />);
    expect(screen.getByText('Add Transaction')).toBeInTheDocument();
  });

  it('Add Transaction button links to finance page', () => {
    render(<WelcomeHeader />);
    const link = screen.getByRole('link', { name: /add transaction/i });
    expect(link).toHaveAttribute('href', '/finance');
  });
});
