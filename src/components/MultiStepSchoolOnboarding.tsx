
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { OnboardingLayout } from './onboarding/OnboardingLayout';
import { NavigationButtons } from './onboarding/NavigationButtons';
import { SchoolGeneralStep } from './school-steps/SchoolGeneralStep';
import { SchoolAcademicsStep } from './school-steps/SchoolAcademicsStep';
import { SchoolMediaStep } from './school-steps/SchoolMediaStep';
import { 
  schoolGeneralSchema, 
  schoolAcademicsSchema,
  schoolFacilitiesSchema,
  schoolStaffSchema,
  schoolMediaSchema,
  type SchoolGeneralData, 
  type SchoolAcademicsData,
  type SchoolFacilitiesData,
  type SchoolStaffData,
  type SchoolMediaData,
  type CompleteSchoolData 
} from '@/types/school';

const steps = [
  { title: 'School Information', description: 'Basic details about your school' },
  { title: 'Academic Programs', description: 'Curriculum and accreditation details' },
  { title: 'Facilities & Sustainability', description: 'Infrastructure and environmental practices' },
  { title: 'Staff & Leadership', description: 'Team qualifications and structure' },
  { title: 'Media & Documentation', description: 'Links to reports and media content' },
];

export const MultiStepSchoolOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CompleteSchoolData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('schoolOnboardingData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('schoolOnboardingData', JSON.stringify(formData));
    }
  }, [formData]);

  const generalForm = useForm<SchoolGeneralData>({
    resolver: zodResolver(schoolGeneralSchema),
    defaultValues: {
      name: formData.name || '',
      country: formData.country || undefined,
      city: formData.city || '',
      address: formData.address || '',
      phoneNumber: formData.phoneNumber || '',
      email: formData.email || '',
      yearEstablished: formData.yearEstablished || undefined,
      website: formData.website || '',
      type: formData.type || undefined,
    },
  });

  const academicsForm = useForm<SchoolAcademicsData>({
    resolver: zodResolver(schoolAcademicsSchema),
    defaultValues: {
      languagesOfInstruction: formData.languagesOfInstruction || undefined,
      internationalAccreditations: formData.internationalAccreditations || [],
      accreditationDocsLinks: formData.accreditationDocsLinks || '',
      levelsOffered: formData.levelsOffered || [],
      curriculums: formData.curriculums || [],
    },
  });

  const facilitiesForm = useForm<SchoolFacilitiesData>({
    resolver: zodResolver(schoolFacilitiesSchema),
    defaultValues: {
      facilities: formData.facilities || [],
      accessibilityFeatures: formData.accessibilityFeatures || [],
      sustainabilityPractices: formData.sustainabilityPractices || [],
      universityDestinations: formData.universityDestinations || [],
      csrActivities: formData.csrActivities || '',
      safetyCompliance: formData.safetyCompliance || false,
      aiIntegration: formData.aiIntegration || false,
      technologyReadiness: formData.technologyReadiness || undefined,
      industryPartnerships: formData.industryPartnerships || [],
      awardsAndRecognitions: formData.awardsAndRecognitions || '',
    },
  });

  const staffForm = useForm<SchoolStaffData>({
    resolver: zodResolver(schoolStaffSchema),
    defaultValues: {
      leadershipTeam: formData.leadershipTeam || '',
      leadershipProfileLink: formData.leadershipProfileLink || '',
      staffSizeEstimate: formData.staffSizeEstimate || undefined,
      teacherQualifications: formData.teacherQualifications || '',
      teacherNationalities: formData.teacherNationalities || [],
      teacherLanguages: formData.teacherLanguages || [],
      professionalDevelopment: formData.professionalDevelopment || '',
      lastInspectionDate: formData.lastInspectionDate || '',
    },
  });

  const mediaForm = useForm<SchoolMediaData>({
    resolver: zodResolver(schoolMediaSchema),
    defaultValues: {
      bqaReportLink: formData.bqaReportLink || '',
      brochureLink: formData.brochureLink || '',
      galleryLink: formData.galleryLink || '',
      videoTourLink: formData.videoTourLink || '',
    },
  });

  const getCurrentForm = () => {
    switch (currentStep) {
      case 0: return generalForm;
      case 1: return academicsForm;
      case 2: return facilitiesForm;
      case 3: return staffForm;
      case 4: return mediaForm;
      default: return generalForm;
    }
  };

  const handleNextStep = async () => {
    const currentForm = getCurrentForm();
    const isValid = await currentForm.trigger();
    
    if (isValid) {
      const data = currentForm.getValues();
      const updatedFormData = { ...formData, ...data };
      setFormData(updatedFormData);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await mediaForm.trigger();
    if (!isValid) return;

    setIsSubmitting(true);
    
    try {
      const mediaData = mediaForm.getValues();
      const completeData: CompleteSchoolData = {
        ...formData,
        ...mediaData,
      } as CompleteSchoolData;

      console.log('Complete school registration data:', completeData);
      
      // Clear localStorage after successful submission
      localStorage.removeItem('schoolOnboardingData');
      
      // updateUser({ isFirstLogin: false });
      
      toast({
        title: 'School registered successfully!',
        description: 'You can now access the dashboard.',
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <SchoolGeneralStep form={generalForm} />;
      case 1:
        return <SchoolAcademicsStep form={academicsForm} onSubmit={() => {}} />;
      case 2:
        // return <SchoolFacilitiesStep form={facilitiesForm} />;
      case 3:
        // return <SchoolStaffStep form={staffForm} />;
      case 4:
        return <SchoolMediaStep form={mediaForm} />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout 
      currentStep={currentStep} 
      totalSteps={steps.length} 
      steps={steps}
    >
      {renderStepContent()}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={handleNextStep}
        onPrevious={handlePrevStep}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </OnboardingLayout>
  );
};
