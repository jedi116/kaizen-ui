import type { ReactNode } from 'react';
import { Card } from '../ui';
import { formatCurrency } from '../../lib/utils';

export interface StatCardProps {
  name: string;
  value: number;
  icon: ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  className?: string;
}

const StatCard = ({
  name,
  value,
  icon,
  color,
  bgColor,
  borderColor,
  className = '',
}: StatCardProps) => {
  return (
    <Card className={className} data-testid="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/50">{name}</p>
          <p className={`text-2xl font-display font-bold mt-1 ${color}`}>{formatCurrency(value)}</p>
        </div>
        <div className={`p-3 rounded-xl ${bgColor} border ${borderColor}`}>
          <span className={color}>{icon}</span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
