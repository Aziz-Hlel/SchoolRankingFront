import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneInput } from '@/components/ui/phone-input';
import { CountryEnums, } from '@/enums/CountryEnums';
import { SchoolTypeEnums } from '@/enums/SchoolTypeEnums';
import { schoolGeneralSchema } from '@/types/School2.type';
import type { FC } from 'react';
import { CountryDropdown } from '@/components/ui/country-dropdown';
import { countries } from "country-data-list";


interface DetachedFormProps {
    form: UseFormReturn<SchoolGeneral>;

}



type SchoolGeneral = z.infer<typeof schoolGeneralSchema>;

const DetachedGeneral: FC<DetachedFormProps> = ({ form, }) => {


    const countryOptions = countries.all.filter((country) => {
        return CountryEnums.hasOwnProperty(country.alpha2)
    })
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <FormField
                control={form.control}
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

                control={form.control}
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
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <CountryDropdown
                            placeholder="Country"
                            defaultValue={field.value}
                            options={countryOptions}
                            onChange={(country) => { field.onChange(country.alpha2); }}
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <PhoneInput
                                placeholder="Placeholder"
                                {...field}
                                defaultCountry="AE"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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

    );
}

export default DetachedGeneral;