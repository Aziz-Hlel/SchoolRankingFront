
import { useState, } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckLine, Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/service/Api/apiService';
import apiGateway from '@/service/Api/apiGateway';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { AlertToast } from '@/hooks/useToast2';

const addAdminSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters').max(20, 'First name must not exceed 20 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters').max(20, 'Last name must not exceed 20 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],

})
  ;

type AddAdminFormData = z.infer<typeof addAdminSchema>;


export const AddAdminDialog = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const addAdmin = (form: AddAdminFormData) => apiService.post(apiGateway.user.add, form)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addAdmin,

    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admins'], }); console.log("Admin added successfully") },
  })

  const form = useForm<AddAdminFormData>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: AddAdminFormData) => {

    const response = await safeAsyncMutate(mutateAsync, data);

    if (!response.success) {
      console.log(response)
      if (response.status === 409)
        form.setError("email", { message: "Email already exists" });
      AlertToast({ title: "Failed to add admin", description: "Failed to add admin", icon: < CheckLine /> })
      return
    }

    AlertToast({ title: "Admin has been added successfully", description: "Admin has been added successfully", icon: < CheckLine /> })

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Administrator</DialogTitle>
          <DialogDescription>
            Create a new administrator account for a school.
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>Add Admin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
