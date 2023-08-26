'use client'

import Image from 'next/image'
import * as style from './Poll.css'
import CheckIcon from '../../../public/images/check.svg'
import { vars } from '../theme.css'
import { ReactNode } from 'react'

interface PollButtonProps {
  pollItemId: number
  isPollDone: boolean
  selected: boolean
  handleClick: (pollItemId: number) => void
  ratio: number
  children: ReactNode
}

const PollButton = ({
  pollItemId,
  isPollDone,
  selected,
  handleClick,
  ratio,
  children,
}: PollButtonProps) => {
  return (
    <button
      className={
        !isPollDone
          ? style.pollButton
          : selected
          ? style.pollButtonSelected
          : style.pollButtonUnselected
      }
      onClick={() => handleClick(pollItemId)}
    >
      {children}
      {isPollDone && (
        <>
          <div
            className={
              selected ? style.buttonDividerSelected : style.buttonDivider
            }
          >
            |
          </div>
          <div>{ratio}%</div>
          {selected && (
            <Image
              src={CheckIcon}
              width={14}
              height={14}
              alt="checked circle"
              loading="eager"
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
          width: `${ratio}%`,
          transition: 'width 0.5s ease',
          background: selected
            ? vars.color.primary[100]
            : vars.color.slate[300],
          zIndex: -1,
        }}
      />
    </button>
  )
}

export default PollButton
