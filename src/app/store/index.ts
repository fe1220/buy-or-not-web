import { atom } from 'recoil'
import { ToastProps } from '../hooks/useToast'

export const isToastVisibleState = atom<boolean>({
  key: 'is-toast-visible',
  default: false,
})

export const toastPropsState = atom<ToastProps | null>({
  key: 'toast-props',
  default: null,
})
