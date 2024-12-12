import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

interface HumanLoaderProps {
  step: 'uploading' | 'processing' | 'complete';
}

export const HumanLoader: React.FC<HumanLoaderProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {step === 'uploading' && (
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-indigo-600 animate-bounce" />
            <p className="text-lg font-medium text-gray-700">Uploading your file...</p>
          </div>
        )}
        
        {step === 'processing' && (
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            <p className="text-lg font-medium text-gray-700">Processing data...</p>
          </div>
        )}
        
        {step === 'complete' && (
          <div className="flex items-center space-x-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <p className="text-lg font-medium text-gray-700">Almost there...</p>
          </div>
        )}
      </div>
    </div>
  );
};