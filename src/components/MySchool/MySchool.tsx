
import { useEffect, useState, type FC, type ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Users, GraduationCap, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GeneralCardContent from './GeneralCardContent';
import AcademicCardContent from './AcademicCardContent';
import FacilitiesCardContent from './FacilitiesCardContent';
import StaffCardContent from './StaffCardContent';
import MediaCardContent from './MediaCardContent';
import SectionHeader from './SectionHeader';
import { useDetailedSchool } from '@/contexts/DetailedSchoolProvider';
import { useParams } from 'react-router-dom';
import { ROLES } from '@/enums/roles';
import { Button } from '../ui/button';
import { PAGES } from '@/data/pages';
import { useChangePage } from '@/hooks/useChangePage';

interface sectionsProps {
  id: string,
  title: string,
  icon: any,
  color: string,
  data: any,
  component: ReactNode
  editPath: string
}


export const MySchool: FC<{ userRole: ROLES }> = ({ userRole }) => {

  const [editingSection, setEditingSection] = useState<string | null>(null);

  useChangePage(PAGES.personalSchool);

  const { user } = useAuth();
  const schoolId2 = user!.schoolId;
  const { detailedSchool, fetchDetailedSchool } = useDetailedSchool();
  const school2 = detailedSchool;

  const { schoolId: schoolIdParam } = useParams();

  useEffect(() => {
    if (schoolIdParam && userRole === ROLES.SUPER_ADMIN) {
      console.log('t5llllll schoolId :: from param : ', schoolIdParam);
      fetchDetailedSchool(schoolIdParam);

    }
  }, [userRole, schoolIdParam])

  useEffect(() => {
    console.log('t5llllll schoolId :: from user : ', schoolIdParam);
  }, [schoolIdParam])



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
      editPath: "edit/general",
      data: schoolData.general,
      component: <GeneralCardContent section={school2.schoolGeneral} />
    },
    {
      id: 'academic',
      title: 'Academic Programs',
      icon: GraduationCap,
      color: 'bg-green-100 text-green-800',
      editPath: "edit/academic",
      data: schoolData.academic,
      component: <AcademicCardContent section={school2.schoolAcademics} />
    },
    {
      id: 'facilities',
      title: 'Facilities & Resources',
      icon: Building,
      color: 'bg-purple-100 text-purple-800',
      editPath: "edit/facilities",
      data: schoolData.facilities,
      component: <FacilitiesCardContent section={school2.schoolFacilities} />
    },
    {
      id: 'staff',
      title: 'Staff Information',
      icon: Users,
      color: 'bg-orange-100 text-orange-800',
      editPath: "edit/staff",
      data: schoolData.staff,
      component: <StaffCardContent section={school2.schoolStaff} />
    },
    {
      id: 'media',
      title: 'Media & Links',
      icon: Globe,
      color: 'bg-pink-100 text-pink-800',
      editPath: "edit/media",
      data: schoolData.media,
      component: <MediaCardContent section={school2.schoolMedia} />,
    }
  ];

  const Icon = sections[0].icon;
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {
          sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="h-fit">
                <SectionHeader color={section.color} title={section.title} icon={Icon} editPath={section.editPath} />
                <CardContent className="pt-0">
                  {section.component}
                </CardContent>
              </Card>
            );
          })

        }
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">

        <Card key={sections[0].id + "xx"} className="h-fit">
          <SectionHeader color={sections[0].color} title={sections[0].title} icon={Icon} editPath={sections[0].editPath} />
          <CardContent className="pt-0">
            <GeneralCardContent section={school2.schoolGeneral} />
          </CardContent>
        </Card>

        <Card key={sections[1].id + "xx"} className="h-fit">
          <SectionHeader color={sections[1].color} title={sections[1].title} icon={Icon} editPath={sections[1].editPath} />
          <CardContent className="pt-0">
            <AcademicCardContent section={school2.schoolAcademics} />
          </CardContent>
        </Card>


        <Card key={sections[2].id + "xx"} className="h-fit">
          <SectionHeader color={sections[2].color} title={sections[2].title} icon={Icon} editPath={sections[2].editPath} />
          <CardContent className="pt-0">
            <FacilitiesCardContent section={school2.schoolFacilities} />

          </CardContent>
        </Card>


        <Card key={sections[3].id + "xx"} className="h-fit">
          <SectionHeader color={sections[3].color} title={sections[3].title} icon={Icon} editPath={sections[3].editPath} />
          <CardContent className="pt-0">
            <StaffCardContent section={school2.schoolStaff} />
          </CardContent>
        </Card>


        <Card key={sections[4].id + "xx"} className="h-fit">
          <SectionHeader color={sections[4].color} title={sections[4].title} icon={Icon} editPath={sections[4].editPath} />
          <CardContent className="pt-0">
            <MediaCardContent section={school2.schoolMedia} />
          </CardContent>
        </Card>


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
    </div >
  );
};
