import { Wallet, Dumbbell, Utensils, TrendingUp, BarChart3, Target } from 'lucide-react';
import { Card } from '../ui';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  available: boolean;
}

const features: Feature[] = [
  {
    id: 'finance',
    title: 'Finance Tracking',
    description:
      'Track your income and expenses, categorize transactions, and visualize your spending patterns.',
    icon: <Wallet className="w-6 h-6" />,
    color: 'text-accent-cyan',
    bgColor: 'bg-accent-cyan/20',
    available: true,
  },
  {
    id: 'workouts',
    title: 'Workout Logging',
    description:
      'Log your exercise routines, track progress, and stay motivated with workout history.',
    icon: <Dumbbell className="w-6 h-6" />,
    color: 'text-accent-violet',
    bgColor: 'bg-accent-violet/20',
    available: false,
  },
  {
    id: 'nutrition',
    title: 'Nutrition Monitoring',
    description:
      'Monitor your food intake, track calories, and maintain a balanced diet effortlessly.',
    icon: <Utensils className="w-6 h-6" />,
    color: 'text-accent-emerald',
    bgColor: 'bg-accent-emerald/20',
    available: false,
  },
  {
    id: 'insights',
    title: 'Smart Insights',
    description:
      'Get personalized insights and recommendations based on your tracking data and habits.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-accent-teal',
    bgColor: 'bg-accent-teal/20',
    available: true,
  },
  {
    id: 'analytics',
    title: 'Visual Analytics',
    description: 'Beautiful charts and graphs to help you understand your progress at a glance.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'text-accent-rose',
    bgColor: 'bg-accent-rose/20',
    available: true,
  },
  {
    id: 'goals',
    title: 'Goal Setting',
    description:
      'Set meaningful goals, track milestones, and celebrate your achievements along the way.',
    icon: <Target className="w-6 h-6" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/20',
    available: false,
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6" data-testid="features-section">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Everything you need to improve
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Kaizen provides all the tools you need to track, analyze, and improve different aspects
            of your life.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              variant="hover"
              className={`relative animate-slide-up animate-delay-${(index % 3) * 100}`}
              data-testid="feature-card"
            >
              {!feature.available && (
                <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-glass-light text-white/50">
                  Coming Soon
                </span>
              )}
              <div
                className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}
              >
                <span className={feature.color}>{feature.icon}</span>
              </div>
              <h3 className="text-lg font-display font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
