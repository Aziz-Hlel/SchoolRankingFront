import { Form } from '@/components/ui/form';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolGeneralSchema } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type z from 'zod';
import DetachedGeneral from '../../DetachedForms/GeneralForm/DetachedGeneral';
import AbstractWrapper from './AbstractWrapper';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';


type SchoolGeneral = z.infer<typeof schoolGeneralSchema>;



const GeneralUpdateForm = () => {

    const { detailedSchool, fetchMyDetailedSchool } = useDetailedSchool();
    const school = detailedSchool!;

    const form = useForm<SchoolGeneral>({
        resolver: zodResolver(schoolGeneralSchema),
        defaultValues: school.schoolGeneral
    });


    const mutationFn = (payload: SchoolGeneral) => apiService.putThrowable(apiGateway.form.general.update(school.schoolGeneral!.id), payload);

    const { mutateAsync, isPending } = useMutation({ mutationFn, });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolGeneral) => {

        const response = await safeAsyncMutate(mutateAsync, data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }
        await fetchMyDetailedSchool();
        navigate("../../");


    }


    return (
        <>

            <AbstractWrapper currentStep={0}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedGeneral form={form} />

                        <NavigationButtons currentStep={0} cancelPath="../../" isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />


                    </form>
                </Form>
            </AbstractWrapper>


        </>
    )
}

export default GeneralUpdateForm;