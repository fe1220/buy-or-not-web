import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isToastVisibleState, toastPropsState } from '../store'

export interface ToastProps {
  message?: string
}

const useToast = () => {
  const [isToastVisible, setIsToastVisible] =
    useRecoilState<boolean>(isToastVisibleState)
  const [toastProps, setToastProps] = useRecoilState<ToastProps | null>(
    toastPropsState
  )

  useEffect(() => {
    if (isToastVisible) {
      setTimeout(() => setIsToastVisible(false), 2500)
    }
  }, [isToastVisible])

  const show = (props?: ToastProps) => {
    props && setToastProps(props)
    setIsToastVisible(true)
  }

  const hide = () => {
    setToastProps(null)
    setIsToastVisible(false)
  }

  return { show, hide }
}

export default useToast
