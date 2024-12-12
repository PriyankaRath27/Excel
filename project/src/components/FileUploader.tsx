import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(xls|xlsx)$/i)) {
      alert('Please select a valid Excel file (.xls or .xlsx)');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    onFileUpload(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <Upload className="w-12 h-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">Upload Excel File</h3>
      <p className="mt-1 text-sm text-gray-500">XLS or XLSX file (max 5MB)</p>
      <div className="mt-4">
        <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Choose File
          <input
            ref={fileInputRef}
            type="file"
            accept=".xls,.xlsx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Required columns:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Medicine Name</li>
          <li>Manufacturer</li>
          <li>License Number</li>
          <li>Batch Number</li>
          <li>Status (Active/Inactive)</li>
          <li>Expiry Date (required for Active medicines)</li>
        </ul>
      </div>
    </div>
  );
};