import Mock from 'mockjs';
import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock([
  {
    url: '/api/test',
    body: {
      a: 1,
      b: 2,
    },
    // 关闭当前 mock，api/test 将会不会生效
    enabled: false,
  },
  {
    url: '/api/users',
    body: Mock.mock({
      code: 0,
      msg: 'success',
      data: {
        total: 10,
        'list|1-10': [
          {
            'id|+1': 1,
            'name': '@cname',
          },
        ],
      },
    }),
    enabled: false,
  },
  {
    url: '/api/post/list',
    method: 'POST',
    body({ body }) {
      return {
        code: 0,
        msg: 'success',
        result: {
          page: body.page,
          total: 10,
          data: Mock.mock({
            'list|1-10': [
              {
                'id|+1': 1,
              },
            ],
          }),
        },
      };
    },
  },
  {
    url: '/api/login/:id',
    headers: { 'Content-Type': 'application/json' },
    body: ({ query, params, body }) => {
      return {
        query,
        params,
        body,
        isLogin: true,
        development: __IS_DEVELOPMENT__,
      };
    },
  },
  {
    url: '/api/upload',
    method: 'POST',
    body(req) {
      const body = req.body;
      const files = Array.isArray(body.files) ? body.files : [body.files];
      return {
        name: body.name,
        files: files.map((file: any) => file.originalFilename),
      };
    },
  },
  /**
   * 直接使一个接口 404
   */
  {
    url: '/api/custom/404',
    status: 404,
    statusText: 'Not Found',
  },
  /**
   * 通过 response 自定义一个 404的请求
   */
  {
    url: '/api/custom/fail',
    response(req, res) {
      // req.query
      // req.body
      // req.params
      res.statusCode = 404;
      res.statusMessage = 'Not Found';
      res.end();
    },
  },
  /**
   * 使接口延迟响应，单位： ms
   */
  {
    url: '/api/delay',
    delay: 4000,
  },
  // Match /api/post/list?page=1
  {
    url: '/api/post/list',
    validator: {
      query: {
        page: 1,
      },
      body: {
        page: 1,
      },
    },
    body: {
      totalPage: 10,
      page: 1,
      postList: [{ title: 'post 1' }, { title: 'post 2' }],
    },
  },
  // Match /api/post/list?page=2
  {
    url: '/api/post/list',
    validator: {
      query: {
        page: 2,
      },
      body: {
        page: 2,
      },
    },
    body: {
      totalPage: 10,
      page: 2,
      postList: [{ title: 'post 3' }, { title: 'post 4' }],
    },
  },
]);
