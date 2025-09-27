import React from 'react';
import { cn } from '../../lib/utils';

type Status = 'initial' | 'pre_booked' | 'BAGGED' | 'CLOSED' | 'RECEIVED';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  initial: {
    label: 'Initial',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  pre_booked: {
    label: 'Pre-booked',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  BAGGED: {
    label: 'Bagged',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  RECEIVED: {
    label: 'Received',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}