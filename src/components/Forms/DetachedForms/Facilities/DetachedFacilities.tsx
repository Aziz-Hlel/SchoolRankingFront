import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import { TagInput } from '@/components/ui/TagInput';
import { FacilityEnums } from '@/enums/FacilityEnums';
import { AccessibilityEnums } from '@/enums/AccessibilityEnums';
import { SustainabilityEnums } from '@/enums/SustainabilityEnums';
import { schoolFacilitiesSchema } from '@/types/School2.type';
import type { FC } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RatingLevelEnums } from '@/enums/RatingLevelEnums';



interface DetachedFormProps {
    form: UseFormReturn<SchoolFacilitiesData>;
}



export type SchoolFacilitiesData = z.infer<typeof schoolFacilitiesSchema>;


const DetachedFacilities: FC<DetachedFormProps> = ({ form }) => {




    return (

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
                        <FormLabel>University Destinations *(click "enter" to add)</FormLabel>
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
                name="technologyReadiness"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Technology Readiness *</FormLabel>
                        <FormDescription>Describe your school's technology readiness</FormDescription>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(RatingLevelEnums).map(level =>
                                            <SelectItem value={level.value}>{level.label}</SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

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
                        <FormLabel>Industry Partnerships *(click "enter" to add)</FormLabel>
                        <FormDescription>List your industry partnerships </FormDescription>
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
    );
}

export default DetachedFacilities;