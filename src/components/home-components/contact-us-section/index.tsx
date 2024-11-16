import SectionHeading from '@/components/ui/section-heading'
import {
    Clock,
    Facebook,
    Instagram,
    MapPin,
    MessageCircle,
    Phone,
} from 'lucide-react'
import MapBox from './map-box'
import { getTranslations } from 'next-intl/server'

export default async function PreviewContactUs() {
    const t = await getTranslations('homePage.previewContactUs')
    const tContactUs = await getTranslations('contactUs')
    return (
        <div className="relative mx-auto grid h-full w-full max-w-custom-wide grid-cols-1 flex-col gap-6 px-4 py-20 md:py-24 lg:grid-cols-2">
            <div className="order-2 space-y-2 lg:order-1">
                <MapBox className="h-[500px] overflow-hidden rounded-lg" />
                <div className="flex items-start space-x-4 rounded-lg border px-4 py-2">
                    <MapPin className="mt-1 h-6 w-6 text-gray-600 dark:text-primary" />
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-stone-300">
                            {t('info.address.title')}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {tContactUs('address.building') +
                                ', ' +
                                tContactUs('address.street')}
                            <br />
                            {tContactUs('address.district') +
                                ', ' +
                                tContactUs('address.city')}
                        </p>
                    </div>
                </div>
            </div>
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
                                    {t('info.businessHours.title')}
                                </h4>
                            </div>
                            <div className="text-center md:text-start">
                                <h4 className="font-semibold text-gray-900 dark:text-stone-300 max-md:hidden">
                                    {t('info.businessHours.title')}
                                </h4>
                                <p className="text-muted-foreground">
                                    {t('info.businessHours.moday-friday')}
                                    <br />
                                    {t('info.businessHours.saturday')}
                                    <br />
                                    {t('info.businessHours.sunday')}
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
                                        {t('info.whatsApp.title')}
                                    </h4>
                                    <p className="text-muted-foreground">
                                        {t('info.whatsApp.desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <Separator className="my-6" />
                    <div className="text-center">
                        <h4 className="mb-2 font-semibold text-gray-900">
                            Ready to Discuss Your Case?
                        </h4>
                        <p className="mb-4 text-sm text-gray-600">
                            Our team is available to provide you with the legal
                            assistance you need.
                        </p>
                        <Button className="bg-gray-900 text-white hover:bg-gray-800">
                            Schedule a Consultation
                        </Button>
                    </div> */}
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4 lg:items-start">
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-stone-300">
                        {t('info.socialMedia.title')}
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
