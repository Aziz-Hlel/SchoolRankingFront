import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const schoolFacilitiesSchema = z.object({
  facilities: z.string().array().optional(),
  accessibilityFeatures: z.string().array().optional(),
  sustainabilityPractices: z.string().array().optional(),
  universityDestinations: z.string().array().optional(),
  csrActivities: z.string().optional(),
  industryPartnerships: z.string().array().optional(),
  awardsAndRecognitions: z.string().optional(),
});

export type SchoolFacilitiesData = z.infer<typeof schoolFacilitiesSchema>;

interface SchoolFacilitiesStepProps {
  data: SchoolFacilitiesData;
  onDataChange: (data: SchoolFacilitiesData) => void;
}

export const SchoolFacilitiesStep: React.FC<SchoolFacilitiesStepProps> = ({
  data,
  onDataChange,
}) => {
  const form = useForm<SchoolFacilitiesData>({
    resolver: zodResolver(schoolFacilitiesSchema),
    defaultValues: data,
  });

  const handleCheckboxChange = (
    field: 'facilities' | 'accessibilityFeatures' | 'sustainabilityPractices' | 'industryPartnerships',
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

  const handleInputChange = (field: keyof SchoolFacilitiesData, value: any) => {
    form.setValue(field, value);
    onDataChange({ ...form.getValues() });
  };

  const facilityOptions = [
    { value: 'library', label: 'Library' },
    { value: 'laboratory', label: 'Laboratory' },
    { value: 'gymnasium', label: 'Gymnasium' },
    { value: 'cafeteria', label: 'Cafeteria' },
    { value: 'auditorium', label: 'Auditorium' },
    { value: 'playground', label: 'Playground' },
    { value: 'swimming-pool', label: 'Swimming Pool' },
    { value: 'art-studio', label: 'Art Studio' },
    { value: 'music-room', label: 'Music Room' },
    { value: 'computer-lab', label: 'Computer Lab' },
    { value: 'sports-field', label: 'Sports Field' },
  ];

  const accessibilityOptions = [
    { value: 'wheelchair-access', label: 'Wheelchair Access' },
    { value: 'elevator', label: 'Elevator' },
    { value: 'braille-signage', label: 'Braille Signage' },
    { value: 'hearing-loop', label: 'Hearing Loop' },
    { value: 'accessible-restrooms', label: 'Accessible Restrooms' },
    { value: 'special-needs-support', label: 'Special Needs Support' },
  ];

  const sustainabilityOptions = [
    { value: 'solar-panels', label: 'Solar Panels' },
    { value: 'recycling-program', label: 'Recycling Program' },
    { value: 'water-conservation', label: 'Water Conservation' },
    { value: 'green-building', label: 'Green Building' },
    { value: 'organic-garden', label: 'Organic Garden' },
    { value: 'energy-efficiency', label: 'Energy Efficiency' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">School Facilities</h3>

        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="facilities"
              render={() => (
                <FormItem>
                  <FormLabel>Available Facilities</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {facilityOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="facilities"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked: any) =>
                                  handleCheckboxChange('facilities', option.value, checked as boolean)
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
              name="accessibilityFeatures"
              render={() => (
                <FormItem>
                  <FormLabel>Accessibility Features</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {accessibilityOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="accessibilityFeatures"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked: any) =>
                                  handleCheckboxChange('accessibilityFeatures', option.value, checked as boolean)
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
              name="sustainabilityPractices"
              render={() => (
                <FormItem>
                  <FormLabel>Sustainability Practices</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {sustainabilityOptions.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="sustainabilityPractices"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked: any) =>
                                  handleCheckboxChange('sustainabilityPractices', option.value, checked as boolean)
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
              name="universityDestinations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Destinations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter university destinations (one per line)"
                      value={field.value?.join('\n') || ''}
                      onChange={(e) => handleInputChange('universityDestinations', e.target.value.split('\n').filter(Boolean))}
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
                  <FormLabel>CSR Activities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your CSR activities"
                      {...field}
                      onChange={(e) => handleInputChange('csrActivities', e.target.value)}
                    />
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
                  <FormLabel>Industry Partnerships</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter industry partnerships (one per line)"
                      value={field.value?.join('\n') || ''}
                      onChange={(e) => handleInputChange('industryPartnerships', e.target.value.split('\n').filter(Boolean))}
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
                  <FormLabel>Awards and Recognitions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any awards and recognitions"
                      {...field}
                      onChange={(e) => handleInputChange('awardsAndRecognitions', e.target.value)}
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
