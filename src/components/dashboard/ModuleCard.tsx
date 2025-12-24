import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, Badge } from '../ui';

export interface ModuleCardProps {
  name: string;
  description: string;
  icon: ReactNode;
  href: string;
  gradient: string;
  active: boolean;
  className?: string;
}

const ModuleCard = ({
  name,
  description,
  icon,
  href,
  gradient,
  active,
  className = '',
}: ModuleCardProps) => {
  return (
    <Link to={href} data-testid="module-card">
      <Card variant="hover" className={`relative overflow-hidden ${className}`}>
        {!active && (
          <div className="coming-soon-overlay">
            <Badge variant="outline" className="text-sm">
              Coming Soon
            </Badge>
          </div>
        )}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white`}>{icon}</div>
          <div className="flex-1">
            <h4 className="font-display font-semibold text-white">{name}</h4>
            <p className="text-sm text-white/50 mt-1">{description}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-white/30" />
        </div>
      </Card>
    </Link>
  );
};

export default ModuleCard;
