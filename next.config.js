const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO : 쇼핑몰별 이미지 host 추가
  images: {
    remotePatterns: [
      {
        // 무신사
        protocol: 'https',
        hostname: 'image.msscdn.net',
        port: '',
        pathname: '/images/goods_img/**',
      },
      {
        // 에이블리
        protocol: 'https',
        hostname: 'cf.product-image.s.zigzag.kr',
        port: '',
        pathname: '/original/**',
      },
    ],
  },
}

module.exports = withVanillaExtract(nextConfig)
