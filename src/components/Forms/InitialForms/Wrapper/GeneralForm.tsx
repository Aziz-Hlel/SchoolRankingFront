import { Form } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
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


type SchoolGeneral = z.infer<typeof schoolGeneralSchema>;



const GeneralForm = () => {

    const form = useForm<SchoolGeneral>({ resolver: zodResolver(schoolGeneralSchema), });

    const { refreshUser } = useAuth();

    const mutationFn = (formData: SchoolGeneral) => apiService.postThrowable(apiGateway.form.general.create(), formData);

    const { mutateAsync, isPending } = useMutation({ mutationFn, });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolGeneral) => {

        const response = await safeAsyncMutate(mutateAsync, data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }
        await refreshUser();
        navigate("/forms/academics");


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