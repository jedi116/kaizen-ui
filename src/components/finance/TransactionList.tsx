import { Pencil, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Card, Badge, EmptyState } from '../ui';
import type { FinanceJournal } from '../../types';
import { formatCurrency, formatDate } from '../../lib/utils';

interface TransactionListProps {
  transactions: FinanceJournal[];
  onEdit: (transaction: FinanceJournal) => void;
  onDelete: (id: number) => void;
}

const TransactionList = ({ transactions, onEdit, onDelete }: TransactionListProps) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  if (transactions.length === 0) {
    return (
      <Card>
        <EmptyState
          title="No transactions yet"
          description="Start by adding your first income or expense"
        />
      </Card>
    );
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const date = transaction.date.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as Record<string, FinanceJournal[]>
  );

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, items]) => (
        <div key={date}>
          <h4 className="text-sm font-medium text-white/50 mb-3">
            {formatDate(date, { weekday: 'long', month: 'long', day: 'numeric' })}
          </h4>
          <Card className="divide-y divide-glass-border p-0">
            {items.map((transaction) => (
              <div
                key={transaction.ID}
                className="flex items-center justify-between p-4 hover:bg-glass-light/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                      transaction.type === 'income' ? 'bg-accent-teal/20' : 'bg-accent-rose/20'
                    }`}
                    style={{
                      borderLeft: `3px solid ${transaction.category?.color || '#666'}`,
                    }}
                  >
                    {transaction.category?.icon || (transaction.type === 'income' ? '💰' : '💸')}
                  </div>

                  {/* Details */}
                  <div>
                    <p className="font-medium text-white">{transaction.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={transaction.type === 'income' ? 'income' : 'expense'}>
                        {transaction.category?.name || transaction.type}
                      </Badge>
                      {transaction.payment_method && (
                        <span className="text-xs text-white/40">
                          {transaction.payment_method.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-semibold ${
                      transaction.type === 'income' ? 'text-accent-teal' : 'text-accent-rose'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </span>

                  {/* Actions */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === transaction.ID ? null : transaction.ID)
                      }
                      className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-glass-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenu === transaction.ID && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                        <div className="absolute right-0 top-full mt-1 w-36 glass-card p-1 z-20">
                          <button
                            onClick={() => {
                              onEdit(transaction);
                              setActiveMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-glass-white transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDelete(transaction.ID);
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
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
