import { Dumbbell, Timer, Flame, Plus, Clock, Zap } from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';

// Mock data for placeholder UI
const mockWorkouts = [
  {
    id: 1,
    name: 'Morning Strength',
    type: 'Strength Training',
    duration: 45,
    calories: 320,
    date: '2025-01-15',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 10, weight: 135 },
      { name: 'Squats', sets: 4, reps: 12, weight: 185 },
      { name: 'Deadlift', sets: 3, reps: 8, weight: 225 },
    ],
  },
  {
    id: 2,
    name: 'HIIT Cardio',
    type: 'Cardio',
    duration: 30,
    calories: 400,
    date: '2025-01-14',
    exercises: [
      { name: 'Burpees', sets: 3, reps: 15 },
      { name: 'Mountain Climbers', sets: 3, reps: 20 },
      { name: 'Jump Squats', sets: 3, reps: 15 },
    ],
  },
  {
    id: 3,
    name: 'Upper Body',
    type: 'Strength Training',
    duration: 50,
    calories: 280,
    date: '2025-01-13',
    exercises: [
      { name: 'Pull Ups', sets: 4, reps: 8 },
      { name: 'Shoulder Press', sets: 4, reps: 10, weight: 95 },
      { name: 'Bicep Curls', sets: 3, reps: 12, weight: 30 },
    ],
  },
];

const workoutTemplates = [
  { name: 'Push Day', exercises: 6, duration: '45 min', icon: '💪' },
  { name: 'Pull Day', exercises: 5, duration: '40 min', icon: '🏋️' },
  { name: 'Leg Day', exercises: 6, duration: '50 min', icon: '🦵' },
  { name: 'HIIT', exercises: 8, duration: '30 min', icon: '🔥' },
];

const weeklyStats = {
  workouts: 5,
  totalMinutes: 220,
  caloriesBurned: 1840,
  streak: 12,
};

const Workouts = () => {
  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
        <Card className="text-center max-w-md mx-4" variant="glow" glowColor="violet">
          <div className="p-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-violet to-purple-500 flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Workout Tracking Coming Soon
            </h2>
            <p className="text-white/60 mb-6">
              We're building powerful workout tracking features. Log exercises, track progress, and
              crush your fitness goals.
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

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-violet/20">
              <Dumbbell className="w-5 h-5 text-accent-violet" />
            </div>
            <div>
              <p className="text-xs text-white/50">This Week</p>
              <p className="text-lg font-semibold text-white">{weeklyStats.workouts} workouts</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-cyan/20">
              <Timer className="w-5 h-5 text-accent-cyan" />
            </div>
            <div>
              <p className="text-xs text-white/50">Total Time</p>
              <p className="text-lg font-semibold text-white">{weeklyStats.totalMinutes} min</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-rose/20">
              <Flame className="w-5 h-5 text-accent-rose" />
            </div>
            <div>
              <p className="text-xs text-white/50">Calories Burned</p>
              <p className="text-lg font-semibold text-white">{weeklyStats.caloriesBurned}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-emerald/20">
              <Zap className="w-5 h-5 text-accent-emerald" />
            </div>
            <div>
              <p className="text-xs text-white/50">Streak</p>
              <p className="text-lg font-semibold text-white">{weeklyStats.streak} days</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Start */}
      <div>
        <h3 className="section-title">Quick Start</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {workoutTemplates.map((template) => (
            <Card key={template.name} variant="hover" className="cursor-pointer p-4">
              <div className="text-3xl mb-3">{template.icon}</div>
              <h4 className="font-medium text-white">{template.name}</h4>
              <p className="text-xs text-white/50 mt-1">
                {template.exercises} exercises • {template.duration}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title mb-0">Recent Workouts</h3>
          <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Log Workout
          </Button>
        </div>
        <div className="space-y-3">
          {mockWorkouts.map((workout) => (
            <Card key={workout.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-violet/20 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-accent-violet" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{workout.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="workout">{workout.type}</Badge>
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {workout.duration} min
                      </span>
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {workout.calories} cal
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/50">{workout.date}</p>
                  <p className="text-xs text-white/40 mt-1">{workout.exercises.length} exercises</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
