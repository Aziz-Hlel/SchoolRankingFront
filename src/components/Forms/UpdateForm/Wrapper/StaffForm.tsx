import AbstractWrapper from './AbstractWrapper'
import { useNavigate } from 'react-router-dom';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolStaffSchema } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import DetachedStaff from '../../DetachedForms/Staff/DetachedStaff';
import type z from 'zod';
import { Form } from '@/components/ui/form';
import NavigationButtons from '../NavigationButton/NavigationButtons';

type SchoolStaff = z.infer<typeof schoolStaffSchema>;


const StaffForm = () => {

    const form = useForm<SchoolStaff>({ resolver: zodResolver(schoolStaffSchema), });

    const mutationFn = (formData: SchoolStaff) => apiService.postThrowable(apiGateway.form.staff.create(), formData);

    const { mutateAsync, isPending } = useMutation({ mutationFn, });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolStaff) => {

        const response = await safeAsyncMutate(mutateAsync, data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }

        navigate('/forms/media');


    };


    return (
        <>
            <AbstractWrapper currentStep={3}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedStaff form={form} />

                        <NavigationButtons currentStep={0} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />

                    </form>
                </Form>
            </AbstractWrapper>
        </>
    )
}

export default StaffForm