
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import type { SchoolAcademicsData } from '@/types/school';

const accreditations = [
  { value: 'IB', label: 'International Baccalaureate (IB)' },
  { value: 'CIS', label: 'Council of International Schools (CIS)' },
  { value: 'NEASC', label: 'New England Association of Schools and Colleges (NEASC)' },
  { value: 'WASC', label: 'Western Association of Schools and Colleges (WASC)' },
  { value: 'MSA', label: 'Middle States Association (MSA)' },
  { value: 'SACS', label: 'Southern Association of Colleges and Schools (SACS)' },
  { value: 'ACSI', label: 'Association of Christian Schools International (ACSI)' },
  { value: 'BSO', label: 'British Schools Overseas (BSO)' },
];

const levels = [
  { value: 'preschool', label: 'Preschool (Ages 3-5)' },
  { value: 'elementary', label: 'Elementary (Ages 6-11)' },
  { value: 'middle', label: 'Middle School (Ages 12-14)' },
  { value: 'high', label: 'High School (Ages 15-18)' },
  { value: 'university', label: 'University/College' },
];

const curriculums = [
  { value: 'IB', label: 'International Baccalaureate (IB)' },
  { value: 'AP', label: 'Advanced Placement (AP)' },
  { value: 'A-Level', label: 'A-Level' },
  { value: 'national', label: 'National Curriculum' },
  { value: 'montessori', label: 'Montessori' },
  { value: 'waldorf', label: 'Waldorf/Steiner' },
  { value: 'cambridge', label: 'Cambridge International' },
];



export const SchoolAcademicsStep: React.FC<{ form: UseFormReturn<SchoolAcademicsData>, onSubmit: () => void }> = ({ form }) => {
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
                {accreditations.map((item) => (
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
                {levels.map((item) => (
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
                {curriculums.map((item) => (
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
