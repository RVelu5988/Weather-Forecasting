import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8 my-8">
      {/* Top Main Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {/* City header */}
          <div className="space-y-2">
            <div className="h-10 w-64 bg-white/5 rounded-lg" />
            <div className="h-5 w-40 bg-white/5 rounded" />
          </div>

          {/* Hero Temp */}
          <div className="flex items-end gap-6 my-6">
            <div className="h-28 w-44 bg-white/5 rounded-2xl" />
            <div className="space-y-3 mb-2">
              <div className="h-6 w-32 bg-white/5 rounded" />
              <div className="h-4 w-48 bg-white/5 rounded" />
            </div>
          </div>

          {/* Briefing */}
          <div className="h-24 w-full bg-white/5 rounded-r-lg border-l-2 border-white/20" />
        </div>

        <div className="lg:col-span-5">
          <div className="h-64 w-full bg-white/5 rounded-2xl p-6 space-y-4">
            <div className="h-4 w-28 bg-white/10 rounded" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-12 bg-white/5 rounded" />
              <div className="h-12 bg-white/5 rounded" />
              <div className="h-12 bg-white/5 rounded" />
              <div className="h-12 bg-white/5 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* 7 Day forecast skeleton */}
      <div className="h-32 w-full bg-white/5 rounded-2xl" />
    </div>
  );
};
