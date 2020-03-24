import * as https from 'https';
import * as jsonServer from 'json-server';
import proxy from 'http-proxy-middleware';
import { dbFile } from './db';
import { routes } from './routes';
import { serverCert, serverKey } from './config';

const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

const secure = true;

const apiProxy = proxy({
  target: 'https://jsonplaceholder.typicode.com/',
  changeOrigin: true,
  // pathRewrite: { '^/api': '' }
});

// Set default middlewares (logger, static, cors and no-cache);
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 注册反向代理
// server.use('/api/v1', apiProxy);

// All routes for the server
routes(server);

// @ts-ignore
router.render = (req, res) => {
  if (req.method === 'GET') {
    if (req.path === '/users') {
      const users = res.locals.data.map((item: any) => {
        delete item.password;

        return item;
      });

      res.json(users);

      return;
    }

    const singleUser = req.path.match(/\/users\/(\d+)/);

    if (singleUser) {
      delete res.locals.data.password;

      res.json(res.locals.data);

      return;
    }
  }

  res.json(res.locals.data);
};

server.use(router);

if (secure) {
  const httpsServer = https.createServer({
    cert: serverCert,
    key: serverKey
  }, server);
  httpsServer.listen(4000, () => console.log('HTTPS JSON Server running at https://localhost:4000'));
} else {
  server.listen(4000, () => {
    console.log('HTTP JSON Server running at https://localhost:4000');
  });
}
