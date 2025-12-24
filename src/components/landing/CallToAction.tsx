import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui';

const CallToAction = () => {
  return (
    <section className="py-24 px-6" data-testid="cta-section">
      <div className="max-w-4xl mx-auto">
        <div className="relative glass-card p-12 rounded-3xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-violet/20 rounded-full blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-violet mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to transform your life?
            </h2>

            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Join Kaizen today and start your journey of continuous improvement. Small steps lead
              to big changes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="min-w-[200px]"
                >
                  Start for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="lg">
                  Already have an account?
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-sm text-white/40 mt-8">
          No credit card required. Start improving today.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
