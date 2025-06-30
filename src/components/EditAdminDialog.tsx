
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Admin } from '@/types/Admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/service/Api/apiService';
import apiGateway from '@/service/Api/apiGateway';
import { toast } from "sonner"
import { CheckLine } from 'lucide-react';
import { AlertToast } from '@/hooks/useToast2';
import safeAsyncMutate from '@/utils/safeAsyncMutate';


const editAdminSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters').max(20, 'First name must not exceed 20 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters').max(20, 'Last name must not exceed 20 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type EditAdminFormData = z.infer<typeof editAdminSchema>;


interface EditAdminDialogProps {
  admin: Admin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateAdmin: (adminData: EditAdminFormData) => void;
}

export const EditAdminDialog: React.FC<EditAdminDialogProps> = ({
  admin,
  open,
  onOpenChange,
  onUpdateAdmin
}) => {

  const form = useForm<EditAdminFormData>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
    },
  });

  const queryClient = useQueryClient();

  const mutationFn = (data: EditAdminFormData) => apiService.putThrowable<Admin>(apiGateway.user.update(admin.id), data);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'], }),

  })

  const onSubmit = async (data: EditAdminFormData) => {



    const response = await safeAsyncMutate(mutateAsync, data);

    if (!response.success) {
      toast("Failed to edit user");
      return
    }

    AlertToast({ title: "User has been edited successfully", description: "User has been edited successfully", icon: < CheckLine /> })
    onOpenChange(false);


  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle>Edit Administrator</DialogTitle>
          <DialogDescription>
            Update the administrator's information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className=' cursor-not-allowed'>
                      <Input type="email" placeholder="Enter email address" {...field} disabled  readOnly />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>Update Admin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
