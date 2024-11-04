import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

type Props = React.PropsWithChildren

export function PracticeAreaTagsCarousel({ children }: Props) {
    return (
        <Carousel className="w-full">
            <CarouselContent>{children}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
