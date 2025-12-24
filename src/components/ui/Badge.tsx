import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'income' | 'expense' | 'workout' | 'food' | 'outline';
}

const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  const variants = {
    default: 'bg-white/10 text-white border-white/20',
    income: 'bg-accent-teal/20 text-accent-teal border-accent-teal/30',
    expense: 'bg-accent-rose/20 text-accent-rose border-accent-rose/30',
    workout: 'bg-accent-violet/20 text-accent-violet border-accent-violet/30',
    food: 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30',
    outline: 'bg-transparent text-white/70 border-white/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export default Badge;
