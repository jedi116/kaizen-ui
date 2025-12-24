import { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import Button from './Button';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}
    >
      {icon && <div className="mb-4 p-4 rounded-full bg-glass-white text-white/60">{icon}</div>}
      <h3 className="text-lg font-display font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-white/60 max-w-sm mb-6">{description}</p>}
      {action && (
        <Button onClick={action.onClick} variant="secondary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
