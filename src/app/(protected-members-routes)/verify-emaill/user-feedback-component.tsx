'use client'

import { PageLoadingIndicator } from '@/components/ui/loading-indicator'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { FrownIcon, SmileIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { verifyEmailAction } from './action'
import { createRedirectUrl } from '../lib/server/utils'

export default function UserFeedbackComponent() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState('Verifying your email address..')
    const { toast } = useToast()
    const code = useSearchParams().get('code')

    const { mutate: verifyEmail } = useMutation({
        mutationFn: verifyEmailAction,
        onSettled: (res) => {
            const successful = res?.success ?? false
            const toastDescription = res?.message ?? 'Internal server error.\nTry refreshing the page'
            const feedbackMessage = res?.message ?? 'We have encountered an error.\nPlease try refreshing the page'
            setIsSuccess(successful)
            setMessage(feedbackMessage)
            toast({ variant: successful ? 'successful' : 'destructive', description: toastDescription })
            setIsLoading(false)
            if (res?.redirect) {
                router.push(createRedirectUrl(res.redirect.path, { ...res.redirect.params }))
            }
        },
    })

    useEffect(() => {
        if (!code) {
            setIsLoading(false)
            setIsSuccess(false)
            setMessage('No verification code provided.')
        } else {
            verifyEmail(code)
        }
    }, [code, verifyEmail])

    if (isLoading) {
        return <PageLoadingIndicator message={message} />
    }

    return (
        <div className="flex flex-col gap-4">
            {isSuccess ? <SmileIcon className="shrink-0" size={50} /> : <FrownIcon className="shrink-0" size={50} />}
            <h1 role="alert" className="text-2xl">
                {isSuccess ? 'Heads Up!' : 'Oh noose!'}
            </h1>
            <p role="status">{message}</p>
        </div>
    )
}
