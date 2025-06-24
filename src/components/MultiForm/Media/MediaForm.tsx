import { Card } from "@/components/ui/card";
import Header from "../Header";
import FormBody from "./FormBody";

const MediaForm = () => {


    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
                <Card className="w-full max-w-4xl mx-auto px-4 lg:px-6">
                    <Header currentStep={3} />

                    <div className=' px-4 lg:px-6'>
                        <FormBody />
                    </div>


                </Card>
            </div>

        </>
    )
}

export default MediaForm;