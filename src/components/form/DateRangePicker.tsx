import React from 'react';
import { cn } from '../../lib/utils';

interface DateRangePickerProps {
  from?: string;
  to?: string;
  onFromChange: (date: string) => void;
  onToChange: (date: string) => void;
  className?: string;
}

export function DateRangePicker({ 
  from, 
  to, 
  onFromChange, 
  onToChange, 
  className 
}: DateRangePickerProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex-1">
        <label htmlFor="date-from" className="block text-sm font-medium text-gray-700 mb-1">
          From Date
        </label>
        <input
          id="date-from"
          type="date"
          value={from || ''}
          onChange={(e) => onFromChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="date-to" className="block text-sm font-medium text-gray-700 mb-1">
          To Date
        </label>
        <input
          id="date-to"
          type="date"
          value={to || ''}
          onChange={(e) => onToChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}