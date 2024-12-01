import React from 'react'
import { AuthCard } from '../_components/auth-card'
import SignInForm from './_components/form'

export default function SignInPage() {
    return (
        <AuthCard headerLabel="Welcome to ASP Members Login Page">
            <SignInForm />
        </AuthCard>
    )
}
