import React from 'react';
import { cn } from '../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
}

export function Card({ className, gradient = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm",
        gradient && "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-b before:from-zinc-800/20 before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
