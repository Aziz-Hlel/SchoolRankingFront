import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/contexts/AuthContext';
import React from 'react'
import { Navigate } from 'react-router-dom';

const Login2 = () => {
    const { user } = useAuth();

    if (user) return <Navigate to="/dashboard" />

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>

    )
}

export default Login2