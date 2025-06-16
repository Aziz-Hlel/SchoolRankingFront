
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { School, Users, Building, BookOpen, Award } from 'lucide-react';

interface SchoolInfo {
  schoolName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  principalName: string;
  establishedYear: string;
  studentCount: string;
  description: string;
}

const mockSchoolData: SchoolInfo = {
  schoolName: 'Lincoln Elementary School',
  address: '123 Main St, Springfield, IL 62701',
  phone: '(555) 123-4567',
  email: 'info@lincoln.edu',
  website: 'https://lincoln.edu',
  principalName: 'Dr. Mary Wilson',
  establishedYear: '1985',
  studentCount: '450',
  description: 'Lincoln Elementary is dedicated to providing quality education in a nurturing environment.',
};

export const SchoolProfile: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('general');

  const sections = [
    { id: 'general', title: 'School Information', icon: School },
    { id: 'academic', title: 'Academic Programs', icon: BookOpen },
    { id: 'facilities', title: 'Facilities & Resources', icon: Building },
    { id: 'staff', title: 'Staff & Leadership', icon: Users },
    { id: 'achievements', title: 'Awards & Recognition', icon: Award },
  ];

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'general':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">School Name</h4>
              <p className="text-sm">{mockSchoolData.schoolName}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Principal</h4>
              <p className="text-sm">{mockSchoolData.principalName}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Address</h4>
              <p className="text-sm">{mockSchoolData.address}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Established</h4>
              <p className="text-sm">{mockSchoolData.establishedYear}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Contact</h4>
              <p className="text-sm">{mockSchoolData.phone}</p>
              <p className="text-sm">{mockSchoolData.email}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Students</h4>
              <p className="text-sm">{mockSchoolData.studentCount} enrolled</p>
            </div>
          </div>
        );
      case 'academic':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Programs Offered</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Elementary Education</Badge>
                <Badge variant="secondary">STEM Program</Badge>
                <Badge variant="secondary">Arts & Music</Badge>
                <Badge variant="secondary">Physical Education</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Curriculum</h4>
              <p className="text-sm">Common Core State Standards aligned curriculum with emphasis on critical thinking and creativity.</p>
            </div>
          </div>
        );
      case 'facilities':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Available Facilities</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Library</Badge>
                <Badge variant="outline">Computer Lab</Badge>
                <Badge variant="outline">Gymnasium</Badge>
                <Badge variant="outline">Playground</Badge>
                <Badge variant="outline">Art Room</Badge>
                <Badge variant="outline">Music Room</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Technology</h4>
              <p className="text-sm">Modern computer lab with 30 workstations, interactive whiteboards in all classrooms.</p>
            </div>
          </div>
        );
      case 'staff':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Leadership Team</h4>
              <p className="text-sm">Principal: {mockSchoolData.principalName}</p>
              <p className="text-sm">Vice Principal: Dr. James Anderson</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Staff Overview</h4>
              <p className="text-sm">25 certified teachers, 5 support staff, student-teacher ratio 18:1</p>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Recent Awards</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Excellence in Education Award 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Green School Certification 2022</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">School Profile</h2>
          <p className="text-muted-foreground">Overview of your school information</p>
        </div>
        <Button>Edit Profile</Button>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.id}
              className={`cursor-pointer transition-colors ${
                selectedSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedSection(section.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Section Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(sections.find(s => s.id === selectedSection)?.icon || School, { className: "w-5 h-5" })}
            {sections.find(s => s.id === selectedSection)?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderSectionContent()}
        </CardContent>
      </Card>
    </div>
  );
};
