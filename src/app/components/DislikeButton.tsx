'use client'

import * as style from './Poll.css'
import DislikeIcon from '../../../public/images/dislike.svg'
import DislikedIcon from '../../../public/images/disliked.svg'
import Image from 'next/image'

interface DislikeButtonProps {
  selected: boolean
  count: number | null
  handleDislike: () => void
}

const DislikeButton = ({
  selected,
  count,
  handleDislike,
}: DislikeButtonProps) => {
  return (
    <button
      className={
        selected ? style.unrecommendedButtonSelected : style.unrecommendedButton
      }
      onClick={() => handleDislike()}
    >
      <Image
        src={selected ? DislikedIcon : DislikeIcon}
        width={11}
        height={11}
        alt="unrecommended"
        loading="eager"
      />
      둘다 별로
      {selected && count && ` ${count}`}
    </button>
  )
}

export default DislikeButton
