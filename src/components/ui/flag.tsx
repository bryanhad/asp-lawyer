import Image from 'next/image'
import React, { memo } from 'react'
import flagEN from '/public/flag-en.svg'
import flagID from '/public/flag-id.svg'
import SimplePopover from './simple-pop-over'

type Props = {
    flag: 'id' | 'en'
    round?: boolean
}

const Flag = memo(function Flag({ flag, round = false }: Props) {
    if (round)
        return (
            <SimplePopover tip={flag === 'en' ? 'English' : 'Indonesian'} className='border-none p-0'>
                <div className="relative aspect-square w-[20px] overflow-hidden rounded-full ring-[1px] ring-foreground/20">
                    <Image
                        className="scale-150"
                        src={flag === 'en' ? flagEN : flagID}
                        alt={flag === 'en' ? 'English Flag' : 'Indonesian Flag'}
                        width={20}
                        height={20}
                        priority
                    />
                </div>
            </SimplePopover>
        )

    return (
        <Image
            src={flag === 'en' ? flagEN : flagID}
            alt={flag === 'en' ? 'English Flag' : 'Indonesian Flag'}
            width={24}
            height={18}
            priority
        />
    )
})

export default Flag
