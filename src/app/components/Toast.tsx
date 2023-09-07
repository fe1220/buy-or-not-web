import { useRecoilValue } from 'recoil'
import * as style from './Toast.css'
import { isToastVisibleState, toastPropsState } from '../store'

const SHARE_MESSAGE = `✅ 투표 링크가 클립보드에 복사되었어요`

const Toast = () => {
  const isToastVisible = useRecoilValue(isToastVisibleState)
  const toastProps = useRecoilValue(toastPropsState)

  const message = toastProps?.message || SHARE_MESSAGE

  return (
    <div
      className={
        isToastVisible ? style.toastContainer : style.toastContainerHidden
      }
    >
      <span>{message}</span>
    </div>
  )
}

export default Toast
