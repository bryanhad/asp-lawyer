import { Scale, Users, Trophy } from 'lucide-react'
import StartCounter from '@/components/ui/start-counter'

export default function SelfGlazingStats() {
    return (
        <div className="grid grid-cols-1  max-sm:gap-6 sm:grid-cols-3">
            <StartCounter
                className="items-center gap-4 md:items-start"
                to={7}
                desc="Years Experience"
                prefix={
                    <Trophy
                        className="mb-[1px] shrink-0 text-primary"
                        size={18}
                    />
                }
            />
            <StartCounter
                className="items-center gap-4 md:items-start"
                to={250}
                desc="Cases Won"
                prefix={
                    <Scale
                        className="mb-[1px] shrink-0 text-primary"
                        size={18}
                    />
                }
            />
            <StartCounter
                className="items-center gap-4 md:items-start"
                to={98}
                desc="Client Satisfaction"
                suffix="%"
                prefix={
                    <Users
                        className="mb-[1px] shrink-0 text-primary"
                        size={18}
                    />
                }
            />
        </div>
    )
}
