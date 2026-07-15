import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-brand-cream/80 backdrop-blur-sm z-50">
        <Loader2 className="w-12 h-12 animate-spin text-brand-burgundy" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-brand-burgundy" />
    </div>
  );
}
