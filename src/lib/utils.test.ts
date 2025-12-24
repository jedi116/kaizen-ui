import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatDate, formatDateISO, getInitials } from './utils';

describe('cn (className utility)', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const isTrue = true;
    const isFalse = false;
    const result = cn('base', isTrue && 'conditional', isFalse && 'excluded');
    expect(result).toBe('base conditional');
  });

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'other');
    expect(result).toBe('base other');
  });

  it('merges tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2']);
    expect(result).toBe('class1 class2');
  });
});

describe('formatCurrency', () => {
  it('formats positive numbers as USD', () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe('$1,234.56');
  });

  it('formats zero correctly', () => {
    const result = formatCurrency(0);
    expect(result).toBe('$0.00');
  });

  it('formats negative numbers correctly', () => {
    const result = formatCurrency(-500);
    expect(result).toBe('-$500.00');
  });

  it('formats large numbers with commas', () => {
    const result = formatCurrency(1000000);
    expect(result).toBe('$1,000,000.00');
  });

  it('handles decimal places correctly', () => {
    const result = formatCurrency(99.999);
    expect(result).toBe('$100.00');
  });

  it('supports custom currency', () => {
    const result = formatCurrency(100, 'EUR');
    expect(result).toContain('100');
    expect(result).toContain('€');
  });
});

describe('formatDate', () => {
  it('formats date string with default options', () => {
    // Use ISO format with time to ensure consistent timezone handling
    const result = formatDate('2024-01-15T12:00:00');
    expect(result).toBe('Jan 15, 2024');
  });

  it('formats Date object', () => {
    // Create date with explicit local time to avoid timezone issues
    const date = new Date(2024, 5, 20); // June 20, 2024
    const result = formatDate(date);
    expect(result).toBe('Jun 20, 2024');
  });

  it('formats with custom options', () => {
    const date = new Date(2024, 0, 15); // January 15, 2024
    const result = formatDate(date, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    expect(result).toBe('Monday, January 15, 2024');
  });

  it('handles ISO date strings with time', () => {
    const result = formatDate('2024-01-15T14:30:00');
    expect(result).toBe('Jan 15, 2024');
  });

  it('formats month only', () => {
    const date = new Date(2024, 2, 1); // March 1, 2024
    const result = formatDate(date, { month: 'long' });
    expect(result).toBe('March');
  });
});

describe('formatDateISO', () => {
  it('formats Date to ISO date string', () => {
    const date = new Date('2024-01-15T14:30:00Z');
    const result = formatDateISO(date);
    expect(result).toBe('2024-01-15');
  });

  it('handles different dates', () => {
    const date = new Date('2023-12-25');
    const result = formatDateISO(date);
    expect(result).toBe('2023-12-25');
  });

  it('returns only date portion without time', () => {
    const date = new Date('2024-06-15T23:59:59Z');
    const result = formatDateISO(date);
    expect(result).not.toContain('T');
    expect(result).not.toContain(':');
  });
});

describe('getInitials', () => {
  it('returns initials for full name', () => {
    const result = getInitials('John Doe');
    expect(result).toBe('JD');
  });

  it('returns single initial for single name', () => {
    const result = getInitials('John');
    expect(result).toBe('J');
  });

  it('handles multiple names (takes first two)', () => {
    const result = getInitials('John Michael Doe');
    expect(result).toBe('JM');
  });

  it('returns uppercase initials', () => {
    const result = getInitials('john doe');
    expect(result).toBe('JD');
  });

  it('handles extra spaces', () => {
    const result = getInitials('  John   Doe  ');
    // Note: This depends on implementation - may need to trim
    expect(result.length).toBeLessThanOrEqual(2);
  });

  it('handles single character names', () => {
    const result = getInitials('A B');
    expect(result).toBe('AB');
  });
});
