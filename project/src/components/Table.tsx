import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TableProps, MedicineRecord } from '../types';
import clsx from 'clsx';

export const Table: React.FC<TableProps> = ({
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Medicine Name', 'Manufacturer', 'Packaged Labels', 'Composition', 'Temperature', 'License Number', 'Batch Number', 'Expiry Date', 'Status'].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((record: MedicineRecord, index: number) => (
            <tr
              key={index}
              className={clsx(
                'hover:bg-gray-50',
                record.status === 'Active' ? 'bg-green-50' : 'bg-red-50'
              )}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.medicineName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.manufacturer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.packagedLabels}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.composition}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.temperature}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.licenseNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.batchNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.status === 'Active' ? record.expiryDate : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between sm:hidden">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, data.length)}</span> of{' '}
              <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => onPageChange(i + 1)}
                  className={clsx(
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    currentPage === i + 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};