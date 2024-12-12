import * as XLSX from 'xlsx';
import type { MedicineRecord } from '../types';

const normalizeColumnName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '');
};

const mapExcelRowToMedicineRecord = (row: any): MedicineRecord => {
  // Map Excel columns to our data structure, handling different possible column names
  return {
    medicineName: row['Medicine Name'] || row['MedicineName'] || row['MEDICINE NAME'] || '',
    manufacturer: row['Manufacturer'] || row['MANUFACTURER'] || '',
    packagedLabels: row['Packaged Labels'] || row['PackagedLabels'] || row['PACKAGED LABELS'] || '',
    composition: row['Composition'] || row['COMPOSITION'] || '',
    temperature: row['Temperature'] || row['TEMPERATURE'] || '',
    licenseNumber: row['License Number'] || row['LicenseNumber'] || row['LICENSE NUMBER'] || '',
    batchNumber: row['Batch Number'] || row['BatchNumber'] || row['BATCH NUMBER'] || '',
    expiryDate: row['Expiry Date'] || row['ExpiryDate'] || row['EXPIRY DATE'] || '',
    status: (row['Status'] || row['STATUS'] || '').toLowerCase() === 'active' ? 'Active' : 'Inactive'
  };
};

const validateMedicineRecord = (record: MedicineRecord): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!record.medicineName) errors.push('Medicine Name is required');
  if (!record.manufacturer) errors.push('Manufacturer is required');
  if (!record.licenseNumber) errors.push('License Number is required');
  if (!record.batchNumber) errors.push('Batch Number is required');
  if (!['Active', 'Inactive'].includes(record.status)) errors.push('Status must be Active or Inactive');
  
  // Validate expiry date if status is Active
  if (record.status === 'Active' && !record.expiryDate) {
    errors.push('Expiry Date is required for Active medicines');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const parseXLSFile = async (file: File): Promise<MedicineRecord[]> => {
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    
    if (!workbook.SheetNames.length) {
      throw new Error('Excel file is empty');
    }

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    if (!rawData.length) {
      throw new Error('No data found in the Excel file');
    }

    const records: MedicineRecord[] = [];
    const validationErrors: { row: number; errors: string[] }[] = [];

    rawData.forEach((row: any, index: number) => {
      try {
        const record = mapExcelRowToMedicineRecord(row);
        const validation = validateMedicineRecord(record);
        
        if (validation.isValid) {
          records.push(record);
        } else {
          validationErrors.push({
            row: index + 2, // Add 2 to account for header row and 0-based index
            errors: validation.errors
          });
        }
      } catch (error) {
        validationErrors.push({
          row: index + 2,
          errors: ['Invalid data format']
        });
      }
    });

    if (validationErrors.length > 0) {
      // Only log validation errors if they exist
      console.error('Validation errors:', validationErrors);
      
      if (records.length === 0) {
        throw new Error(
          'No valid records found in the Excel file. Please check the following errors:\n' +
          validationErrors.map(({ row, errors }) => 
            `Row ${row}: ${errors.join(', ')}`
          ).join('\n')
        );
      }
    }

    if (records.length === 0) {
      throw new Error('No valid records found in the Excel file');
    }

    return records;
  } catch (error) {
    console.error('Error parsing XLS file:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to parse XLS file');
  }
};