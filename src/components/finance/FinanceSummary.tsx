import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';
import { Card } from '../ui';
import type { JournalSummary, FinanceCategory, FinanceJournal } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface FinanceSummaryProps {
  summary: JournalSummary | null;
  categories: FinanceCategory[];
  journals: FinanceJournal[];
}

const FinanceSummary = ({ summary, categories, journals }: FinanceSummaryProps) => {
  // Calculate category-wise spending
  const categoryData = categories
    .filter((c) => c.type === 'expense')
    .map((category) => {
      const total = journals
        .filter((j) => j.category_id === category.ID)
        .reduce((sum, j) => sum + j.amount, 0);
      return {
        name: category.name,
        value: total,
        color: category.color || '#666',
        icon: category.icon,
      };
    })
    .filter((c) => c.value > 0);

  const stats = [
    {
      name: 'Total Income',
      value: summary?.total_income || 0,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-accent-teal',
      bgColor: 'bg-accent-teal/20',
    },
    {
      name: 'Total Expenses',
      value: summary?.total_expense || 0,
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'text-accent-rose',
      bgColor: 'bg-accent-rose/20',
    },
    {
      name: 'Net Balance',
      value: summary?.net_balance || 0,
      icon: <Wallet className="w-5 h-5" />,
      color: (summary?.net_balance || 0) >= 0 ? 'text-accent-cyan' : 'text-accent-rose',
      bgColor: (summary?.net_balance || 0) >= 0 ? 'bg-accent-cyan/20' : 'bg-accent-rose/20',
    },
    {
      name: 'Transactions',
      value: summary?.entry_count || 0,
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-accent-violet',
      bgColor: 'bg-accent-violet/20',
      isCurrency: false,
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; payload: { icon?: string } }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-sm">
          <p className="text-white font-medium">
            {payload[0].payload.icon} {payload[0].name}
          </p>
          <p className="text-white/70">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <div>
                <p className="text-xs text-white/50">{stat.name}</p>
                <p className={`text-lg font-semibold ${stat.color}`}>
                  {stat.isCurrency === false ? stat.value : formatCurrency(stat.value)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Expense Breakdown Chart */}
      {categoryData.length > 0 && (
        <Card>
          <h3 className="font-display font-semibold text-white mb-4">Expense Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="text-white/70 text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FinanceSummary;
