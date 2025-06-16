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
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { AddAdminDialog } from './AddAdminDialog';
import { EditAdminDialog } from './EditAdminDialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export const AdminManagement: React.FC = () => {
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);

  // Mock data - in a real app, this would come from an API
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@sunriseschool.edu',
      role: 'admin',
      schoolId: 'school-1',
      schoolName: 'Sunrise International School',
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@brightfuture.edu',
      role: 'admin',
      schoolId: 'school-2',
      schoolName: 'Bright Future Academy',
      status: 'active',
      createdAt: '2024-01-20',
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@globalschool.edu',
      role: 'admin',
      schoolId: 'school-3',
      schoolName: 'Global Education Center',
      status: 'inactive',
      createdAt: '2024-02-01',
    }
  ]);

  const handleAddAdmin = (adminData: any) => {
    const newAdmin: Admin = {
      id: `admin-${Date.now()}`,
      name: `${adminData.firstName} ${adminData.lastName}`,
      email: adminData.email,
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAdmins([...admins, newAdmin]);
  };

  const handleUpdateAdmin = (adminData: any) => {
    if (editingAdmin) {
      setAdmins(admins.map(admin =>
        admin.id === editingAdmin.id
          ? { ...admin, name: `${adminData.firstName} ${adminData.lastName}`, email: adminData.email }
          : admin
      ));
      setEditingAdmin(null);
    }
  };

  const handleDeleteAdmin = () => {
    if (deletingAdmin) {
      setAdmins(admins.filter(admin => admin.id !== deletingAdmin.id));
      setDeletingAdmin(null);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold">Admin Management</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Manage school administrators and their permissions
          </p>
        </div>
        <AddAdminDialog onAddAdmin={handleAddAdmin} />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Name</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                <TableHead className="hidden sm:table-cell min-w-[150px]">School</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell className="text-sm">{admin.email}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {admin.schoolName || 'Not assigned'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem
                          onClick={() => setEditingAdmin(admin)}
                          className="flex items-center gap-2 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingAdmin(admin)}
                          className="flex items-center gap-2 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {editingAdmin && (
        <EditAdminDialog
          admin={editingAdmin}
          open={!!editingAdmin}
          onOpenChange={(open) => !open && setEditingAdmin(null)}
          onUpdateAdmin={handleUpdateAdmin}
        />
      )}

      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={handleDeleteAdmin}
        title="Delete Administrator"
        description={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
      />
    </div>
  );
};