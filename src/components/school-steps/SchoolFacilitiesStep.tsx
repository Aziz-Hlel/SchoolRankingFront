import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import type { SchoolFacilitiesData } from '@/types/school';
import type { UseFormReturn } from 'react-hook-form';

interface SchoolFacilitiesStepProps {
  form: UseFormReturn<SchoolFacilitiesData>;
}

export const SchoolFacilitiesStep: React.FC<SchoolFacilitiesStepProps> = ({ form }) => {
  const facilityOptions = [
    { id: 'library', label: 'Library' },
    { id: 'laboratory', label: 'Laboratory' },
    { id: 'gymnasium', label: 'Gymnasium' },
    { id: 'cafeteria', label: 'Cafeteria' },
    { id: 'auditorium', label: 'Auditorium' },
    { id: 'playground', label: 'Playground' },
    { id: 'swimming-pool', label: 'Swimming Pool' },
    { id: 'art-studio', label: 'Art Studio' },
    { id: 'music-room', label: 'Music Room' },
    { id: 'computer-lab', label: 'Computer Lab' },
    { id: 'sports-field', label: 'Sports Field' },
  ];

  const accessibilityOptions = [
    { id: 'wheelchair-access', label: 'Wheelchair Access' },
    { id: 'elevator', label: 'Elevator' },
    { id: 'braille-signage', label: 'Braille Signage' },
    { id: 'hearing-loop', label: 'Hearing Loop' },
    { id: 'accessible-restrooms', label: 'Accessible Restrooms' },
  ];

  const sustainabilityOptions = [
    { id: 'solar-panels', label: 'Solar Panels' },
    { id: 'recycling-program', label: 'Recycling Program' },
    { id: 'water-conservation', label: 'Water Conservation' },
    { id: 'energy-efficient-lighting', label: 'Energy Efficient Lighting' },
    { id: 'green-building-certification', label: 'Green Building Certification' },
  ];

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">School Facilities & Resources</h3>
          <p className="text-muted-foreground">
            Provide information about your school's facilities and resources
          </p>
        </div>

        <FormField
          control={form.control}
          name="facilities"
          render={() => (
            <FormItem>
              <FormLabel>Facilities *</FormLabel>
              <FormDescription>Select all facilities available at your school</FormDescription>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {facilityOptions.map((facility) => (
                  <FormField
                    key={facility.id}
                    control={form.control}
                    name="facilities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={facility.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(facility.id as any)}
                              onCheckedChange={(checked: any) => {
                                const currentValue = field.value || [];
                                return checked
                                  ? field.onChange([...currentValue, facility.id])
                                  : field.onChange(
                                    currentValue?.filter(
                                      (value) => value !== facility.id
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
                {accessibilityOptions.map((feature) => (
                  <FormField
                    key={feature.id}
                    control={form.control}
                    name="accessibilityFeatures"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={feature.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature.id as any)}
                              onCheckedChange={(checked: any) => {
                                const currentValue = field.value || [];
                                return checked
                                  ? field.onChange([...currentValue, feature.id])
                                  : field.onChange(
                                    currentValue?.filter(
                                      (value) => value !== feature.id
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
                {sustainabilityOptions.map((practice) => (
                  <FormField
                    key={practice.id}
                    control={form.control}
                    name="sustainabilityPractices"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={practice.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(practice.id as any)}
                              onCheckedChange={(checked: any) => {
                                const currentValue = field.value || [];
                                return checked
                                  ? field.onChange([...currentValue, practice.id])
                                  : field.onChange(
                                    currentValue?.filter(
                                      (value) => value !== practice.id
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
              <FormDescription>Enter universities where your graduates typically go (comma-separated)</FormDescription>
              <FormControl>
                <Input
                  placeholder="Harvard University, Oxford University, MIT..."
                  value={field.value?.join(', ') || ''}
                  onChange={(e) => {
                    const universities = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                    field.onChange(universities);
                  }}
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
                <Input
                  placeholder="Tech companies, local businesses, NGOs..."
                  value={field.value?.join(', ') || ''}
                  onChange={(e) => {
                    const partnerships = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                    field.onChange(partnerships);
                  }}
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
    </Form>
  );
};
