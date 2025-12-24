import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../ui';

export interface WelcomeHeaderProps {
  userName?: string;
  subtitle?: string;
}

const WelcomeHeader = ({
  userName,
  subtitle = "Here's your progress overview for this month",
}: WelcomeHeaderProps) => {
  const displayName = userName?.split(' ')[0] || 'there';

  return (
    <div className="flex items-center justify-between" data-testid="welcome-header">
      <div>
        <h2 className="text-3xl font-display font-bold text-white">Welcome back, {displayName}!</h2>
        <p className="text-white/50 mt-1">{subtitle}</p>
      </div>
      <Link to="/finance">
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
          Add Transaction
        </Button>
      </Link>
    </div>
  );
};

export default WelcomeHeader;
