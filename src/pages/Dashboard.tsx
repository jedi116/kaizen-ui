import { useAuthStore } from '../stores';
import { useJournalsList, useSummary } from '../hooks';
import {
  WelcomeHeader,
  StatsGrid,
  ModulesGrid,
  RecentTransactions,
  QuickActions,
} from '../components/dashboard';

const Dashboard = () => {
  const { user } = useAuthStore();

  // Fetch data using TanStack Query hooks
  const { journals, isLoading: isJournalsLoading } = useJournalsList({ page_size: 5 });
  const { data: summary, isLoading: isSummaryLoading } = useSummary();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <WelcomeHeader userName={user?.name} />

      {/* Stats Grid */}
      <StatsGrid
        totalIncome={summary?.total_income || 0}
        totalExpense={summary?.total_expense || 0}
        netBalance={summary?.net_balance || 0}
      />

      {/* Module Cards */}
      <ModulesGrid />

      {/* Recent Transactions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions
          transactions={journals}
          maxItems={5}
          isLoading={isJournalsLoading || isSummaryLoading}
        />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
