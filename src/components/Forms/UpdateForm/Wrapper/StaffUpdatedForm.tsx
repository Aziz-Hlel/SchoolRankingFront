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
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';

type SchoolStaff = z.infer<typeof schoolStaffSchema>;


const StaffUpdatedForm = () => {

    const { detailedSchool } = useDetailedSchool();
    const school = detailedSchool!;
    const schoolId = school.schoolGeneral!.id

    const form = useForm<SchoolStaff>({
        resolver: zodResolver(schoolStaffSchema),
        defaultValues: school.schoolStaff
    });

    const mutationFn = (formData: SchoolStaff) => apiService.putThrowable(apiGateway.form.staff.update(schoolId, school.schoolStaff!.id), formData);

    const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queryKey: ["school", "detailed", schoolId] });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolStaff) => {

        const response = await safeAsyncMutate(data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }
        navigate('../../');


    };
    console.log("staff", form.formState.errors)

    return (
        <>
            <AbstractWrapper currentStep={3}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedStaff form={form} />

                        <NavigationButtons cancelPath="../../" currentStep={0} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />

                    </form>
                </Form>
            </AbstractWrapper>
        </>
    )
}

export default StaffUpdatedForm;