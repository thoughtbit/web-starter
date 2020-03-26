// @ts-nocheck
import * as express  from 'express';
import consola from 'consola';
import { db } from '../../db';

const router = express.Router();

const getMenus = () => {
  const result = db.get('menus')
    .value();

  return result;
};

router.get('/menus', (req, res) => {
  const result = getMenus();
  consola.info(`结果: ${JSON.stringify(result)}`);
  
  res.status(202).send({
    code: 202,
    msg: '系统菜单',
    data: result
  });
});

export default router;