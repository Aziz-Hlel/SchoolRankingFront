
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { SchoolDataTable } from './SchoolDataTable';

interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  studentCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockSchools: School[] = [
  {
    id: '1',
    name: 'Lincoln Elementary School',
    address: '123 Main St, Springfield, IL',
    phone: '(555) 123-4567',
    email: 'info@lincoln.edu',
    principalName: 'Dr. Mary Wilson',
    studentCount: 450,
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Washington High School',
    address: '456 Oak Ave, Springfield, IL',
    phone: '(555) 987-6543',
    email: 'admin@washington.edu',
    principalName: 'Mr. Robert Brown',
    studentCount: 1200,
    status: 'active',
    createdAt: '2024-01-15',
  },
];

export const SchoolManagement: React.FC = () => {
  const [schools, setSchools] = useState<School[]>(mockSchools);

  const handleAddSchool = () => {
    console.log('Add new school');
  };

  const handleEditSchool = (id: string) => {
    console.log('Edit school:', id);
  };

  const handleDeleteSchool = (id: string) => {
    console.log('Delete school:', id);
    setSchools(schools.filter(school => school.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Schools table</h2>
        </div>

        <Button onClick={handleAddSchool} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add School
        </Button>
      </div>

      
      <Card>
        <CardHeader>
          <CardTitle>Schools</CardTitle>
        </CardHeader>
        <CardContent>
          <SchoolDataTable
            data={schools}
            onEdit={handleEditSchool}
            onDelete={handleDeleteSchool}
          />
        </CardContent>
      </Card>
    </div>
  );
};
