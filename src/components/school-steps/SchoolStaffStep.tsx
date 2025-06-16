import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import type { SchoolStaffData } from '@/types/school';
import type { UseFormReturn } from 'react-hook-form';

interface SchoolStaffStepProps {
  form: UseFormReturn<SchoolStaffData>;
}

export const SchoolStaffStep: React.FC<SchoolStaffStepProps> = ({ form }) => {
  const countryOptions = [
    { id: 'US', label: 'United States' },
    { id: 'CA', label: 'Canada' },
    { id: 'UK', label: 'United Kingdom' },
    { id: 'AU', label: 'Australia' },
    { id: 'DE', label: 'Germany' },
    { id: 'FR', label: 'France' },
    { id: 'ES', label: 'Spain' },
    { id: 'IT', label: 'Italy' },
    { id: 'JP', label: 'Japan' },
    { id: 'CN', label: 'China' },
    { id: 'IN', label: 'India' },
    { id: 'ZA', label: 'South Africa' },
  ];

  const languageOptions = [
    { id: 'english', label: 'English' },
    { id: 'arabic', label: 'Arabic' },
    { id: 'french', label: 'French' },
    { id: 'spanish', label: 'Spanish' },
    { id: 'german', label: 'German' },
    { id: 'italian', label: 'Italian' },
    { id: 'mandarin', label: 'Mandarin' },
    { id: 'japanese', label: 'Japanese' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'portuguese', label: 'Portuguese' },
    { id: 'korean', label: 'Korean' },
  ];

  return (
    <Form {...form}>
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
                {countryOptions.map((country) => (
                  <FormField
                    key={country.id}
                    control={form.control}
                    name="teacherNationalities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={country.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(country.id as any)}
                              onCheckedChange={(checked: any) => {
                                const currentValue = field.value || [];
                                return checked
                                  ? field.onChange([...currentValue, country.id])
                                  : field.onChange(
                                    currentValue?.filter(
                                      (value) => value !== country.id
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
                {languageOptions.map((language) => (
                  <FormField
                    key={language.id}
                    control={form.control}
                    name="teacherLanguages"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={language.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(language.id as any)}
                              onCheckedChange={(checked: any) => {
                                const currentValue = field.value || [];
                                return checked
                                  ? field.onChange([...currentValue, language.id])
                                  : field.onChange(
                                    currentValue?.filter(
                                      (value) => value !== language.id
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
    </Form>
  );
};
