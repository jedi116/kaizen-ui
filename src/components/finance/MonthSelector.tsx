import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState, useMemo } from 'react';

interface MonthSelectorProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const MonthSelector = ({ selectedMonth, onMonthChange }: MonthSelectorProps) => {
  const [showPresets, setShowPresets] = useState(false);

  const formattedMonth = useMemo(() => {
    return selectedMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [selectedMonth]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onMonthChange(newDate);
  };

  const selectPreset = (preset: 'this' | 'last' | 'last3') => {
    const now = new Date();
    switch (preset) {
      case 'this':
        onMonthChange(new Date(now.getFullYear(), now.getMonth(), 1));
        break;
      case 'last':
        onMonthChange(new Date(now.getFullYear(), now.getMonth() - 1, 1));
        break;
      case 'last3':
        onMonthChange(new Date(now.getFullYear(), now.getMonth() - 2, 1));
        break;
    }
    setShowPresets(false);
  };

  const isCurrentMonth = useMemo(() => {
    const now = new Date();
    return (
      selectedMonth.getMonth() === now.getMonth() &&
      selectedMonth.getFullYear() === now.getFullYear()
    );
  }, [selectedMonth]);

  return (
    <div className="flex items-center gap-4" data-testid="month-selector">
      {/* Navigation */}
      <div className="flex items-center gap-2 p-1 glass-card rounded-xl">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-glass-white transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="px-4 py-1.5 min-w-[160px] text-center">
          <span className="font-medium text-white">{formattedMonth}</span>
        </div>

        <button
          onClick={() => navigateMonth('next')}
          disabled={isCurrentMonth}
          className={`p-2 rounded-lg transition-colors ${
            isCurrentMonth
              ? 'text-white/20 cursor-not-allowed'
              : 'text-white/60 hover:text-white hover:bg-glass-white'
          }`}
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Presets */}
      <div className="relative">
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg text-sm text-white/70 hover:text-white transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Quick Select
        </button>

        {showPresets && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowPresets(false)} />
            <div className="absolute left-0 top-full mt-2 w-44 glass-card p-1 z-20">
              <button
                onClick={() => selectPreset('this')}
                className="w-full px-3 py-2 text-left text-sm rounded-lg text-white/70 hover:text-white hover:bg-glass-white transition-colors"
              >
                This Month
              </button>
              <button
                onClick={() => selectPreset('last')}
                className="w-full px-3 py-2 text-left text-sm rounded-lg text-white/70 hover:text-white hover:bg-glass-white transition-colors"
              >
                Last Month
              </button>
              <button
                onClick={() => selectPreset('last3')}
                className="w-full px-3 py-2 text-left text-sm rounded-lg text-white/70 hover:text-white hover:bg-glass-white transition-colors"
              >
                Last 3 Months
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MonthSelector;
