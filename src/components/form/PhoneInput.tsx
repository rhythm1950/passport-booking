import React from 'react';
import { cn } from '../../lib/utils';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function PhoneInput({ className, error, value, onChange, ...props }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Remove all non-digit characters except +
    inputValue = inputValue.replace(/[^\d+]/g, '');
    
    // Ensure +880 prefix
    if (!inputValue.startsWith('+880')) {
      if (inputValue.startsWith('880')) {
        inputValue = '+' + inputValue;
      } else if (inputValue.startsWith('0')) {
        inputValue = '+880' + inputValue.slice(1);
      } else if (inputValue.length > 0 && !inputValue.startsWith('+')) {
        inputValue = '+880' + inputValue;
      }
    }
    
    // Limit length to +880 + 10 digits
    if (inputValue.length > 14) {
      inputValue = inputValue.slice(0, 14);
    }
    
    const newEvent = { ...e, target: { ...e.target, value: inputValue } };
    onChange?.(newEvent);
  };

  return (
    <div>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="+880XXXXXXXXXX"
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}