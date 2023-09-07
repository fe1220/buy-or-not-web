'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import localFont from 'next/font/local'
import './globals.css'
import { fontTheme, themeClass } from './theme.css'
import Toast from './components/Toast'
import { RecoilRoot } from 'recoil'

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/Pretendard/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
})

const matter = localFont({
  src: [
    { path: '../../public/fonts/Matter/Matter-Regular.ttf', weight: '400' },
    { path: '../../public/fonts/Matter/Matter-Bold.ttf', weight: '700' },
  ],
  display: 'swap',
  variable: '--matter',
  fallback: ['sans-serif'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          {/* https://stackoverflow.com/questions/35178135/how-to-fix-insecure-content-was-loaded-over-https-but-requested-an-insecure-re */}
          {/* <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        /> */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={[pretendard.className, themeClass].join(' ')}
          style={assignInlineVars({
            [fontTheme.matter]: matter.style.fontFamily,
            [fontTheme.pretendard]: pretendard.style.fontFamily,
          })}
        >
          {children}
          <Toast />
        </body>
      </html>
    </RecoilRoot>
  )
}
