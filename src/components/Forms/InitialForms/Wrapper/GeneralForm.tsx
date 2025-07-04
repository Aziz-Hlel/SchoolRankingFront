import { Form } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { schoolGeneralSchema } from '@/types/School2.type';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type z from 'zod';
import DetachedGeneral from '../../DetachedForms/GeneralForm/DetachedGeneral';
import AbstractWrapper from './AbstractWrapper';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useChangePageById, useOrdredPages } from '@/store/usePageStore';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';


type SchoolGeneral = z.infer<typeof schoolGeneralSchema>;



const GeneralForm = () => {

    const form = useForm<SchoolGeneral>({ resolver: zodResolver(schoolGeneralSchema), });

    const changePageById = useChangePageById();
    const ordredPages = useOrdredPages();
    const { fetchDetailedSchool } = useDetailedSchool();

    const mutationFn = (formData: SchoolGeneral) => apiService.postThrowable<string>(apiGateway.form.general.create(), formData);

    const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queryKey: ['user-schools'], });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolGeneral) => {
        console.log("ordredPages b4 : ", ordredPages);
        const response = await safeAsyncMutate(data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }

        const schoolId = response.data
        fetchDetailedSchool(schoolId);
        console.log("fcking school id : ", schoolId);
        console.log("ordredPages rn : ", ordredPages);
        changePageById(schoolId);
        navigate(`/dashboard/add-school/${schoolId}/form/academics`);


    }


    return (
        <>

            <AbstractWrapper currentStep={0}>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedGeneral form={form} />

                        <NavigationButtons currentStep={0} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />


                    </form>
                </Form>
            </AbstractWrapper>


        </>
    )
}

export default GeneralForm