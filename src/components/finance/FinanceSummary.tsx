import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';
import { Card } from '../ui';
import MonthSelector from './MonthSelector';
import CategoryAggregation from './CategoryAggregation';
import type { JournalSummary, FinanceCategory, FinanceJournal } from '../../types';
import { formatCurrency } from '../../lib/utils';

type ViewMode = 'all' | 'income' | 'expense' | 'balance';

interface FinanceSummaryProps {
  summary: JournalSummary | null;
  categories: FinanceCategory[];
  journals: FinanceJournal[];
  selectedMonth?: Date;
  onMonthChange?: (date: Date) => void;
}

// Custom tooltip component defined outside to avoid re-renders
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

const FinanceSummary = ({
  summary,
  categories,
  journals,
  selectedMonth: externalSelectedMonth,
  onMonthChange: externalOnMonthChange,
}: FinanceSummaryProps) => {
  // Internal month state if not controlled externally
  const [internalSelectedMonth, setInternalSelectedMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const selectedMonth = externalSelectedMonth ?? internalSelectedMonth;
  const onMonthChange = externalOnMonthChange ?? setInternalSelectedMonth;

  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>('all');

  // Calculate category-wise spending for expenses
  const expenseCategoryData = useMemo(
    () =>
      categories
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
        .filter((c) => c.value > 0),
    [categories, journals]
  );

  // Calculate category-wise income
  const incomeCategoryData = useMemo(
    () =>
      categories
        .filter((c) => c.type === 'income')
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
        .filter((c) => c.value > 0),
    [categories, journals]
  );

  const allStats = useMemo(
    () => [
      {
        id: 'income',
        name: 'Total Income',
        value: summary?.total_income || 0,
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'text-accent-teal',
        bgColor: 'bg-accent-teal/20',
        viewModes: ['all', 'income'] as ViewMode[],
      },
      {
        id: 'expense',
        name: 'Total Expenses',
        value: summary?.total_expense || 0,
        icon: <TrendingDown className="w-5 h-5" />,
        color: 'text-accent-rose',
        bgColor: 'bg-accent-rose/20',
        viewModes: ['all', 'expense'] as ViewMode[],
      },
      {
        id: 'balance',
        name: 'Net Balance',
        value: summary?.net_balance || 0,
        icon: <Wallet className="w-5 h-5" />,
        color: (summary?.net_balance || 0) >= 0 ? 'text-accent-cyan' : 'text-accent-rose',
        bgColor: (summary?.net_balance || 0) >= 0 ? 'bg-accent-cyan/20' : 'bg-accent-rose/20',
        viewModes: ['all', 'balance'] as ViewMode[],
      },
      {
        id: 'count',
        name: 'Transactions',
        value: summary?.entry_count || 0,
        icon: <Calendar className="w-5 h-5" />,
        color: 'text-accent-violet',
        bgColor: 'bg-accent-violet/20',
        isCurrency: false,
        viewModes: ['all'] as ViewMode[],
      },
    ],
    [summary]
  );

  const filteredStats = useMemo(
    () => allStats.filter((stat) => stat.viewModes.includes(viewMode)),
    [allStats, viewMode]
  );

  const viewModeOptions: { value: ViewMode; label: string; activeClass: string }[] = [
    { value: 'all', label: 'All', activeClass: 'bg-accent-cyan/30 text-accent-cyan' },
    { value: 'income', label: 'Income', activeClass: 'bg-accent-teal/30 text-accent-teal' },
    { value: 'expense', label: 'Expense', activeClass: 'bg-accent-rose/30 text-accent-rose' },
    { value: 'balance', label: 'Balance', activeClass: 'bg-accent-violet/30 text-accent-violet' },
  ];

  // Determine which chart data to show based on view mode
  const chartData = viewMode === 'income' ? incomeCategoryData : expenseCategoryData;
  const chartTitle = viewMode === 'income' ? 'Income Breakdown' : 'Expense Breakdown';

  return (
    <div className="space-y-6">
      {/* Month Selector and View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MonthSelector selectedMonth={selectedMonth} onMonthChange={onMonthChange} />

        {/* View Mode Toggle */}
        <div className="flex gap-1 p-1 glass-card rounded-lg" data-testid="view-mode-toggle">
          {viewModeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setViewMode(option.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === option.value ? option.activeClass : 'text-white/60 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className={`grid gap-4 ${
          filteredStats.length === 1
            ? 'grid-cols-1'
            : filteredStats.length === 2
              ? 'grid-cols-2'
              : filteredStats.length === 3
                ? 'grid-cols-3'
                : 'grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {filteredStats.map((stat) => (
          <Card key={stat.id} className="p-4">
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

      {/* Category Aggregation - Moved from Transactions tab */}
      {(viewMode === 'all' || viewMode === 'income' || viewMode === 'expense') && (
        <CategoryAggregation
          journals={journals}
          categories={categories}
          type={viewMode === 'all' ? 'all' : viewMode}
        />
      )}

      {/* Chart - Show income or expense breakdown based on view */}
      {chartData.length > 0 && viewMode !== 'balance' && (
        <Card>
          <h3 className="font-display font-semibold text-white mb-4">{chartTitle}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
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
