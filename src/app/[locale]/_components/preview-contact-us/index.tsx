import MapBoxWithAddress from '@/components/ui/mapbox-with-address'
import SectionHeading from '@/components/ui/section-heading'
import {
    Clock,
    Facebook,
    Instagram,
    MessageCircle,
    Phone
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function PreviewContactUs() {
    const t = await getTranslations('homePage.previewContactUs')
    const tContactUs = await getTranslations('contactUs')

    return (
        <div className="relative mx-auto grid h-full w-full max-w-custom-wide grid-cols-1 flex-col gap-6 px-4 py-20 md:py-24 lg:grid-cols-2">
            <MapBoxWithAddress className="order-2 lg:order-1" />
            <div className="order-1 space-y-5 lg:order-2">
                <SectionHeading
                    titleTop={t('titleTop')}
                    titleBottom={t('titleBottom')}
                    side={'center'}
                />
                <div className="rounded-lg border p-4">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex flex-col items-center space-x-4 max-md:gap-1 md:flex-row md:items-start">
                            <div className="flex items-center gap-2">
                                <Clock className="mt-1 h-6 w-6 shrink-0 text-gray-600 dark:text-primary" />
                                <h4 className="font-semibold text-gray-900 dark:text-stone-300 md:hidden">
                                    {tContactUs('businessHours.title')}
                                </h4>
                            </div>
                            <div className="text-center md:text-start">
                                <h4 className="font-semibold text-gray-900 dark:text-stone-300 max-md:hidden">
                                    {tContactUs('businessHours.title')}
                                </h4>
                                <p className="text-muted-foreground">
                                    {tContactUs('businessHours.moday-friday')}
                                    <br />
                                    {tContactUs('businessHours.saturday')}
                                    <br />
                                    {tContactUs('businessHours.sunday')}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 max-md:items-center">
                            <div className="flex items-start space-x-4">
                                <Phone className="mt-1 h-6 w-6 shrink-0 text-gray-600 dark:text-primary" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-stone-300">
                                        {tContactUs('phone.title')}
                                    </h4>
                                    <p className="text-muted-foreground">
                                        {tContactUs('phone.desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-gray-600 dark:text-primary" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-stone-300">
                                        {tContactUs('whatsApp.title')}
                                    </h4>
                                    <p className="text-muted-foreground">
                                        {tContactUs('whatsApp.desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4 lg:items-start">
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-stone-300">
                        {tContactUs('socialMedia.title')}
                    </h4>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-600 transition-colors dark:text-primary"
                            aria-label="Facebook"
                        >
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 transition-colors dark:text-primary"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
