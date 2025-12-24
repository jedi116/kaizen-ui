import { Hero, Features, CallToAction } from '../components/landing';

const Landing = () => {
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
              <span className="text-xl font-bold text-white">K</span>
            </div>
            <span className="text-xl font-display font-bold text-white">Kaizen</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Hero />
        <Features />
        <CallToAction />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-glass-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Kaizen. Built for continuous improvement.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
