import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const schoolStaffSchema = z.object({
  leadershipTeam: z.string().optional(),
  leadershipProfileLink: z.string().url('Please enter a valid URL').optional(),
  staffSizeEstimate: z.number().min(1, 'Staff size must be at least 1').optional(),
  teacherQualifications: z.string().optional(),
  teacherNationalities: z.string().array().optional(),
  teacherLanguages: z.string().array().optional(),
  professionalDevelopment: z.string().optional(),
  lastInspectionDate: z.string().optional(),
});

export type SchoolStaffData = z.infer<typeof schoolStaffSchema>;

interface SchoolStaffStepProps {
  data: SchoolStaffData;
  onDataChange: (data: SchoolStaffData) => void;
}

export const SchoolStaffStep: React.FC<SchoolStaffStepProps> = ({
  data,
  onDataChange,
}) => {
  const form = useForm<SchoolStaffData>({
    resolver: zodResolver(schoolStaffSchema),
    defaultValues: data,
  });

  const handleCheckboxChange = (
    field: 'teacherNationalities' | 'teacherLanguages',
    value: string,
    checked: boolean
  ) => {
    const currentValues = form.getValues(field) || [];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((item: string) => item !== value);
    }

    form.setValue(field, newValues);
    onDataChange({ ...form.getValues() });
  };

  const handleInputChange = (field: keyof SchoolStaffData, value: any) => {
    form.setValue(field, value);
    onDataChange({ ...form.getValues() });
  };

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'SG', label: 'Singapore' },
    { value: 'AE', label: 'UAE' },
    { value: 'IN', label: 'India' },
    { value: 'BR', label: 'Brazil' },
    { value: 'MX', label: 'Mexico' },
    { value: 'ZA', label: 'South Africa' },
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    { value: 'italian', label: 'Italian' },
    { value: 'dutch', label: 'Dutch' },
    { value: 'korean', label: 'Korean' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">School Staff</h3>

        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="leadershipTeam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leadership Team</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your leadership team"
                      {...field}
                      onChange={(e) => handleInputChange('leadershipTeam', e.target.value)}
                    />
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
                  <FormLabel>Leadership Profile Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/leadership"
                      {...field}
                      onChange={(e) => handleInputChange('leadershipProfileLink', e.target.value)}
                    />
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
                  <FormLabel>Staff Size Estimate</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Enter number of staff"
                      {...field}
                      onChange={(e) => handleInputChange('staffSizeEstimate', parseInt(e.target.value) || 0)}
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
                  <FormLabel>Teacher Qualifications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe teacher qualifications"
                      {...field}
                      onChange={(e) => handleInputChange('teacherQualifications', e.target.value)}
                    />
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
                  <FormLabel>Teacher Nationalities</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {countryOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="teacherNationalities"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked: any) =>
                                  handleCheckboxChange('teacherNationalities', option.value, checked as boolean)
                                }
                              />
                            </FormControl>
                            <FormLabel className="text-sm">{option.label}</FormLabel>
                          </FormItem>
                        )}
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
                  <FormLabel>Teacher Languages</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {languageOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="teacherLanguages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked: any) =>
                                  handleCheckboxChange('teacherLanguages', option.value, checked as boolean)
                                }
                              />
                            </FormControl>
                            <FormLabel className="text-sm">{option.label}</FormLabel>
                          </FormItem>
                        )}
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
                  <FormLabel>Professional Development</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe professional development programs"
                      {...field}
                      onChange={(e) => handleInputChange('professionalDevelopment', e.target.value)}
                    />
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
                  <FormLabel>Last Inspection Date (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) => handleInputChange('lastInspectionDate', e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
