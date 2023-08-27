'use client'

import axios from 'axios'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ShareIcon from '../../../public/images/share.svg'
import { PollItem, Response } from '../types'
import DislikeButton from './DislikeButton'
import * as style from './Poll.css'
import PollButton from './PollButton'

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

  const [userPollItem, setUserPollItem] = useState<
    'A' | 'B' | 'disliked' | null
  >(null)
  const [pollResult, setPollResult] = useState<PollResult | null>(null)

  const url = `https://buy-or-not-web.vercel.app/${postId}`
  const [aRatio, bRatio] = useMemo(() => {
    if (!pollResult) return [null, null]

    const aCount = pollResult.additionalProp1
    const bCount = pollResult.additionalProp2
    const pollCount = aCount + bCount

    const a = Math.round((aCount / pollCount) * 100)
    const b = 100 - a

    return [a, b]
  }, [pollResult])

  const onClickPollButton = async (pollItemId?: number) => {
    if (!postId) return

    // TODO: PATCH api 연동
    const result = await poll(postId, pollItemId)

    // 더미데이터
    // const result: PollResult = {
    //   additionalProp1: 10,
    //   additionalProp2: 6,
    //   additionalProp3: 4,
    // }

    if (pollItemId) {
      setUserPollItem(pollItemId === pollItems[0].itemId ? 'A' : 'B')
    } else {
      setUserPollItem('disliked')
    }
    setPollResult(result)
  }

  const onClickShareButton = () => {
    if (!postId) return

    if (typeof navigator.share !== 'undefined') {
      navigator.share({
        url,
        title: 'buy or not',
        text: 'buy or not',
      })
    } else {
      // copy to clipboard
    }
  }

  return (
    <div className={style.pollWrapper}>
      <div className={style.pollButtonContainer}>
        <PollButton
          pollItemId={pollItems[0].itemId}
          selected={userPollItem === 'A'}
          ratio={aRatio ?? 0}
          isPollDone={pollResult !== null}
          handleClick={onClickPollButton}
        >
          A
        </PollButton>
        <PollButton
          pollItemId={pollItems[1].itemId}
          selected={userPollItem === 'B'}
          ratio={bRatio ?? 0}
          isPollDone={pollResult !== null}
          handleClick={onClickPollButton}
        >
          B
        </PollButton>
      </div>
      <div className={style.buttonContainer}>
        <DislikeButton
          selected={userPollItem === 'disliked'}
          count={pollResult?.additionalProp3 ?? null}
          handleDislike={onClickPollButton}
        />
        <CopyToClipboard
          text={url}
          onCopy={(_text, result) =>
            result
              ? alert(`투표 링크가 클립보드에 복사되었습니다`)
              : alert(`공유하기가 지원되지 않는 환경입니다`)
          }
        >
          <button className={style.shareButton} onClick={onClickShareButton}>
            <Image src={ShareIcon} width={12} height={12} alt="share" />
            공유하기
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

const poll = async (
  postId: string,
  pollItemId?: number
): Promise<PollResult> => {
  const choice = pollItemId ?? 0

  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}/poll`,
    {
      params: {
        choice: choice,
      },
    }
  )

  const {
    result: { result },
  }: PollResultResponse = await res.data

  return result
}

export default Poll
