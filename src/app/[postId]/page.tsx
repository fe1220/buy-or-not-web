import { headers } from 'next/headers'
import Image from 'next/image'
import DefaultProfileImage from '../../../public/images/default-profile.svg'
import Poll from '../components/Poll'
import { vars } from '../theme.css'
import type { PollItem } from '../types'
import * as style from './page.css'

interface PostPageProps {
  params: {
    postId: number
  }
}

interface PostResponse {
  result: {
    id: number
    userId: string
    userNickname: string
    title: string
    content: string
    publicStatus: 'PUBLIC' | 'PRIVATE'
    pollStatus: 'ONGOING'
    pollItemResponseList: PollItem[]
    participateStatus: boolean
    pollResponse: {
      result: {
        additionalProp1: number
        additionalProp2: number
        additionalProp3: number
      }
    }
    updatedAt: string
  }
  resultCode: number
  resultMsg: string
}

const Post = async ({ params: { postId } }: PostPageProps) => {
  const postResponse = await getPost(postId)

  const userAgent = headers().get('user-agent')
  const isAndroid = userAgent ? /Android/i.test(userAgent) : false

  if (!postResponse) {
    return (
      <div className={style.mainContainer}>
        투표 정보를 불러오지 못했어요 😢
      </div>
    )
  }

  const { userNickname, title, content, pollItemResponseList, updatedAt } =
    postResponse.result

  console.log(postResponse)

  return (
    <div className={style.mainContainer}>
      {/* UserInfo */}
      <header className={style.userInfoContainer}>
        <Image
          src={DefaultProfileImage}
          width={38}
          height={38}
          alt="default profile"
        />
        <div>
          <p className={style.userName}>{userNickname}</p>
          <p className={style.created}>{formatDate(updatedAt)}</p>
        </div>
      </header>

      {/* Content */}
      <main>
        <h1 className={style.title}>{title}</h1>
        <p className={style.content}>{content}</p>
        {/* PollItems */}
        <section className={style.pollItemList}>
          {pollItemResponseList.map((pollItem, index) => (
            <article
              key={`poll-item-${pollItem.id}-${index}`}
              className={style.pollItem}
            >
              <div className={style.imageWrapper}>
                <Image
                  // TODO: 에이블리 이미지 화질 저하 현상 임시 해결
                  src={pollItem.imgUrl.split('?')[0]}
                  fill
                  style={{
                    objectPosition: 'top',
                    background: vars.color.slate[200],
                  }}
                  alt={`${index ? '두번째' : '첫번째'} 아이템`}
                  quality={100}
                  sizes="50vw"
                  loading="eager"
                  priority
                />
              </div>
              <p className={style.brand}>{pollItem.brand}</p>
              <p className={style.name}>{pollItem.itemName}</p>
              <div className={style.priceContainer}>
                <span className={style.discountedRate}>
                  {pollItem.discountedRate}%
                </span>
                <span className={style.originalPrice}>
                  {pollItem.originalPrice.toLocaleString()}
                  <span className={style.won}>원</span>
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* Poll */}
        <Poll pollItems={pollItemResponseList} />
      </main>

      {isAndroid && (
        <footer className={style.footer}>
          <button className={style.footerButton}>
            앱으로 다른 투표 모두 보기
          </button>
        </footer>
      )}
    </div>
  )
}

const getPost = async (postId: number) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`)

    const postResponse: PostResponse = await res.json()

    console.log(postResponse)

    if (postResponse.resultCode !== 200) {
      throw new Error('포스트 정보를 가져오지 못했어요😢')
    }

    return postResponse
  } catch (err) {
    console.log(err)
  }
}

const formatDate = (date: string) => {
  const milliSeconds = new Date().getTime() - new Date(date).getTime()
  const seconds = milliSeconds / 1000

  if (seconds < 60) return `방금 전`

  const minutes = seconds / 60
  if (minutes < 60) return `${Math.floor(minutes)}분 전`

  const hours = minutes / 60
  if (hours < 24) return `${Math.floor(hours)}시간 전`

  const days = hours / 24
  return `${Math.floor(days)}일 전`
}

export default Post
