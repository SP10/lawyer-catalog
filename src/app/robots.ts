import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${process.env.HOST}/sitemap.xml`,
})

export default robots