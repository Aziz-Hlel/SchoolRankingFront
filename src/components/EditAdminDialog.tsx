
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const editAdminSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters').max(20, 'First name must not exceed 20 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters').max(20, 'Last name must not exceed 20 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type EditAdminFormData = z.infer<typeof editAdminSchema>;

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
  const { toast } = useToast();
  const [firstName, lastName] = admin.name.split(' ');

  const form = useForm<EditAdminFormData>({
    resolver: zodResolver(editAdminSchema),
    defaultValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      email: admin.email,
    },
  });

  const onSubmit = async (data: EditAdminFormData) => {
    try {
      onUpdateAdmin(data);
      toast({
        title: 'Admin updated successfully!',
        description: `${data.firstName} ${data.lastName} has been updated.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update admin. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Admin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
