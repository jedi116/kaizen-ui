import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/10 via-transparent to-accent-cyan/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-violet/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass-light border border-glass-border mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-accent-cyan" />
          <span className="text-sm text-white/70">
            Your personal improvement journey starts here
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-slide-up">
          Master Your Life with{' '}
          <span className="bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-rose bg-clip-text text-transparent">
            Kaizen
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto animate-slide-up animate-delay-100">
          Track your finances, workouts, and nutrition. Build better habits and achieve your goals
          with continuous small improvements.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-200">
          <Link to="/register">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="min-w-[200px]"
            >
              Get Started Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="min-w-[200px]">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in animate-delay-300">
          <div>
            <p className="text-3xl font-bold text-white">100%</p>
            <p className="text-sm text-white/50">Free to use</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-sm text-white/50">Life modules</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="text-sm text-white/50">Always available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
