import { Form } from "@/components/ui/form";
import apiGateway from "@/service/Api/apiGateway";
import { apiService } from "@/service/Api/apiService";
import { schoolAcademicsSchema } from "@/types/School2.type";
import safeAsyncMutate from "@/utils/safeAsyncMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type z from "zod";
import DetachedAcademics from "../../DetachedForms/Academics/DetachedAcademics";
import AbstractWrapper from "./AbstractWrapper";
import NavigationButtons from "../NavigationButton/NavigationButtons";
import { useDetailedSchool } from "@/contexts/DetailedSchoolProvider";
import useApiMutation from "@/hooks/useApiMutation";



type SchoolAcademics = z.infer<typeof schoolAcademicsSchema>;

const AcademicsUpdateForm = () => {

    const { detailedSchool } = useDetailedSchool();
    const school = detailedSchool!;
    const schoolId = school.schoolGeneral!.id


    const navigate = useNavigate();

    const form = useForm<SchoolAcademics>({
        resolver: zodResolver(schoolAcademicsSchema),
        defaultValues: school.schoolAcademics
    });

    const mutationFn = (payload: SchoolAcademics) => apiService.putThrowable(apiGateway.form.academics.update(schoolId, school.schoolAcademics!.id), payload);

    // const { mutateAsync, isPending } = useMutation({ mutationFn, });
    const { safeAsyncMutate, isPending } = useApiMutation({ mutationFn, queryKey: ["school", "detailed", schoolId] });


    const onSubmit = async (data: SchoolAcademics) => {

        const response = await safeAsyncMutate(data);

        if (!response.success) {
            console.error("Failed to submit academics form", response.error);
            return;
        }
        navigate('../../');



    }

    return (
        <>
            <AbstractWrapper currentStep={1}>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                        <DetachedAcademics form={form} />

                        <NavigationButtons cancelPath='../../' currentStep={0} isSubmitting={isPending} onNext={() => { }} onPrevious={() => { }} onSubmit={() => { }} />

                    </form>
                </Form>

            </AbstractWrapper>
        </>
    )
}

export default AcademicsUpdateForm;