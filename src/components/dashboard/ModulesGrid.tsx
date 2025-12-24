import ModuleCard from './ModuleCard';
import { modulesConfig } from '../../config/dashboard.config';
import type { ModuleConfig } from '../../config/dashboard.config';

export interface ModulesGridProps {
  config?: ModuleConfig[];
}

const ModulesGrid = ({ config = modulesConfig }: ModulesGridProps) => {
  return (
    <div data-testid="modules-grid">
      <h3 className="section-title">Your Modules</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {config.map((module, index) => (
          <ModuleCard
            key={module.id}
            name={module.name}
            description={module.description}
            icon={module.icon}
            href={module.href}
            gradient={module.gradient}
            active={module.active}
            className={`animate-slide-up animate-delay-${(index + 1) * 100}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModulesGrid;
