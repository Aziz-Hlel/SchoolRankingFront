import { Form } from '@/components/ui/form'
import AbstractWrapper from './AbstractWrapper'
import DetachedMedia from '../../DetachedForms/Media/DetachedMedia'
import { schoolMediaSchema } from '@/types/School2.type';
import type z from 'zod';
import { useForm } from 'react-hook-form';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../NavigationButton/NavigationButtons';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import useApiMutation from '@/hooks/useApiMutation';

type SchoolMedia = z.infer<typeof schoolMediaSchema>;


const MediaUpdatedForm = () => {

    const { detailedSchool,  } = useDetailedSchool();
    const school = detailedSchool!;
    const schoolId = school.schoolGeneral!.id
    const form = useForm<SchoolMedia>({
        resolver: zodResolver(schoolMediaSchema),
        defaultValues: school.schoolMedia
    });


    const mutationFn = (formData: SchoolMedia) => apiService.putThrowable(apiGateway.form.media.update(schoolId, school.schoolMedia!.id), formData);

    const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queryKey: ["school", "detailed", schoolId] });



    const navigate = useNavigate();

    const onSubmit = async (data: SchoolMedia) => {

        const response = await safeAsyncMutate(data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }

        navigate('../../');


    }


    return (
        <>
            <AbstractWrapper currentStep={4}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedMedia form={form} />

                        <NavigationButtons cancelPath='../../' currentStep={4} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />

                    </form>
                </Form>
            </AbstractWrapper>
        </>

    )
}

export default MediaUpdatedForm;