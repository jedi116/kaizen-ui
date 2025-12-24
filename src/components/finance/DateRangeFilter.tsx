import { Input } from '../ui';

export interface DateRangeFilterProps {
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
  onClear: () => void;
}

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
}: DateRangeFilterProps) => {
  const hasDateRange = startDate || endDate;

  return (
    <div className="flex items-center gap-3" data-testid="date-range-filter">
      <div className="flex items-center gap-2">
        <Input
          type="date"
          value={startDate || ''}
          onChange={(e) => onStartDateChange(e.target.value || null)}
          className="w-36 text-sm"
          placeholder="Start date"
        />
        <span className="text-white/50">to</span>
        <Input
          type="date"
          value={endDate || ''}
          onChange={(e) => onEndDateChange(e.target.value || null)}
          className="w-36 text-sm"
          placeholder="End date"
        />
      </div>
      {hasDateRange && (
        <button
          onClick={onClear}
          className="text-xs text-white/50 hover:text-white transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default DateRangeFilter;
