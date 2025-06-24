import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CurriculumEnum, } from '@/types/school';
import { useForm, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { AccreditationEnums } from '@/enums/AccreditationEnums';
import { LevelEnums } from '@/enums/LevelEnums';
import { CurriculumEnums } from '@/enums/CurriculumEnums';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/service/Api/apiService';
import apiGateway from '@/service/Api/apiGateway';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../NavigationButtons';



export const schoolAcademicsSchema = z.object({
    languagesOfInstruction: z.number()
        .int('Number of languages must be a whole number')
        .min(1, 'At least one language is required')
        .max(10, 'Maximum 10 languages allowed'),
    internationalAccreditations: z.array(z.enum(Object.keys(AccreditationEnums) as [string, ...string[]]))
        .min(1, 'At least one accreditation is required'),
    accreditationDocsLinks: z.string()
        .min(5, 'Please provide documentation links'),
    levelsOffered: z.array(z.enum(Object.keys(LevelEnums) as [string, ...string[]]))
        .min(1, 'At least one level is required'),
    curriculums: z.array(z.enum(Object.keys(CurriculumEnums) as [string, ...string[]]))
        .min(1, 'At least one curriculum is required'),
});

type FormValues = z.infer<typeof schoolAcademicsSchema>;


const FormBody = () => {

    const navigate = useNavigate();

    const form = useForm<FormValues>({
        resolver: zodResolver(schoolAcademicsSchema),
        defaultValues: {
            languagesOfInstruction: 1,
            internationalAccreditations: [],
            accreditationDocsLinks: '',
            levelsOffered: [],
            curriculums: [],
        },
    });

    const mutationFn = (payload: FormValues) => apiService.postThrowable(apiGateway.form.academics.create(), payload);

    const { mutateAsync, isPending } = useMutation({ mutationFn, });

    const onSubmit = async (data: FormValues) => {

        const response = await safeAsyncMutate(mutateAsync, data);

        if (!response.success) {
            console.error("Failed to submit academics form", response.error);
            return;
        }
        navigate('/forms/facilities');



    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">


                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="languagesOfInstruction"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Languages of Instruction</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter number of languages"
                                        {...field}
                                        onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    How many languages are used for instruction at your school?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="internationalAccreditations"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">International Accreditations</FormLabel>
                                    <FormDescription>
                                        Select all accreditations your school currently holds.
                                    </FormDescription>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {Object.values(AccreditationEnums).map((item) => (
                                        <FormField
                                            key={item.value}
                                            control={form.control}
                                            name="internationalAccreditations"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.value)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.value])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.value
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="accreditationDocsLinks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Accreditation Documentation Links</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Provide links to accreditation documents or certificates..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please provide links to your accreditation documents or certificates.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="levelsOffered"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Educational Levels Offered</FormLabel>
                                    <FormDescription>
                                        Select all educational levels your school offers.
                                    </FormDescription>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {Object.values(LevelEnums).map((item) => (
                                        <FormField
                                            key={item.value}
                                            control={form.control}
                                            name="levelsOffered"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.value)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.value])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.value
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="curriculums"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Curriculums Offered</FormLabel>
                                    <FormDescription>
                                        Select all curriculum types your school offers.
                                    </FormDescription>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {Object.values(CurriculumEnums).map((item) => (
                                        <FormField
                                            key={item.value}
                                            control={form.control}
                                            name="curriculums"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={item.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item.value)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.value])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== item.value
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
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