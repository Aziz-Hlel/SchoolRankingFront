
import React from 'react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import type { SchoolMediaData } from '@/types/school';

interface SchoolMediaStepProps {
  form: UseFormReturn<SchoolMediaData>;
}

export const SchoolMediaStep: React.FC<SchoolMediaStepProps> = ({ form }) => {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">School Media & Documentation</h3>
          <p className="text-muted-foreground">
            Provide links to your school's media and documentation (all fields are optional)
          </p>
        </div>

        <FormField
          control={form.control}
          name="bqaReportLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BQA Report Link</FormLabel>
              <FormDescription>Link to your school's BQA (Bahrain Quality Assurance) report</FormDescription>
              <FormControl>
                <Input placeholder="https://example.com/bqa-report" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brochureLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Brochure Link</FormLabel>
              <FormDescription>Link to your school's digital brochure or prospectus</FormDescription>
              <FormControl>
                <Input placeholder="https://example.com/brochure" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="galleryLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo Gallery Link</FormLabel>
              <FormDescription>Link to your school's photo gallery or virtual campus tour</FormDescription>
              <FormControl>
                <Input placeholder="https://example.com/gallery" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoTourLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Tour Link</FormLabel>
              <FormDescription>Link to your school's video tour or promotional video</FormDescription>
              <FormControl>
                <Input placeholder="https://example.com/video-tour" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};
