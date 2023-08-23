'use client'

import { PollItem, Response } from '../types'
import * as style from './Poll.css'
import DislikeIcon from '../../../public/images/dislike.svg'
import ShareIcon from '../../../public/images/share.svg'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface PollResult {
  additionalProp1: number
  additionalProp2: number
  additionalProp3: number
}

interface PollResultResponse extends Response {
  result: {
    result: PollResult
  }
}

const Poll = ({ pollItems }: { pollItems: PollItem[] }) => {
  const pathname = usePathname()
  const postId = pathname.split('/').pop()

  const [isPollDone, setIsPollDone] = useState<boolean>(false)
  const [pollResult, setPollResult] = useState<PollResult | null>(null)

  const onClickPollButton = async (pollItemId?: number) => {
    if (!postId) return

    const result = await poll(postId, pollItemId)

    setPollResult(result)
    setIsPollDone(true)
  }

  const onClickShareButton = () => {
    if (!postId) return

    // window.navigator.share({
    //   url: `https://buy-or-not-web.vercel.app/${postId}`,
    // })
  }

  return (
    <div className={style.pollWrapper}>
      <div className={style.pollButtonContainer}>
        <button
          className={style.pollButton}
          onClick={() => onClickPollButton(pollItems[0].itemId)}
        >
          A
        </button>
        <button
          className={style.pollButton}
          onClick={() => onClickPollButton(pollItems[1].itemId)}
        >
          B
        </button>
      </div>
      <div className={style.buttonContainer}>
        <button
          className={style.unrecommendedButton}
          onClick={() => onClickPollButton()}
        >
          <Image src={DislikeIcon} width={11} height={11} alt="unrecommended" />
          둘다 별로
        </button>
        <button className={style.shareButton} onClick={onClickShareButton}>
          <Image src={ShareIcon} width={12} height={12} alt="share" />
          공유하기
        </button>
      </div>
    </div>
  )
}

const poll = async (
  postId: string,
  pollItemId?: number
): Promise<PollResult> => {
  const choice = pollItemId ?? 'unrecommended'

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/poll?choice=${choice}`,
    {
      method: 'PATCH',
    }
  )

  const {
    result: { result },
  }: PollResultResponse = await res.json()

  return result
}

export default Poll
