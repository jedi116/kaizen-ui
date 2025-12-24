import { filterOptions } from '../../config/finance.config';
import type { FilterType } from '../../config/finance.config';
import DateRangeFilter from './DateRangeFilter';

export interface FilterBarProps {
  filterType: FilterType;
  onFilterTypeChange: (type: FilterType) => void;
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
  onClearDateRange: () => void;
  showAggregation: boolean;
  onToggleAggregation: () => void;
}

const FilterBar = ({
  filterType,
  onFilterTypeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearDateRange,
  showAggregation,
  onToggleAggregation,
}: FilterBarProps) => {
  return (
    <div
      className="flex flex-wrap items-center gap-4 p-3 glass-card rounded-xl"
      data-testid="filter-bar"
    >
      {/* Type Filter */}
      <div className="flex gap-1 p-1 bg-glass-light rounded-lg">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterTypeChange(option.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
              filterType === option.value ? option.activeClass : 'text-white/60 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onClear={onClearDateRange}
      />

      {/* Aggregation Toggle */}
      <button
        onClick={onToggleAggregation}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          showAggregation
            ? 'bg-accent-violet/30 text-accent-violet'
            : 'bg-glass-light text-white/60 hover:text-white'
        }`}
      >
        {showAggregation ? 'Hide' : 'Show'} Aggregation
      </button>
    </div>
  );
};

export default FilterBar;
