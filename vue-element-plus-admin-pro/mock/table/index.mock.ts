import { faker } from '@faker-js/faker'
import { SUCCESS_CODE } from '@/constants'
import { toAnyString } from '@/utils'

const delay = 1000
const count = 100

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

interface ListProps {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: any
  pageviews: number
  image_uri: string
  video_uri?: string
}

interface TreeListProps {
  id: string
  author: string
  title: string
  content: string
  importance: number
  display_time: any
  image_uri: string
  pageviews: number
  video_uri?: string
  children?: TreeListProps[]
}

let List: ListProps[] = []

for (let i = 0; i < count; i++) {
  List.push({
    id: toAnyString(),
    // timestamp: +Mock.Random.date('T'),
    author: faker.person.firstName(),
    title: faker.lorem.sentence(),
    content: baseContent,
    importance: faker.number.int({ min: 1, max: 3 }),
    display_time: faker.date.anytime(),
    pageviews: faker.number.int({ min: 300, max: 5000 }),
    image_uri: faker.image.url({
      width: faker.number.int({ min: 200, max: 400 }),
      height: faker.number.int({ min: 200, max: 400 })
    }),
    video_uri:
      '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
  })
}

const treeList: TreeListProps[] = []

for (let i = 0; i < count; i++) {
  treeList.push({
    id: toAnyString(),
    // timestamp: +Mock.Random.date('T'),
    author: faker.person.firstName(),
    title: faker.lorem.sentence(),
    content: baseContent,
    importance: faker.number.int({ min: 1, max: 3 }),
    display_time: faker.date.anytime(),
    pageviews: faker.number.int({ min: 300, max: 5000 }),
    image_uri: faker.image.url({
      width: faker.number.int({ min: 200, max: 400 }),
      height: faker.number.int({ min: 200, max: 400 })
    }),
    video_uri:
      '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
    children: [
      {
        id: toAnyString(),
        // timestamp: +Mock.Random.date('T'),
        author: faker.person.firstName(),
        title: faker.lorem.sentence(),
        content: baseContent,
        importance: faker.number.int({ min: 1, max: 3 }),
        display_time: faker.date.anytime(),
        pageviews: faker.number.int({ min: 300, max: 5000 }),
        image_uri: faker.image.url({
          width: faker.number.int({ min: 200, max: 400 }),
          height: faker.number.int({ min: 200, max: 400 })
        }),
        video_uri:
          '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
        children: [
          {
            id: toAnyString(),
            // timestamp: +Mock.Random.date('T'),
            author: faker.person.firstName(),
            title: faker.lorem.sentence(),
            content: baseContent,
            importance: faker.number.int({ min: 1, max: 3 }),
            display_time: faker.date.anytime(),
            pageviews: faker.number.int({ min: 300, max: 5000 }),
            image_uri: faker.image.url({
              width: faker.number.int({ min: 200, max: 400 }),
              height: faker.number.int({ min: 200, max: 400 })
            }),
            video_uri:
              '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
          },
          {
            id: toAnyString(),
            // timestamp: +Mock.Random.date('T'),
            author: faker.person.firstName(),
            title: faker.lorem.sentence(),
            content: baseContent,
            importance: faker.number.int({ min: 1, max: 3 }),
            display_time: faker.date.anytime(),
            pageviews: faker.number.int({ min: 300, max: 5000 }),
            image_uri: faker.image.url({
              width: faker.number.int({ min: 200, max: 400 }),
              height: faker.number.int({ min: 200, max: 400 })
            }),
            video_uri:
              '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
          }
        ]
      },
      {
        id: toAnyString(),
        // timestamp: +Mock.Random.date('T'),
        author: faker.person.firstName(),
        title: faker.lorem.sentence(),
        content: baseContent,
        importance: faker.number.int({ min: 1, max: 3 }),
        display_time: faker.date.anytime(),
        pageviews: faker.number.int({ min: 300, max: 5000 }),
        image_uri: faker.image.url({
          width: faker.number.int({ min: 200, max: 400 }),
          height: faker.number.int({ min: 200, max: 400 })
        }),
        video_uri:
          '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
      },
      {
        id: toAnyString(),
        // timestamp: +Mock.Random.date('T'),
        author: faker.person.firstName(),
        title: faker.lorem.sentence(),
        content: baseContent,
        importance: faker.number.int({ min: 1, max: 3 }),
        display_time: faker.date.anytime(),
        pageviews: faker.number.int({ min: 300, max: 5000 }),
        image_uri: faker.image.url({
          width: faker.number.int({ min: 200, max: 400 }),
          height: faker.number.int({ min: 200, max: 400 })
        }),
        video_uri:
          '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
      },
      {
        id: toAnyString(),
        // timestamp: +Mock.Random.date('T'),
        author: faker.person.firstName(),
        title: faker.lorem.sentence(),
        content: baseContent,
        importance: faker.number.int({ min: 1, max: 3 }),
        display_time: faker.date.anytime(),
        pageviews: faker.number.int({ min: 300, max: 5000 }),
        image_uri: faker.image.url({
          width: faker.number.int({ min: 200, max: 400 }),
          height: faker.number.int({ min: 200, max: 400 })
        }),
        video_uri:
          '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4'
      }
    ]
    // image_uri
  })
}

export default [
  // 树形列表接口
  {
    url: '/mock/example/treeList',
    method: 'GET',
    delay,
    body: ({ query }) => {
      const { title, pageIndex, pageSize } = query
      const mockList = treeList.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 列表接口
  {
    url: '/mock/example/list',
    method: 'GET',
    delay,
    body: ({ query }) => {
      const { title, pageIndex, pageSize } = query
      const mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 保存接口
  {
    url: '/mock/example/save',
    method: 'POST',
    delay,
    body: ({ body }) => {
      if (!body.id) {
        List = [
          Object.assign(body, {
            id: toAnyString()
          })
        ].concat(List)
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      } else {
        List.map((item) => {
          if (item.id === body.id) {
            for (const key in item) {
              item[key] = body[key]
            }
          }
        })
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  },
  // 详情接口
  {
    url: '/mock/example/detail',
    method: 'GET',
    body: ({ query }) => {
      const { id } = query
      for (const example of List) {
        if (example.id === id) {
          return {
            code: SUCCESS_CODE,
            data: example
          }
        }
      }
    }
  },
  // 删除接口
  {
    url: '/mock/example/delete',
    method: 'POST',
    body: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: 500,
          message: '请选择需要删除的数据'
        }
      } else {
        let i = List.length
        while (i--) {
          if (ids.indexOf(List[i].id) !== -1) {
            List.splice(i, 1)
          }
        }
        return {
          code: SUCCESS_CODE,
          data: 'success'
        }
      }
    }
  }
]
