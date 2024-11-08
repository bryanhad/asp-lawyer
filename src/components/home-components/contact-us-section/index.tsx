import { SectionContainer } from '@/components/containers/section-container'
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

export default function PreviewContactUs() {
    return (
        <SectionContainer
            variant="naked"
            className="relative grid h-full max-w-[1620px] grid-cols-1 gap-6 px-4 md:py-24 lg:grid-cols-2"
        >
            <div className="order-2 space-y-2 lg:order-1">
                <MapBox className="h-[500px] overflow-hidden rounded-lg" />
                <div className="flex items-start space-x-4 rounded-lg border px-4 py-2">
                    <MapPin className="mt-1 h-6 w-6 text-gray-600" />
                    <div>
                        <h4 className="font-semibold text-gray-900">Address</h4>
                        <p className="text-sm text-gray-600">
                            The H Tower, 15th Floor Unit 15 - F, Jl. H. R.
                            Rasuna Said No.20, RT.1/RW.5
                            <br />
                            Karet Kuningan, Kecamatan Setiabudi, Jakarta
                            Selatan, DKI Jakarta 12940
                        </p>
                    </div>
                </div>
            </div>
            <div className="order-1 space-y-5 lg:order-2">
                <SectionHeading
                    titleTop={'Get in Touch,'}
                    titleBottom={'We are Ready'}
                    side={'center'}
                />
                <div className="rounded-lg border p-4">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="flex flex-col items-center space-x-4 max-md:gap-1 md:flex-row md:items-start">
                            <div className="flex items-center gap-2">
                                <Clock className="mt-1 h-6 w-6 shrink-0 text-gray-600" />
                                <h4 className="font-semibold text-gray-900 md:hidden">
                                    Business Hours
                                </h4>
                            </div>
                            <div className="text-center md:text-start">
                                <h4 className="font-semibold text-gray-900 max-md:hidden">
                                    Business Hours
                                </h4>
                                <p className="text-gray-600">
                                    Monday - Friday: 9:00 AM - 6:00 PM
                                    <br />
                                    Saturday: 9:00 AM - 1:00 PM
                                    <br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 max-md:items-center">
                            <div className="flex items-start space-x-4">
                                <Phone className="mt-1 h-6 w-6 shrink-0 text-gray-600" />
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        Phone
                                    </h4>
                                    <p className="text-gray-600">
                                        +62 21 1234 5678
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-gray-600" />
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        WhatsApp
                                    </h4>
                                    <p className="text-gray-600">
                                        +62 812 3456 7890
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
                <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold text-gray-900">
                        Social Media
                    </h4>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-600 transition-colors hover:text-gray-900"
                            aria-label="Facebook"
                        >
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 transition-colors hover:text-gray-900"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </SectionContainer>
    )
}
