import React from 'react';
import { cn } from '../utils/cn'; // Assuming you might add a utility like clsx/tailwind-merge

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-black',
          {
            'bg-white text-black hover:bg-gray-100 focus-visible:ring-white': variant === 'primary',
            'bg-zinc-800 text-white hover:bg-zinc-700 focus-visible:ring-zinc-500': variant === 'secondary',
            'border border-zinc-700 bg-transparent hover:bg-zinc-800 focus-visible:ring-zinc-500 text-zinc-100': variant === 'outline',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-8 text-base': size === 'md',
            'h-14 px-10 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
