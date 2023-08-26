'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import CheckIcon from '../../../public/images/check.svg'
import DislikeIcon from '../../../public/images/dislike.svg'
import DislikedIcon from '../../../public/images/disliked.svg'
import ShareIcon from '../../../public/images/share.svg'
import { vars } from '../theme.css'
import { PollItem, Response } from '../types'
import * as style from './Poll.css'

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

    // const result = await poll(postId, pollItemId)

    const result: PollResult = {
      additionalProp1: 10,
      additionalProp2: 6,
      additionalProp3: 4,
    }

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
        <button
          className={
            pollResult === null
              ? style.pollButton
              : userPollItem === 'A'
              ? style.pollButtonSelected
              : style.pollButtonUnselected
          }
          onClick={() => onClickPollButton(pollItems[0].itemId)}
        >
          A
          {pollResult && (
            <>
              <div
                className={
                  userPollItem === 'A'
                    ? style.buttonDividerSelected
                    : style.buttonDivider
                }
              >
                |
              </div>
              <div>{aRatio}%</div>
              {userPollItem === 'A' && (
                <Image
                  src={CheckIcon}
                  width={14}
                  height={14}
                  alt="checked circle"
                />
              )}
            </>
          )}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${aRatio ?? 0}%`,
              transition: 'width 0.5s ease',
              background:
                userPollItem === 'A'
                  ? vars.color.primary[100]
                  : vars.color.slate[300],
              zIndex: -1,
            }}
          />
        </button>
        <button
          className={
            pollResult === null
              ? style.pollButton
              : userPollItem === 'B'
              ? style.pollButtonSelected
              : style.pollButtonUnselected
          }
          onClick={() => onClickPollButton(pollItems[1].itemId)}
        >
          B
          {pollResult && (
            <>
              <div
                className={
                  userPollItem === 'B'
                    ? style.buttonDividerSelected
                    : style.buttonDivider
                }
              >
                |
              </div>
              <div>{bRatio}%</div>
              {userPollItem === 'B' && (
                <Image
                  src={CheckIcon}
                  width={14}
                  height={14}
                  alt="checked circle"
                />
              )}
            </>
          )}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${bRatio ?? 0}%`,
              transition: 'width 0.5s ease',
              background:
                userPollItem === 'B'
                  ? vars.color.primary[100]
                  : vars.color.slate[300],
              zIndex: -1,
            }}
          />
        </button>
      </div>
      <div className={style.buttonContainer}>
        <button
          className={
            userPollItem === 'disliked'
              ? style.unrecommendedButtonSelected
              : style.unrecommendedButton
          }
          onClick={() => onClickPollButton()}
        >
          <Image
            src={userPollItem === 'disliked' ? DislikedIcon : DislikeIcon}
            width={11}
            height={11}
            alt="unrecommended"
          />
          둘다 별로
          {userPollItem === 'disliked' &&
            pollResult?.additionalProp3 &&
            ` ${pollResult.additionalProp3}`}
        </button>
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
