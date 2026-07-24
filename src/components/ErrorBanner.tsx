import React from 'react';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
  onResetToDefault: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onRetry,
  onResetToDefault,
}) => {
  return (
    <div className="bg-red-950/30 border border-red-500/20 backdrop-blur-md rounded-2xl p-8 my-8 text-center max-w-xl mx-auto shadow-2xl">
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-serif italic text-white mb-2">City Not Found</h3>

      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
        {message || 'City not found. Please try another search.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Search
        </button>

        <button
          onClick={onResetToDefault}
          className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 active:scale-95"
        >
          <Search className="w-3.5 h-3.5" />
          Load Default City (Zurich)
        </button>
      </div>
    </div>
  );
};
