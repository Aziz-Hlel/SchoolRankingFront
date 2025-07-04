import { Form } from '@/components/ui/form';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolFacilitiesSchema } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type z from 'zod';
import DetachedFacilities from '../../DetachedForms/Facilities/DetachedFacilities';
import AbstractWrapper from './AbstractWrapper';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';

export type SchoolFacilitiesData = z.infer<typeof schoolFacilitiesSchema>;


const FacilitiesUpdatedForm = () => {

    const { detailedSchool } = useDetailedSchool();
    const school = detailedSchool!;
    const schoolId = school.schoolGeneral!.id

    const form = useForm<SchoolFacilitiesData>({
        resolver: zodResolver(schoolFacilitiesSchema),
        defaultValues: school.schoolFacilities
    });

    const mutationFn = (payload: SchoolFacilitiesData) => apiService.putThrowable(apiGateway.form.facilities.update(schoolId, school.schoolFacilities!.id), payload);

    const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queryKey: ["school", "detailed", schoolId] });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolFacilitiesData) => {

        const response = await safeAsyncMutate(data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }
        navigate('../../');


    }
    console.log(form.formState.errors)

    return (
        <>


            <AbstractWrapper currentStep={2}>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedFacilities form={form} />

                        <NavigationButtons cancelPath='../../' currentStep={0} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />

                    </form>
                </Form>


            </AbstractWrapper>




        </>
    )
}

export default FacilitiesUpdatedForm;