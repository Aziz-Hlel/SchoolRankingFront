
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.principalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">School Management</h2>
          <p className="text-muted-foreground">Manage all schools in the system</p>
        </div>
        <Button onClick={handleAddSchool} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add School
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schools</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School Name</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{school.name}</div>
                      <div className="text-sm text-muted-foreground">{school.address}</div>
                    </div>
                  </TableCell>
                  <TableCell>{school.principalName}</TableCell>
                  <TableCell>{school.studentCount.toLocaleString()}</TableCell>
                  <TableCell>{school.phone}</TableCell>
                  <TableCell>
                    <Badge variant={school.status === 'active' ? 'default' : 'secondary'}>
                      {school.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditSchool(school.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSchool(school.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
