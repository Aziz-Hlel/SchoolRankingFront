
import React, { useState, type ComponentType, type JSX, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Globe, Users, GraduationCap, Building } from 'lucide-react';
import { EditSchoolSectionDialog } from './EditSchoolSectionDialog';
import useApi from '@/hooks/useApi';
import apiGateway from '@/service/Api/apiGateway';
import { useAuth } from '@/contexts/AuthContext';
import type { SchoolDetailed } from '@/types/School2.type';
import GeneralCardContent from './MySchool/GeneralCardContent';
import AcademicCardContent from './MySchool/AcademicCardContent';
import FacilitiesCardContent from './MySchool/FacilitiesCardContent';
import StaffCardContent from './MySchool/StaffCardContent';
import MediaCardContent from './MySchool/MediaCardContent';
import SectionHeader from './MySchool/SectionHeader';

interface sectionsProps {
  id: string,
  title: string,
  icon: any,
  color: string,
  data: any,
  component: ReactNode
}


export const MySchool: React.FC = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const { user } = useAuth();
  const schoolId = user!.schoolId;
  const { data } = useApi<SchoolDetailed>({ url: apiGateway.school.getDetailedSchool(schoolId), queryKey: ['my-school'], options: { fetchOnMount: true } })

  const school2 = data?.data;

  if (!school2) return <div className="p-4">Loading school data...</div>;

  // Mock school data - in a real app, this would come from an API
  const schoolData = {
    general: {
      name: 'Sunrise International School',
      description: 'A leading international school committed to excellence in education',
      website: 'https://sunriseschool.edu',
      address: '123 Education Street, Manama, Bahrain',
      phone: '+973 1234 5678',
      email: 'info@sunriseschool.edu',
      established: '1995',
      schoolType: 'International',
      curriculum: 'IB',
      educationLevel: 'Primary, Secondary',
      studentCapacity: 1200,
      currentEnrollment: 980,
      applicationDeadline: '2024-03-31',
      tuitionRange: '$8,000 - $12,000',
      languageOfInstruction: 'English'
    },
    academic: {
      gradeRange: 'KG1 - Grade 12',
      subjects: ['Mathematics', 'Science', 'English', 'Arabic', 'Social Studies', 'Arts', 'Physical Education'],
      programs: ['IB Primary Years Programme', 'IB Middle Years Programme', 'IB Diploma Programme'],
      achievements: ['Outstanding Academic Performance Award 2023', 'Best International School 2022']
    },
    facilities: {
      facilities: ['Library', 'Science Labs', 'Sports Complex', 'Auditorium', 'Swimming Pool'],
      resources: ['Smart Classrooms', 'Computer Lab', 'Art Studio', 'Music Room'],
      sustainability: ['Solar Panels', 'Recycling Program', 'Green Building Certification']
    },
    staff: {
      totalStaff: 85,
      teacherQualifications: 'Bachelor\'s and Master\'s degrees with teaching certifications',
      nationalities: ['British', 'American', 'Canadian', 'Australian', 'Local'],
      languages: ['English', 'Arabic', 'French', 'Spanish']
    },
    media: {
      brochureLink: 'https://sunriseschool.edu/brochure',
      galleryLink: 'https://sunriseschool.edu/gallery',
      videoTourLink: 'https://sunriseschool.edu/tour'
    }
  };
  console.log(school2.schoolGeneral)
  const sections: sectionsProps[] = [
    {
      id: 'general',
      title: 'School Information',
      icon: Building,
      color: 'bg-blue-100 text-blue-800',
      data: schoolData.general,
      component: <GeneralCardContent section={school2.schoolGeneral} />
    },
    {
      id: 'academic',
      title: 'Academic Programs',
      icon: GraduationCap,
      color: 'bg-green-100 text-green-800',
      data: schoolData.academic,
      component: <AcademicCardContent section={school2.schoolAcademics} />
    },
    {
      id: 'facilities',
      title: 'Facilities & Resources',
      icon: Building,
      color: 'bg-purple-100 text-purple-800',
      data: schoolData.facilities,
      component: <FacilitiesCardContent section={school2.schoolFacilities} />
    },
    {
      id: 'staff',
      title: 'Staff Information',
      icon: Users,
      color: 'bg-orange-100 text-orange-800',
      data: schoolData.staff,
      component: <StaffCardContent section={school2.schoolStaff} />
    },
    {
      id: 'media',
      title: 'Media & Links',
      icon: Globe,
      color: 'bg-pink-100 text-pink-800',
      data: schoolData.media,
      component: <MediaCardContent section={school2.schoolMedia} />,
    }
  ];

  const renderSectionContent = (section: any) => {
    switch (section.id) {
      case 'general':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">School Name</p>
                <p className="font-medium">{section.data.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Established</p>
                <p className="font-medium">{section.data.established}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">School Type</p>
                <p className="font-medium">{section.data.schoolType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Curriculum</p>
                <p className="font-medium">{section.data.curriculum}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{section.data.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm">{section.data.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <a href={section.data.website} className="text-sm text-blue-600 hover:underline">
                {section.data.website}
              </a>
            </div>
          </div>
        );
      case 'academic':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Grade Range</p>
              <p className="font-medium">{section.data.gradeRange}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Programs</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {section.data.programs.map((program: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {program}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Subjects</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {section.data.subjects.map((subject: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 'facilities':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Facilities</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {section.data.facilities.map((facility: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resources</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {section.data.resources.map((resource: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {resource}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 'staff':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Staff</p>
                <p className="font-medium">{section.data.totalStaff}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teacher Qualifications</p>
                <p className="font-medium text-xs lg:text-sm">{section.data.teacherQualifications}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nationalities</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {section.data.nationalities.map((nationality: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {nationality}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 'media':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              {section.data.brochureLink && (
                <a href={section.data.brochureLink} className="block text-sm text-blue-600 hover:underline">
                  📄 School Brochure
                </a>
              )}
              {section.data.galleryLink && (
                <a href={section.data.galleryLink} className="block text-sm text-blue-600 hover:underline">
                  🖼️ Photo Gallery
                </a>
              )}
              {section.data.videoTourLink && (
                <a href={section.data.videoTourLink} className="block text-sm text-blue-600 hover:underline">
                  🎥 Virtual Tour
                </a>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.id} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${section.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base lg:text-lg">{section.title}</CardTitle>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingSection(section.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>


              <CardContent className="pt-0">
                {renderSectionContent(section)}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {
          sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="h-fit">
                <SectionHeader color={section.color} title={section.title} icon={Icon} />
                <CardContent className="pt-0">
                  {section.component}
                </CardContent>
              </Card>
            );
          })

        }
      </div>

      {/* <EditSchoolSectionDialog
        section={editingSection}
        open={!!editingSection}
        onOpenChange={(open) => !open && setEditingSection(null)}
        onSave={(data: any) => {
          console.log('Saving section data:', editingSection, data);
          setEditingSection(null);
        }}
      /> */}
    </div>
  );
};
