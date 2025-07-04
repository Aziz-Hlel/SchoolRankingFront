
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Search } from 'lucide-react';
import type { SchoolPage } from '@/types/SchoolPage';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface SchoolDataTableProps {
  data: SchoolPage[];
  onEdit: (schoolId: string) => void;
  onDelete: (schoolId: string) => void;
}

export const SchoolDataTable: React.FC<SchoolDataTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Define the keys you want to sort by, matching SchoolPage properties
  type SortableColumn = 'name' | 'adminUsername' | 'email' | 'studentCount';

  const [sortBy, setSortBy] = useState<SortableColumn>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredData = data.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.adminUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else {
      if (sortOrder === 'asc') {
        return (aValue as number) - (bValue as number);
      } else {
        return (bValue as number) - (aValue as number);
      }
    }
  });

  const handleSort = (column: SortableColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>

                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('name')}
                >
                  School {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>

                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('adminUsername')}
                >
                  Admin {sortBy === 'adminUsername' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>

                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('studentCount')}
                >
                  Email {sortBy === 'studentCount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </TableHead>

                <TableHead>Phone</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>

              </TableRow>
            </TableHeader >
            <TableBody>

              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No schools found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{school.name}</div>
                        <div className="text-sm text-muted-foreground">{`${school.country}-${school.city} ${school.address}`}</div>
                      </div>
                    </TableCell>
                    <TableCell>{school.adminUsername}</TableCell>
                    <TableCell>{school.email}</TableCell>
                    <TableCell>{school.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge variant={'default'} className={!school.isComplete && "text-white bg-amber-400 "}>
                        {school.isComplete ? 'Complete' : 'Incomplete'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Link to={`./${school.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className=' cursor-pointer'
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        {/* <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(school.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table >
        </div >
      </div >
    </div >
  );
};
