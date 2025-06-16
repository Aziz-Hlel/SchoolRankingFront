import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { AddAdminDialog } from './AddAdminDialog';
import { EditAdminDialog } from './EditAdminDialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  schoolId?: string;
  schoolName?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockAdmins: Admin[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@school1.edu',
    role: 'admin',
    schoolId: '1',
    schoolName: 'Lincoln Elementary',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@school2.edu',
    role: 'admin',
    schoolId: '2',
    schoolName: 'Washington High School',
    status: 'active',
    createdAt: '2024-02-20',
  },
];

export const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.schoolName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = (adminData: any) => {
    const newAdmin: Admin = {
      id: (admins.length + 1).toString(),
      name: `${adminData.firstName} ${adminData.lastName}`,
      email: adminData.email,
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAdmins([...admins, newAdmin]);
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
  };

  const handleUpdateAdmin = (adminData: any) => {
    if (editingAdmin) {
      const updatedAdmin: Admin = {
        ...editingAdmin,
        name: `${adminData.firstName} ${adminData.lastName}`,
        email: adminData.email,
      };
      setAdmins(admins.map(admin => admin.id === editingAdmin.id ? updatedAdmin : admin));
      setEditingAdmin(null);
    }
  };

  const handleDeleteAdmin = () => {
    if (deletingAdminId) {
      setAdmins(admins.filter(admin => admin.id !== deletingAdminId));
      setDeletingAdminId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Management</h2>
          <p className="text-muted-foreground">Manage all school administrators</p>
        </div>
        <AddAdminDialog onAddAdmin={handleAddAdmin} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administrators</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search admins..."
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.schoolName}</TableCell>
                  <TableCell>
                    <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{admin.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAdmin(admin)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletingAdminId(admin.id)}
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

      {editingAdmin && (
        <EditAdminDialog
          admin={editingAdmin}
          open={!!editingAdmin}
          onOpenChange={(open) => !open && setEditingAdmin(null)}
          onUpdateAdmin={handleUpdateAdmin}
        />
      )}

      <DeleteConfirmationDialog
        open={!!deletingAdminId}
        onOpenChange={(open) => !open && setDeletingAdminId(null)}
        onConfirm={handleDeleteAdmin}
        title="Delete Administrator"
        description="Are you sure you want to delete this administrator? This action cannot be undone."
      />
    </div>
  );
};
