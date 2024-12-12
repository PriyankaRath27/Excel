export interface MedicineRecord {
  medicineName: string;
  manufacturer: string;
  packagedLabels: string;
  composition: string;
  temperature: string;
  licenseNumber: string;
  batchNumber: string;
  expiryDate?: string;
  status: 'Active' | 'Inactive';
}

export interface TableProps {
  data: MedicineRecord[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}