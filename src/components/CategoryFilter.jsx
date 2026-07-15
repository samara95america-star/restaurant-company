import React from 'react';
import { cn } from '../utils/cn';

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeCategory === category
              ? "bg-brand-burgundy text-brand-cream"
              : "bg-brand-white text-brand-charcoal hover:bg-brand-burgundy/10"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
