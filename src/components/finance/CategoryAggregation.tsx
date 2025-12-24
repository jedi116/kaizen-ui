import { useMemo } from 'react';
import { Card, Badge } from '../ui';
import { formatCurrency } from '../../lib/utils';
import type { FinanceJournal, FinanceCategory } from '../../types';

export interface CategoryAggregationProps {
  journals: FinanceJournal[];
  categories: FinanceCategory[];
  type?: 'income' | 'expense' | 'all';
}

interface CategoryTotal {
  category: FinanceCategory | null;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  total: number;
  count: number;
  type: 'income' | 'expense';
}

const CategoryAggregation = ({ journals, categories, type = 'all' }: CategoryAggregationProps) => {
  const categoryTotals = useMemo(() => {
    const filteredJournals = type === 'all' ? journals : journals.filter((j) => j.type === type);

    const totalsMap = new Map<number, CategoryTotal>();

    filteredJournals.forEach((journal) => {
      const categoryId = journal.category_id;
      const category = categories.find((c) => c.ID === categoryId);

      if (!totalsMap.has(categoryId)) {
        totalsMap.set(categoryId, {
          category: category || null,
          categoryName: category?.name || 'Uncategorized',
          categoryIcon: category?.icon || (journal.type === 'income' ? '💰' : '💸'),
          categoryColor: category?.color || '#666',
          total: 0,
          count: 0,
          type: journal.type,
        });
      }

      const current = totalsMap.get(categoryId)!;
      current.total += journal.amount;
      current.count += 1;
    });

    return Array.from(totalsMap.values()).sort((a, b) => b.total - a.total);
  }, [journals, categories, type]);

  const grandTotal = categoryTotals.reduce((sum, cat) => sum + cat.total, 0);

  if (categoryTotals.length === 0) {
    return (
      <Card data-testid="category-aggregation">
        <h3 className="font-display font-semibold text-white mb-4">Category Breakdown</h3>
        <p className="text-white/50 text-center py-8">No transactions to aggregate</p>
      </Card>
    );
  }

  return (
    <Card data-testid="category-aggregation">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-white">Category Breakdown</h3>
        <span className="text-sm text-white/50">{categoryTotals.length} categories</span>
      </div>

      <div className="space-y-3">
        {categoryTotals.map((cat, index) => {
          const percentage = grandTotal > 0 ? (cat.total / grandTotal) * 100 : 0;

          return (
            <div
              key={`${cat.categoryName}-${index}`}
              className="p-3 rounded-xl bg-glass-light"
              data-testid="category-row"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.categoryIcon}</span>
                  <div>
                    <p className="font-medium text-white text-sm">{cat.categoryName}</p>
                    <p className="text-xs text-white/50">{cat.count} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      cat.type === 'income' ? 'text-accent-teal' : 'text-accent-rose'
                    }`}
                  >
                    {formatCurrency(cat.total)}
                  </p>
                  <Badge variant={cat.type === 'income' ? 'income' : 'expense'} className="text-xs">
                    {percentage.toFixed(1)}%
                  </Badge>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-glass-white rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    cat.type === 'income' ? 'bg-accent-teal' : 'bg-accent-rose'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-glass-border flex items-center justify-between">
        <span className="font-medium text-white">Total</span>
        <span className="text-lg font-bold text-white">{formatCurrency(grandTotal)}</span>
      </div>
    </Card>
  );
};

export default CategoryAggregation;
