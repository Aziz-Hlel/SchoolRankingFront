
import React, { useState } from 'react';
import { AddAdminDialog } from './AddAdminDialog';
import { EditAdminDialog } from './EditAdminDialog';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { AdminDataTable } from './AdminDataTable';
import useApiQuery from '@/hooks/useApiQuery';
import apiGateway from '@/service/Api/apiGateway';
import type { Admin, AdminPage } from '@/types/Admin';
import { PAGES } from '@/data/pages';
import { useChangePage } from '@/hooks/useChangePage';



export const AdminManagement: React.FC = () => {

  useChangePage(PAGES.admins);

  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);
  const { data } = useApiQuery<AdminPage>({
    url: apiGateway.user.getPageUser,
    queryParams: { page: 1, size: 20 },
    queryKey: ['admins'],
    options: { fetchOnMount: true, config: { params: { page: 1, size: 20 } } },
  });

  const admins = data?.data.content


  const handleUpdateAdmin = (adminData: any) => {
    // if (editingAdmin) {
    //   setAdmins(admins.map(admin =>
    //     admin.id === editingAdmin.id
    //       ? { ...admin, name: `${adminData.firstName} ${adminData.lastName}`, email: adminData.email }
    //       : admin
    //   ));
    //   setEditingAdmin(null);
    // }
  };

  const handleDeleteAdmin = () => {
    // if (deletingAdmin) {
    //   setAdmins(admins.filter(admin => admin.id !== deletingAdmin.id));
    //   setDeletingAdmin(null);
    // }
  };

  if (!admins) return <>loading ...</>

  return (
    <div className="space-y-4 lg:space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-xl lg:text-2xl font-bold">Admins table</h2>
        </div>

        <AddAdminDialog />

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
        description={`Are you sure you want to delete ${deletingAdmin?.username}? This action cannot be undone.`}
      />

    </div>
  );
};
