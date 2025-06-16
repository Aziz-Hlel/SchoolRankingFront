
import React, { useState } from 'react';
import { AddAdminDialog } from './AddAdminDialog';
import { EditAdminDialog } from './EditAdminDialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { AdminDataTable } from './AdminDataTable';

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
          <h2 className="text-xl lg:text-2xl font-bold">Admins table</h2>
        </div>

        <AddAdminDialog onAddAdmin={handleAddAdmin} />

      </div>

      <AdminDataTable
        data={admins}
        onEdit={setEditingAdmin}
        onDelete={setDeletingAdmin}
      />

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
