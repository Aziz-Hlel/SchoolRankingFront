import { Card } from '@/components/ui/card'
import React from 'react'
import AbstractUpdateHeader from '../Header/AbstractUpdateHeader'


const AbstractWrapper = ({ children, currentStep }: { children: React.ReactNode, currentStep: number }) => {
    return (
        <>
            <div className="bg-gray-50 flex items-center justify-center px-4 py-8 ">
                <Card className="w-full max-w-4xl mx-auto px-4 lg:px-6">
                    <AbstractUpdateHeader currentStep={currentStep} />

                    <div className=' px-4 lg:px-6'>
                        {children}

                    </div>


                </Card>
            </div>

        </>
    )
}

export default AbstractWrapper