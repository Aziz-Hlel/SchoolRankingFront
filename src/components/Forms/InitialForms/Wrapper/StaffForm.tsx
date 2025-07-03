import AbstractWrapper from './AbstractWrapper'
import { useNavigate } from 'react-router-dom';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolStaffSchema } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, type FieldErrors } from 'react-hook-form';
import DetachedStaff from '../../DetachedForms/Staff/DetachedStaff';
import type z from 'zod';
import { Form } from '@/components/ui/form';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useEffect } from 'react';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';

type SchoolStaff = z.infer<typeof schoolStaffSchema>;


const StaffForm = () => {

    const form = useForm<SchoolStaff>({ resolver: zodResolver(schoolStaffSchema), });
    const { detailedSchool } = useDetailedSchool();

    const mutationFn = (formData: SchoolStaff) => apiService.postThrowable(apiGateway.form.staff.create(detailedSchool!.schoolGeneral!.id), formData);

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

    useEffect(() => {
        console.log("errors : ", form.formState.errors)
    }, [form.formState.errors])


    const onError = (errors: FieldErrors<SchoolStaff>) => {
        console.error("Form validation errors:", errors);
    };


    return (
        <>
            <AbstractWrapper currentStep={3}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedStaff form={form} />

                        <NavigationButtons currentStep={0} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />

                    </form>
                </Form>
            </AbstractWrapper>
        </>
    )
}

export default StaffForm