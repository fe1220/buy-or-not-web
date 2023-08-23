export interface Response {
  resultCode: number
  resultMsg: string
}

export interface PollItem {
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
