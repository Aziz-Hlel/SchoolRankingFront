
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { apiService } from '@/service/Api/apiService';
import apiGateway from '@/service/Api/apiGateway';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ open, onOpenChange, onConfirm, title, description, }) => {


  // const mutationFn = () => apiService.deleteThrowable(apiGateway.user.delete(""));
  //   const queryClient = useQueryClient();

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: mutationFn,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'], }),

  // })
  // const deleteUser = async () => {


  // }


  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
