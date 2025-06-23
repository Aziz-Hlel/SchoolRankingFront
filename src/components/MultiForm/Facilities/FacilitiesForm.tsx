import React, { useState } from 'react'
import { Card } from '../../ui/card'
import Header from '../Header'
import NavigationButtons from '../NavigationButtons'
import { SchoolGeneralStep } from '@/components/UpdateSchool/General/SchoolGeneralStep'
import { type CompleteSchoolData, type SchoolGeneralData, schoolGeneralSchema } from '@/types/school'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import FormBody from './FormBody'

const GeneralForm = () => {

    const [formData, setFormData] = useState<Partial<CompleteSchoolData>>({});

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

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
                <Card className="w-full max-w-4xl mx-auto px-4 lg:px-6">
                    <Header currentStep={0} />

                    <div className=' px-4 lg:px-6'>
                        <FormBody form={generalForm} />
                    </div>

                    
                </Card>
            </div>

        </>
    )
}

export default GeneralForm;