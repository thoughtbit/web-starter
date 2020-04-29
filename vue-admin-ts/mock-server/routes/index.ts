import { Response, Request, NextFunction } from 'express';
import user from './user';
import { menus } from './admin';
import shop from './shop';

// @ts-ignore
export const routes = function(app) {
  // 心跳检测
  app.get('/health', (req: Request, res: Response) => {
    res.status(200);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json({
      health: 'good',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    });
  });

  // 用户接口, 菜单接口, 购物接口
  app.use([user, menus, shop]);
}
