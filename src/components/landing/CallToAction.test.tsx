import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import CallToAction from './CallToAction';

describe('CallToAction', () => {
  it('renders the CTA section', () => {
    render(<CallToAction />);
    expect(screen.getByTestId('cta-section')).toBeInTheDocument();
  });

  it('renders the main heading', () => {
    render(<CallToAction />);
    expect(screen.getByText('Ready to transform your life?')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<CallToAction />);
    expect(
      screen.getByText(/Join Kaizen today and start your journey of continuous improvement/)
    ).toBeInTheDocument();
  });

  it('renders Start for Free button', () => {
    render(<CallToAction />);
    expect(screen.getByText('Start for Free')).toBeInTheDocument();
  });

  it('renders Already have an account link', () => {
    render(<CallToAction />);
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  it('links Start for Free to register page', () => {
    render(<CallToAction />);
    const link = screen.getByRole('link', { name: /start for free/i });
    expect(link).toHaveAttribute('href', '/register');
  });

  it('links Already have an account to login page', () => {
    render(<CallToAction />);
    const link = screen.getByRole('link', { name: /already have an account/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('renders footer text', () => {
    render(<CallToAction />);
    expect(screen.getByText('No credit card required. Start improving today.')).toBeInTheDocument();
  });
});
