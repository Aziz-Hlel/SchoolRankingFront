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
import { CountryEnums, } from '@/enums/CountryEnums';
import { Checkbox } from '@/components/ui/checkbox';
import { LanguageEnums } from '@/enums/LanguagesEnums';



export const schoolStaffSchema = z.object({
    leadershipTeam: z.string()
        .min(10, 'Leadership team description must be at least 10 characters'),

    leadershipProfileLink: z.string()
        .url('Please enter a valid URL for leadership profile'),

    staffSizeEstimate: z.number()
        .int('Staff size must be a whole number')
        .min(1, 'Staff size must be at least 1'),

    teacherQualifications: z.string()
        .min(10, 'Teacher qualifications must be at least 10 characters'),

    teacherNationalities: z.array(z.enum(Object.values(CountryEnums).map(country => country.value) as [string, ...string[]]))
        .min(1, 'At least one teacher nationality is required'),

    teacherLanguages: z.array(z.enum(Object.values(LanguageEnums).map(language => language.value) as [string, ...string[]]))
        .min(1, 'At least one teacher language is required'),

    professionalDevelopment: z.string()
        .min(10, 'Professional development description must be at least 10 characters'),

    lastInspectionDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in yyyy-MM-dd format')
        .refine((date) => new Date(date) <= new Date(), 'Inspection date must be in the past')
        .optional(),

});



type SchoolStaff = z.infer<typeof schoolStaffSchema>;

const FormBody = () => {


    const form = useForm<SchoolStaff>({ resolver: zodResolver(schoolStaffSchema), });


    const mutationFn = (formData: SchoolStaff) => apiService.postThrowable(apiGateway.form.staff.create(), formData);

    const { mutateAsync, isPending } = useMutation({ mutationFn, });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolStaff) => {

        const response = await safeAsyncMutate(mutateAsync, data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }

        navigate('/forms/media');


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">


                <div className="space-y-6">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-2">School Staff & Leadership</h3>
                        <p className="text-muted-foreground">
                            Provide information about your school's staff and leadership team
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="leadershipTeam"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Leadership Team *</FormLabel>
                                <FormDescription>Describe your school's leadership team</FormDescription>
                                <FormControl>
                                    <Input placeholder="Principal, Vice Principal, Academic Directors..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="leadershipProfileLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Leadership Profile Link *</FormLabel>
                                <FormDescription>Link to leadership team profiles or bios</FormDescription>
                                <FormControl>
                                    <Input placeholder="https://example.com/leadership" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="staffSizeEstimate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Staff Size Estimate *</FormLabel>
                                <FormDescription>Total number of staff members</FormDescription>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="50"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="teacherQualifications"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teacher Qualifications *</FormLabel>
                                <FormDescription>Describe the typical qualifications of your teachers</FormDescription>
                                <FormControl>
                                    <Input placeholder="Bachelor's degree, Master's degree, Teaching certification..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="teacherNationalities"
                        render={() => (
                            <FormItem>
                                <FormLabel>Teacher Nationalities *</FormLabel>
                                <FormDescription>Select the nationalities represented in your teaching staff</FormDescription>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                                    {Object.values(CountryEnums).map((country) => (
                                        <FormField
                                            key={country.value}
                                            control={form.control}
                                            name="teacherNationalities"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={country.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(country.value)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValue = field.value || [];
                                                                    return checked
                                                                        ? field.onChange([...currentValue, country.value])
                                                                        : field.onChange(
                                                                            currentValue?.filter(
                                                                                (value) => value !== country.value
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {country.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
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
                        name="teacherLanguages"
                        render={() => (
                            <FormItem>
                                <FormLabel>Teacher Languages *</FormLabel>
                                <FormDescription>Select languages spoken by your teaching staff</FormDescription>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {Object.values(LanguageEnums).map((language) => (
                                        <FormField
                                            key={language.value}
                                            control={form.control}
                                            name="teacherLanguages"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={language.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(language.value)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValue = field.value || [];
                                                                    return checked
                                                                        ? field.onChange([...currentValue, language.value])
                                                                        : field.onChange(
                                                                            currentValue?.filter(
                                                                                (value) => value !== language.value
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {language.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
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
                        name="professionalDevelopment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Professional Development *</FormLabel>
                                <FormDescription>Describe professional development opportunities for staff</FormDescription>
                                <FormControl>
                                    <Input placeholder="Training programs, workshops, conferences..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastInspectionDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Inspection Date</FormLabel>
                                <FormDescription>Date of the last official school inspection (YYYY-MM-DD)</FormDescription>
                                <FormControl>
                                    <Input type="date" {...field} />
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