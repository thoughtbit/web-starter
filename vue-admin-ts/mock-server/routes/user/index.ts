// @ts-nocheck
import * as express  from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { db } from '../../db';
import { privateKey } from '../../config';
import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

const signToken = (data) => {
  const payload = {
    id: data.id,
    usrname: data.username
  };

  const token = jwt.sign(
    payload,
    privateKey,
    {
      expiresIn: '1d', // 有效时间为1天
      algorithm: 'RS256' // RSA SHA256
    }
  );

  return token;
};

const getUserByName = (username: string) => {
  db.read();

  const result = db.get('users')
    .find({ username })
    .value();

  return result;
};

// 用户查询
router.get('/user', (req, res) => {
  res.status(202).send({
    code: 202,
    msg: '当前用户',
    data: {
      username: 'moocss'
    }
  });
});

// 用户注册
router.post('/users', (req, res, next) => {
  const { username, password } = req.body;
  const user = getUserByName(username);

  if (user) {
    res.status(409).send({
      code: 409,
      msg: '用户名被占用了！',
      data: {}
    });
    return;
  }

  bcrypt.hash(password, 10)
    .then((passwordHash) => {
      req.body.password = passwordHash;
      next();
    });
});

// 用户登录
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = getUserByName(username);

  if (!user) {
    res.status(404).send({
      code: 404,
      msg: '用户名不存在',
      data: {}
    });
    return;
  }

  bcrypt.compare(password, user.password)
    .then((result) => {
      if (result) {
        const token = signToken(user);
        res.status(200).send({
          code: 200,
          msg: 'success',
          data: {
            id: user.id,
            username: user.username,
            token
          }
        });
      } else {
        res.status(401).send({
          code: 401,
          msg: '密码无效',
          data: {}
        });
      }
    });
});

// 验证 JWT
router.post('/token/validate', authMiddleware, (req, res) => {
  res.send('valid');
});

export default router;
