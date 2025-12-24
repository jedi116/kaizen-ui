import { X } from 'lucide-react';
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
  onClearAllFilters: () => void;
}

const FilterBar = ({
  filterType,
  onFilterTypeChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearDateRange,
  onClearAllFilters,
}: FilterBarProps) => {
  // Check if any filters are active
  const hasActiveFilters = filterType !== 'all' || startDate !== null || endDate !== null;

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

      {/* Clear All Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearAllFilters}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-rose/20 text-accent-rose hover:bg-accent-rose/30 transition-all"
          data-testid="clear-all-filters"
        >
          <X className="w-3 h-3" />
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;
