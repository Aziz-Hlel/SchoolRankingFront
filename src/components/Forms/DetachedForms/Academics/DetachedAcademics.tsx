import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type UseFormReturn, } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { AccreditationEnums } from '@/enums/AccreditationEnums';
import { LevelEnums } from '@/enums/LevelEnums';
import { CurriculumEnums } from '@/enums/CurriculumEnums';
import { Checkbox } from '@/components/ui/checkbox';
import { schoolAcademicsSchema } from '@/types/School2.type';
import type { FC } from 'react';
import type z from 'zod';



interface DetachedFormProps {
    form: UseFormReturn<SchoolAcademics>;

};


type SchoolAcademics = z.infer<typeof schoolAcademicsSchema>;


const DetachedAcademics: FC<DetachedFormProps> = ({ form }) => {


    return (


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


    );
};

export default DetachedAcademics;