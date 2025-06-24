import { ROLES } from '@/enums/roles';
import type { FormProgress } from '@/types/FormProgress'
import type { User } from '@/types/user'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const useFormRedirect = (user: User | null | undefined, formProgress: FormProgress | null) => {

    const navigate = useNavigate();

    useEffect(() => {

        console.log('t5l useeffect tbdlt haja , formcomplete = ', formProgress?.formsCompleted);
        // Early return if we don't have required data yet
        if (!user || !formProgress) return;

        // Only redirect ADMIN users with incomplete forms
        if (user.role !== ROLES.ADMIN || formProgress.formsCompleted) return;

        const stepRoutes = [
            '/forms/general',
            '/forms/academics',
            '/forms/facilities',
            '/forms/staff',
            '/forms/media'
        ];

        const targetRoute = stepRoutes[formProgress.lastFormStep || 0];

        // Use replace to avoid back button issues
        navigate(targetRoute, { replace: true });

    }, [user?.role, formProgress?.formsCompleted, formProgress?.lastFormStep, navigate]);

}

export default useFormRedirect