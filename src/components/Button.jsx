import React from 'react';
import { cn } from '../utils/cn';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const variants = {
    primary: 'bg-brand-burgundy text-brand-cream hover:bg-brand-burgundy/90',
    secondary: 'bg-brand-olive text-brand-cream hover:bg-brand-olive/90',
    outline: 'border-2 border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-brand-cream',
    ghost: 'hover:bg-brand-burgundy/10 text-brand-burgundy'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg font-semibold'
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-cream disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
