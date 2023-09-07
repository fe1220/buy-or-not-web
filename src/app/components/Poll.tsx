'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ShareIcon from '../../../public/images/share.svg'
import { PollItem, Response } from '../types'
import DislikeButton from './DislikeButton'
import * as style from './Poll.css'
import PollButton from './PollButton'
import useToast from '../hooks/useToast'

interface PollResult {
  firstItem: number
  secondItem: number
  unrecommended: number
}

interface PollResultResponse extends Response {
  result: {
    result: PollResult
  }
}

const Poll = ({ pollItems }: { pollItems: PollItem[] }) => {
  const pathname = usePathname()
  const postId = pathname.split('/').pop()

  const { show: showToast } = useToast()

  const [userPollItem, setUserPollItem] = useState<
    'firstItem' | 'secondItem' | 'unrecommended' | null
  >(null)
  const [pollResult, setPollResult] = useState<PollResult | null>(null)

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/${postId}`
  const [aRatio, bRatio] = useMemo(() => {
    if (!pollResult) return [null, null]

    const aCount = pollResult.firstItem
    const bCount = pollResult.secondItem
    const pollCount = aCount + bCount

    const a = Math.round((aCount / pollCount) * 100)
    const b = 100 - a

    return [a, b]
  }, [pollResult])

  const onClickPollButton = async (pollItemId?: number) => {
    if (!postId) return

    // 한번만 투표할 수 있음
    if (pollResult) return

    const result = await poll(postId, pollItemId)

    if (pollItemId) {
      setUserPollItem(
        pollItemId === pollItems[0].id ? 'firstItem' : 'secondItem'
      )
    } else {
      setUserPollItem('unrecommended')
    }
    setPollResult(result)
  }

  const onClickShareButton = async () => {
    if (!postId) return

    if (typeof navigator.share !== 'undefined') {
      // share
      await navigator.share({
        url,
        title: 'buy or not',
        text: 'buy or not',
      })
    } else {
      // copy to clipboard
      await navigator.clipboard?.writeText(url)
      showToast()
    }
  }

  return (
    <div className={style.pollWrapper}>
      <div className={style.pollButtonContainer}>
        <PollButton
          pollItemId={pollItems[0].id}
          selected={userPollItem === 'firstItem'}
          ratio={aRatio ?? 0}
          isPollDone={pollResult !== null}
          handleClick={onClickPollButton}
        >
          A
        </PollButton>
        <PollButton
          pollItemId={pollItems[1].id}
          selected={userPollItem === 'secondItem'}
          ratio={bRatio ?? 0}
          isPollDone={pollResult !== null}
          handleClick={onClickPollButton}
        >
          B
        </PollButton>
      </div>
      <div className={style.buttonContainer}>
        <DislikeButton
          selected={userPollItem === 'unrecommended'}
          count={pollResult?.unrecommended ?? null}
          handleDislike={onClickPollButton}
        />
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
  const choice = pollItemId ?? 0

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/poll?choice=${choice}`,
    {
      method: 'PATCH',
    }
  )

  const { result } = await res.json()

  return result
}

export default Poll
