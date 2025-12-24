import StatCard from './StatCard';
import { statsConfig } from '../../config/dashboard.config';
import type { StatConfig } from '../../config/dashboard.config';

export interface StatsGridProps {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  config?: StatConfig[];
}

const StatsGrid = ({
  totalIncome,
  totalExpense,
  netBalance,
  config = statsConfig,
}: StatsGridProps) => {
  const data = { totalIncome, totalExpense, netBalance };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="stats-grid">
      {config.map((stat, index) => {
        const value = stat.getValue(data);
        return (
          <StatCard
            key={stat.id}
            name={stat.name}
            value={value}
            icon={stat.icon}
            color={stat.getColor(value)}
            bgColor={stat.getBgColor(value)}
            borderColor={stat.getBorderColor(value)}
            className={`animate-slide-up animate-delay-${(index + 1) * 100}`}
          />
        );
      })}
    </div>
  );
};

export default StatsGrid;
