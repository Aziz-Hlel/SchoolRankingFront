import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AccreditationEnum, CountryEnum, CurriculumEnum, LevelsEnum, schoolGeneralSchema, SchoolTypeEnum, } from '@/types/school';
import { useForm, } from 'react-hook-form';
import NavigationButtons from '../NavigationButtons';
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod';
import { useMutation } from '@tanstack/react-query';
import apiGateway from '@/service/Api/apiGateway';
import { apiService } from '@/service/Api/apiService';
import { useAuth } from '@/contexts/AuthContext';
import safeAsyncMutate from '@/utils/safeAsyncMutate';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@radix-ui/react-checkbox';
import { AccreditationEnums } from '@/enums/AccreditationEnums';
import { LevelEnums } from '@/enums/LevelEnums';
import { CurriculumEnums } from '@/enums/CurriculumEnums';


const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FRANCE', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'SG', label: 'Singapore' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'IN', label: 'India' },
    { value: 'BR', label: 'Brazil' },
    { value: 'MX', label: 'Mexico' },
    { value: 'ZA', label: 'South Africa' },
];

const schoolTypes = [
    { value: 'public', label: 'Public School' },
    { value: 'private', label: 'Private School' },
    { value: 'charter', label: 'Charter School' },
    { value: 'International', label: 'International School' },
    { value: 'religious', label: 'Religious School' },
    { value: 'boarding', label: 'Boarding School' },
];



export const schoolAcademicsSchema = z.object({
    languagesOfInstruction: z.number()
        .int('Number of languages must be a whole number')
        .min(1, 'At least one language is required')
        .max(10, 'Maximum 10 languages allowed'),
    internationalAccreditations: z.array(AccreditationEnum)
        .min(1, 'At least one accreditation is required'),
    accreditationDocsLinks: z.string()
        .min(5, 'Please provide documentation links'),
    levelsOffered: z.array(z.enum(Object.keys(LevelEnums) as [string, ...string[]]))
        .min(1, 'At least one level is required'),
    curriculums: z.array(CurriculumEnum)
        .min(1, 'At least one curriculum is required'),
});

type FormValues = z.infer<typeof schoolAcademicsSchema>;


const FormBody = () => {

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

    return (
        <Form {...form}>
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
                                                            checked={field.value?.includes(item.value as any)}
                                                            onCheckedChange={(checked: any) => {
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
                                                            checked={field.value?.includes(item.value as any)}
                                                            onCheckedChange={(checked: any) => {
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
                                                            checked={field.value?.includes(item.value as any)}
                                                            onCheckedChange={(checked: any) => {
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
        </Form>
    );
};

export default FormBody;