import { Pencil, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Card, Badge, EmptyState } from '../ui';
import type { FinanceCategory } from '../../types';

interface CategoryListProps {
  categories: FinanceCategory[];
  onEdit: (category: FinanceCategory) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

const CategoryList = ({ categories, onEdit, onDelete, onAdd }: CategoryListProps) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  if (categories.length === 0) {
    return (
      <Card>
        <EmptyState
          title="No categories yet"
          description="Create categories to organize your transactions"
          action={{
            label: 'Add Category',
            onClick: onAdd,
          }}
        />
      </Card>
    );
  }

  const CategoryGroup = ({
    title,
    items,
    variant,
  }: {
    title: string;
    items: FinanceCategory[];
    variant: 'income' | 'expense';
  }) => (
    <div>
      <h4 className="text-sm font-medium text-white/50 mb-3">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((category) => (
          <div
            key={category.ID}
            className="group relative p-4 rounded-xl bg-glass-light border border-glass-border hover:bg-glass-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon || (variant === 'income' ? '💰' : '💸')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{category.name}</p>
                {category.description && (
                  <p className="text-xs text-white/50 truncate">{category.description}</p>
                )}
              </div>
              <Badge variant={variant}>{variant}</Badge>

              {/* Actions */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === category.ID ? null : category.ID)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-glass-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {activeMenu === category.ID && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                    <div className="absolute right-0 top-full mt-1 w-36 glass-card p-1 z-20">
                      <button
                        onClick={() => {
                          onEdit(category);
                          setActiveMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-glass-white transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(category.ID);
                          setActiveMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-accent-rose hover:bg-accent-rose/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {incomeCategories.length > 0 && (
        <CategoryGroup title="Income Categories" items={incomeCategories} variant="income" />
      )}
      {expenseCategories.length > 0 && (
        <CategoryGroup title="Expense Categories" items={expenseCategories} variant="expense" />
      )}
    </div>
  );
};

export default CategoryList;
