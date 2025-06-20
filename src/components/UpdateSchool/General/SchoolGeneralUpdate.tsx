import { CountryEnum, SchoolTypeEnum } from "@/types/school";
import type { SchoolGeneral } from "@/types/School2.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod"

const SchoolGeneralUpdate = () => {

    const schoolGeneralSchema = z.object({
        name: z.string().min(2, 'School name must be at least 2 characters'),
        country: CountryEnum,
        city: z.string().min(2, 'City must be at least 2 characters'),
        address: z.string().min(5, 'Address must be at least 5 characters'),
        phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
        email: z.string().email('Please enter a valid email address'),
        yearEstablished: z.number()
            .int('Year must be a whole number')
            .min(1800, 'Year must be after 1800')
            .max(2025, 'Year cannot be in the future'),
        website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
        type: SchoolTypeEnum,
    });

    const generalForm = useForm<SchoolGeneral>({
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
        <div>SchoolGeneralUpdate</div>
    )
}

export default SchoolGeneralUpdate