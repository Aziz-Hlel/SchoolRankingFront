import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import NavigationButtons from '../NavigationButtons';
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod';
import { useMutation } from '@tanstack/react-query';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { useNavigate } from 'react-router-dom';
import { useFormProgress } from '@/contexts/FormProgress';
import { schoolMediaSchema } from '@/types/School2.type';







type SchoolMedia = z.infer<typeof schoolMediaSchema>;

const FormBody = () => {

    const { fetchProgress } = useFormProgress();

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

        fetchProgress();
        navigate('/dashboard');


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">


                <div className="space-y-6">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-2">School Media & Documentation</h3>
                        <p className="text-muted-foreground">
                            Provide links to your school's media and documentation (all fields are optional)
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="bqaReportLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>BQA Report Link</FormLabel>
                                <FormDescription>Link to your school's BQA (Bahrain Quality Assurance) report</FormDescription>
                                <FormControl>
                                    <Input placeholder="https://example.com/bqa-report" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="brochureLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School Brochure Link</FormLabel>
                                <FormDescription>Link to your school's digital brochure or prospectus</FormDescription>
                                <FormControl>
                                    <Input placeholder="https://example.com/brochure" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="galleryLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo Gallery Link</FormLabel>
                                <FormDescription>Link to your school's photo gallery or virtual campus tour</FormDescription>
                                <FormControl>
                                    <Input placeholder="https://example.com/gallery" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="videoTourLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video Tour Link</FormLabel>
                                <FormDescription>Link to your school's video tour or promotional video</FormDescription>
                                <FormControl>
                                    <Input placeholder="https://example.com/video-tour" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <NavigationButtons currentStep={0} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />

            </form>
        </Form>
    );
};


export default FormBody;