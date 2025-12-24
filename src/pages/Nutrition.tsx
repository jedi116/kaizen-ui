import { Utensils, Apple, Beef, Wheat, Droplet, Plus, Search, Clock } from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';

// Mock data for placeholder UI
const mockMeals = [
  {
    id: 1,
    name: 'Grilled Chicken Salad',
    meal_type: 'lunch',
    calories: 450,
    protein: 38,
    carbs: 25,
    fat: 22,
    time: '12:30 PM',
    icon: '🥗',
  },
  {
    id: 2,
    name: 'Overnight Oats',
    meal_type: 'breakfast',
    calories: 380,
    protein: 15,
    carbs: 55,
    fat: 12,
    time: '8:00 AM',
    icon: '🥣',
  },
  {
    id: 3,
    name: 'Protein Smoothie',
    meal_type: 'snack',
    calories: 280,
    protein: 30,
    carbs: 20,
    fat: 8,
    time: '3:30 PM',
    icon: '🥤',
  },
  {
    id: 4,
    name: 'Salmon with Veggies',
    meal_type: 'dinner',
    calories: 520,
    protein: 42,
    carbs: 18,
    fat: 28,
    time: '7:00 PM',
    icon: '🍣',
  },
];

const dailyGoals = {
  calories: { current: 1630, goal: 2200 },
  protein: { current: 125, goal: 150 },
  carbs: { current: 118, goal: 250 },
  fat: { current: 70, goal: 80 },
  water: { current: 6, goal: 8 },
};

const quickAddFoods = [
  { name: 'Banana', calories: 105, icon: '🍌' },
  { name: 'Egg', calories: 78, icon: '🥚' },
  { name: 'Chicken Breast', calories: 165, icon: '🍗' },
  { name: 'Rice (1 cup)', calories: 206, icon: '🍚' },
  { name: 'Protein Shake', calories: 120, icon: '🥛' },
  { name: 'Avocado', calories: 234, icon: '🥑' },
];

const MacroProgress = ({
  label,
  current,
  goal,
  color,
  icon,
}: {
  label: string;
  current: number;
  goal: number;
  color: string;
  icon: React.ReactNode;
}) => {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={color}>{icon}</span>
          <span className="text-sm text-white/70">{label}</span>
        </div>
        <span className="text-sm font-medium text-white">
          {current}
          <span className="text-white/50">/{goal}g</span>
        </span>
      </div>
      <div className="h-2 bg-glass-light rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color.replace('text-', 'bg-')}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Nutrition = () => {
  const caloriePercentage = (dailyGoals.calories.current / dailyGoals.calories.goal) * 100;

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
        <Card className="text-center max-w-md mx-4" variant="glow" glowColor="emerald">
          <div className="p-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-emerald to-green-500 flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Nutrition Tracking Coming Soon
            </h2>
            <p className="text-white/60 mb-6">
              We're building comprehensive nutrition tracking. Log meals, track macros, and achieve
              your dietary goals.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="primary" disabled>
                Get Notified When Ready
              </Button>
              <p className="text-xs text-white/40">Expected launch: Q2 2025</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie Ring */}
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Background ring */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-glass-light"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#calorieGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${caloriePercentage * 4.4} 440`}
              />
              <defs>
                <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{dailyGoals.calories.current}</span>
              <span className="text-sm text-white/50">of {dailyGoals.calories.goal} cal</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/60">
            {dailyGoals.calories.goal - dailyGoals.calories.current} calories remaining
          </p>
        </Card>

        {/* Macros */}
        <Card className="p-6 col-span-1 lg:col-span-2">
          <h3 className="font-display font-semibold text-white mb-4">Macro Nutrients</h3>
          <div className="space-y-4">
            <MacroProgress
              label="Protein"
              current={dailyGoals.protein.current}
              goal={dailyGoals.protein.goal}
              color="text-accent-rose"
              icon={<Beef className="w-4 h-4" />}
            />
            <MacroProgress
              label="Carbs"
              current={dailyGoals.carbs.current}
              goal={dailyGoals.carbs.goal}
              color="text-accent-cyan"
              icon={<Wheat className="w-4 h-4" />}
            />
            <MacroProgress
              label="Fat"
              current={dailyGoals.fat.current}
              goal={dailyGoals.fat.goal}
              color="text-accent-violet"
              icon={<Apple className="w-4 h-4" />}
            />
            <MacroProgress
              label="Water (glasses)"
              current={dailyGoals.water.current}
              goal={dailyGoals.water.goal}
              color="text-blue-400"
              icon={<Droplet className="w-4 h-4" />}
            />
          </div>
        </Card>
      </div>

      {/* Quick Add */}
      <div>
        <h3 className="section-title">Quick Add</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickAddFoods.map((food) => (
            <Card key={food.name} variant="hover" className="p-4 text-center cursor-pointer">
              <div className="text-3xl mb-2">{food.icon}</div>
              <p className="text-sm font-medium text-white">{food.name}</p>
              <p className="text-xs text-white/50">{food.calories} cal</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Today's Meals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">Today's Meals</h3>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" leftIcon={<Search className="w-4 h-4" />}>
              Search Food
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Log Meal
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {mockMeals.map((meal) => (
            <Card key={meal.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 flex items-center justify-center text-2xl">
                    {meal.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{meal.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="food" className="capitalize">
                        {meal.meal_type}
                      </Badge>
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {meal.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-accent-emerald">{meal.calories} cal</p>
                  <p className="text-xs text-white/50 mt-1">
                    P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
