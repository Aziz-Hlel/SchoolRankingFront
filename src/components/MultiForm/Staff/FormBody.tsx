import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import { CountryEnums, } from '@/enums/CountryEnums';
import { SchoolTypeEnums } from '@/enums/SchoolTypeEnums';




export const schoolGeneralSchema = z.object({
    name: z.string().min(2, 'School name must be at least 2 characters'),
    country: z.enum(Object.values(CountryEnums) as [string, ...string[]]),
    city: z.string().min(2, 'City must be at least 2 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
    email: z.string().email('Please enter a valid email address'),
    yearEstablished: z.number()
        .int('Year must be a whole number')
        .min(1800, 'Year must be after 1800')
        .max(2025, 'Year cannot be in the future'),
    website: z.string().url('Please enter a valid website URL').optional(),
    type: z.enum(Object.values(SchoolTypeEnums) as [string, ...string[]]),
});

type SchoolGeneral = z.infer<typeof schoolGeneralSchema>;

const FormBody = () => {


    const generalForm = useForm<SchoolGeneral>({ resolver: zodResolver(schoolGeneralSchema), });

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
        refreshUser()
        navigate('/forms/academics');


    }

    return (
        <Form {...generalForm} >
            <form onSubmit={generalForm.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={generalForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter school name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField

                        control={generalForm.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className=' w-full'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select school type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(SchoolTypeEnums).map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={generalForm.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className=' w-full'>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(CountryEnums).map((country) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={generalForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={generalForm.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter complete address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={generalForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        placeholder="Placeholder"
                                        {...field}
                                        defaultCountry="TR"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={generalForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter school email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={generalForm.control}
                        name="yearEstablished"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year Established</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter year"
                                        {...field}
                                        onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={generalForm.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
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