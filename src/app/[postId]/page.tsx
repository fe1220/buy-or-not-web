import Image from 'next/image'
import * as style from './page.css'
// TODO : 상대경로 적용해보기
import DefaultProfileImage from '../../../public/images/default-profile.svg'
import { vars } from '../theme.css'

interface PollItem {
  id: number
  itemId: number
  itemUrl: string
  brand: string
  itemName: string
  imgUrl: string
  originalPrice: number
  discountedRate: number
  discountedPrice: number
}

interface PostData {
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
  }
  resultCode: number
  resultMsg: string
}

const Post = async ({ params: { postId } }) => {
  const { result: post } = await getPost(postId)
  const { userNickname, title, content, pollItemResponseList } = post

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
          <p className={style.created}>1시간 전</p>
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
                  src={pollItem.imgUrl}
                  layout="fill"
                  style={{
                    objectPosition: 'top',
                  }}
                  alt={`${index ? '두번째' : '첫번째'} 아이템`}
                  quality={100}
                />
              </div>
              <p className={style.brand}>{pollItem.brand}</p>
              <p className={style.name}>{pollItem.itemName}</p>
              <div>
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
      </main>
    </div>
  )
}

const getPost = async (postId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`
  )

  const data: PostData = await res.json()

  if (data.resultCode !== 200) {
    throw new Error('포스트 정보를 가져오지 못했어요😢')
  }

  return data
}

export default Post
