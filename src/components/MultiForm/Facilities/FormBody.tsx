import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RatingLevelEnum, } from '@/types/school';
import { useForm } from 'react-hook-form';
import NavigationButtons from '../NavigationButtons';
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod';
import { useMutation } from '@tanstack/react-query';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { useAuth } from '@/contexts/AuthContext';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { TagInput } from '@/components/ui/TagInput';
import { FacilityEnums } from '@/enums/FacilityEnums';
import { AccessibilityEnums } from '@/enums/AccessibilityEnums';
import { SustainabilityEnums } from '@/enums/SustainabilityEnums';





export const schoolFacilitiesSchema = z.object({
    facilities: z.array(z.enum(Object.keys(FacilityEnums) as [string, ...string[]]))
        .min(1, 'At least one facility is required'),
    accessibilityFeatures: z.array(z.enum(Object.keys(AccessibilityEnums) as [string, ...string[]]))
        .min(1, 'At least one accessibility feature is required'),
    sustainabilityPractices: z.array(z.enum(Object.keys(SustainabilityEnums) as [string, ...string[]]))
        .min(1, 'At least one sustainability practice is required'),
    universityDestinations: z.array(z.string().min(2, 'University name must be at least 2 characters'))
        .min(1, 'At least one university destination is required'),
    csrActivities: z.string()
        .min(10, 'CSR activities description must be at least 10 characters'),
    safetyCompliance: z.boolean({ required_error: 'Safety compliance is required' }),
    aiIntegration: z.boolean({ required_error: 'AI integration is required' }),
    technologyReadiness: RatingLevelEnum.optional(),
    industryPartnerships: z.array(z.string().min(2, 'Partnership name must be at least 2 characters'))
        .min(1, 'At least one industry partnership is required'),
    awardsAndRecognitions: z.string().optional(),
});

export type SchoolFacilitiesData = z.infer<typeof schoolFacilitiesSchema>;


const FormBody = () => {


    const form = useForm<SchoolFacilitiesData>({
        resolver: zodResolver(schoolFacilitiesSchema),
        defaultValues: {
            facilities: [],
            accessibilityFeatures: [],
            sustainabilityPractices: [],
            universityDestinations: [],
            csrActivities: '',
            safetyCompliance: false, // required and default false
            aiIntegration: false,    // required and default false
            technologyReadiness: undefined,
            industryPartnerships: [],
            awardsAndRecognitions: '',
        },
    });

    const { refreshUser } = useAuth();

    const mutationFn = (formData: SchoolFacilitiesData) => apiService.postThrowable(apiGateway.form.facilities.create(), formData);

    const { mutateAsync, isPending } = useMutation({ mutationFn, });

    const navigate = useNavigate();

    const onSubmit = async (data: SchoolFacilitiesData) => {

        const response = await safeAsyncMutate(mutateAsync, data);

        if (!response.success) {
            console.error("Failed to submit general form", response.error);
            return;
        }
        refreshUser()
        navigate('/forms/staff');


    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <div className="space-y-6">
                    {/* <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-2">School Facilities & Resources</h3>
                        <p className="text-muted-foreground">
                            Provide information about your school's facilities and resources
                        </p>
                    </div> */}

                    <FormField
                        control={form.control}
                        name="aiIntegration"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}

                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Ai Integration</FormLabel>
                                    <FormDescription>Check if your school currently uses artificial intelligence (AI) in any of its operations or systems.</FormDescription>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="safetyCompliance"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        

                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Safety Compliance</FormLabel>
                                    <FormDescription>Confirm that your school is in compliance with all relevant safety regulations and standards.</FormDescription>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="facilities"
                        render={() => (
                            <FormItem>
                                <FormLabel>Facilities *</FormLabel>
                                <FormDescription>Select all facilities available at your school</FormDescription>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {Object.values(FacilityEnums).map((facility) => (
                                        <FormField
                                            key={facility.value}
                                            control={form.control}
                                            name="facilities"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={facility.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(facility.value)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValue = field.value || [];
                                                                    return checked
                                                                        ? field.onChange([...currentValue, facility.value])
                                                                        : field.onChange(
                                                                            currentValue?.filter(
                                                                                (value) => value !== facility.value
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {facility.label}
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
                        name="accessibilityFeatures"
                        render={() => (
                            <FormItem>
                                <FormLabel>Accessibility Features *</FormLabel>
                                <FormDescription>Select accessibility features available</FormDescription>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Object.values(AccessibilityEnums).map((feature) => (
                                        <FormField
                                            key={feature.value}
                                            control={form.control}
                                            name="accessibilityFeatures"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={feature.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(feature.value)}
                                                                onCheckedChange={(checked) => {
                                                                    const currentValue = field.value || [];
                                                                    return checked
                                                                        ? field.onChange([...currentValue, feature.value])
                                                                        : field.onChange(
                                                                            currentValue?.filter(
                                                                                (value) => value !== feature.value
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {feature.label}
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
                        name="sustainabilityPractices"
                        render={() => (
                            <FormItem>
                                <FormLabel>Sustainability Practices *</FormLabel>
                                <FormDescription>Select sustainability practices implemented</FormDescription>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Object.values(SustainabilityEnums).map((practice) => (
                                        <FormField
                                            key={practice.value}
                                            control={form.control}
                                            name="sustainabilityPractices"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={practice.value}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(practice.value as any)}
                                                                onCheckedChange={(checked: any) => {
                                                                    const currentValue = field.value || [];
                                                                    return checked
                                                                        ? field.onChange([...currentValue, practice.value])
                                                                        : field.onChange(
                                                                            currentValue?.filter(
                                                                                (value) => value !== practice.value
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {practice.label}
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
                        name="universityDestinations"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>University Destinations *</FormLabel>
                                <FormDescription>
                                    Enter universities where your graduates typically go
                                </FormDescription>
                                <FormControl>
                                    <TagInput
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        placeholder="Harvard University, Oxford University, MIT..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="csrActivities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CSR Activities *</FormLabel>
                                <FormDescription>Describe your Corporate Social Responsibility activities</FormDescription>
                                <FormControl>
                                    <Input placeholder="Community service, environmental projects, charity work..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="industryPartnerships"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Industry Partnerships *</FormLabel>
                                <FormDescription>List your industry partnerships (comma-separated)</FormDescription>
                                <FormControl>

                                    <TagInput
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        placeholder="Tech companies, local businesses, NGOs..."
                                    />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <FormField
                        control={form.control}
                        name="awardsAndRecognitions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Awards and Recognitions</FormLabel>
                                <FormDescription>List any awards or recognitions received</FormDescription>
                                <FormControl>
                                    <Input placeholder="Academic excellence awards, sports championships..." {...field} />
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
}

export default FormBody;