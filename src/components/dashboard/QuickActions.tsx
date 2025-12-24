import { Link } from 'react-router-dom';
import { Card, Badge } from '../ui';
import { quickActionsConfig } from '../../config/dashboard.config';
import type { QuickActionConfig } from '../../config/dashboard.config';

export interface QuickActionsProps {
  config?: QuickActionConfig[];
}

const QuickActions = ({ config = quickActionsConfig }: QuickActionsProps) => {
  return (
    <Card className="animate-slide-up animate-delay-400" data-testid="quick-actions">
      <h3 className="font-display font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {config.map((action) => (
          <QuickActionButton key={action.id} action={action} />
        ))}
      </div>
    </Card>
  );
};

interface QuickActionButtonProps {
  action: QuickActionConfig;
}

const QuickActionButton = ({ action }: QuickActionButtonProps) => {
  return (
    <Link to={action.href}>
      <button
        className="w-full p-4 rounded-xl bg-glass-light hover:bg-glass-white border border-glass-border transition-all text-left group relative"
        data-testid="quick-action-button"
      >
        {action.badge && (
          <Badge variant="outline" className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5">
            {action.badge}
          </Badge>
        )}
        <div
          className={`w-10 h-10 rounded-xl ${action.iconBgColor} ${action.iconColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
        >
          {action.icon}
        </div>
        <p className="font-medium text-white text-sm">{action.name}</p>
        <p className="text-xs text-white/50 mt-0.5">{action.description}</p>
      </button>
    </Link>
  );
};

export default QuickActions;
