import { Form } from '@/components/ui/form'
import AbstractWrapper from './AbstractWrapper'
import DetachedMedia from '../../DetachedForms/Media/DetachedMedia'
import { schoolMediaSchema } from '@/types/School2.type';
import type z from 'zod';
import { useFormProgress } from '@/contexts/FormProgress';
import { useForm } from 'react-hook-form';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';

type SchoolMedia = z.infer<typeof schoolMediaSchema>;


const MediaForm = () => {

    const { fetchProgress } = useFormProgress();
    const { fetchMyDetailedSchool } = useDetailedSchool();

    const form = useForm<SchoolMedia>({ resolver: zodResolver(schoolMediaSchema), });


    const mutationFn = (formData: SchoolMedia) => apiService.postThrowable(apiGateway.form.media.create(), formData);

    const { mutateAsync, isPending } = useMutation({ mutationFn, });



    const navigate = useNavigate();

    const onSubmit = async (data: SchoolMedia) => {

        const response = await safeAsyncMutate(mutateAsync, data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }

        await fetchProgress();
        await fetchMyDetailedSchool();
        navigate('/dashboard');


    }


    return (
        <>
            <AbstractWrapper currentStep={4}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedMedia form={form} />

                        <NavigationButtons currentStep={4} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />


                    </form>
                </Form>
            </AbstractWrapper>
        </>

    )
}

export default MediaForm