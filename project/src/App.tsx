import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Table } from './components/Table';
import { FileUploader } from './components/FileUploader';
import { HumanLoader } from './components/HumanLoader';
import { useLoadingSteps } from './hooks/useLoadingSteps';
import { parseXLSFile } from './utils/xlsParser';
import type { MedicineRecord } from './types';

function App() {
  const [data, setData] = useState<MedicineRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingStep = useLoadingSteps(loading);
  const itemsPerPage = 10;

  const handleXLSUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      // Artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const jsonData = await parseXLSFile(file);
      if (jsonData.length === 0) {
        throw new Error('No valid data found in the file');
      }
      setData(jsonData);
      setCurrentPage(1);
    } catch (err) {
      setData([]);
      setError(err instanceof Error ? err.message : 'Error processing file');
      console.error('Error processing XLS file:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setData([]);
    setError(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onRefresh={handleRefresh} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {loading ? (
          <div className="mt-8">
            <HumanLoader step={loadingStep} />
          </div>
        ) : error ? (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          </div>
        ) : data.length > 0 ? (
          <div className="mt-8">
            <Table
              data={data}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <div className="mt-8">
            <FileUploader onFileUpload={handleXLSUpload} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;