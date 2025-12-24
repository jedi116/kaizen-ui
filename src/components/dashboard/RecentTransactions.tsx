import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';
import { Card, Button } from '../ui';
import { formatCurrency, formatDate } from '../../lib/utils';
import type { FinanceJournal } from '../../types';

export interface RecentTransactionsProps {
  transactions: FinanceJournal[];
  maxItems?: number;
  isLoading?: boolean;
}

const RecentTransactions = ({
  transactions,
  maxItems = 5,
  isLoading = false,
}: RecentTransactionsProps) => {
  const displayedTransactions = transactions.slice(0, maxItems);

  return (
    <Card className="animate-slide-up animate-delay-300" data-testid="recent-transactions">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-white">Recent Transactions</h3>
        <Link to="/finance">
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-white/50">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : displayedTransactions.length === 0 ? (
          <div className="text-center py-8 text-white/50">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No transactions yet</p>
            <Link to="/finance" className="text-accent-cyan text-sm hover:underline">
              Add your first transaction
            </Link>
          </div>
        ) : (
          displayedTransactions.map((journal) => (
            <TransactionItem key={journal.ID} transaction={journal} />
          ))
        )}
      </div>
    </Card>
  );
};

interface TransactionItemProps {
  transaction: FinanceJournal;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <div
      className="flex items-center justify-between p-3 rounded-xl bg-glass-light hover:bg-glass-white transition-colors"
      data-testid="transaction-item"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
            transaction.type === 'income' ? 'bg-accent-teal/20' : 'bg-accent-rose/20'
          }`}
        >
          {transaction.category?.icon || (transaction.type === 'income' ? '💰' : '💸')}
        </div>
        <div>
          <p className="font-medium text-white text-sm">{transaction.title}</p>
          <p className="text-xs text-white/50">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <span
        className={`font-semibold ${
          transaction.type === 'income' ? 'text-accent-teal' : 'text-accent-rose'
        }`}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </span>
    </div>
  );
};

export default RecentTransactions;
