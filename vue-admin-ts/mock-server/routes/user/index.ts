// @ts-nocheck
import * as express from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import mockjs from 'mockjs';
import { db } from "../../db";
import { privateKey, publicKey } from "../../config";
import { authMiddleware, authRefreshMiddleware } from "../../middlewares/auth";

const router = express.Router();

const signToken = (data) => {
  const payload = {
    id: data.id,
    username: data.username
  };

  const accessToken = jwt.sign(payload, privateKey, {
    expiresIn: "1d", // 有效时间为1天
    algorithm: "RS256" // RSA SHA256
  });
  const refreshToken = jwt.sign(payload, privateKey, {
    expiresIn: "2d", // 有效时间为2天
    algorithm: "RS256" // RSA SHA256
  });

  return {
    accessToken,
    refreshToken
  };
};

const getUserByName = (username: string) => {
  const result = db.read().get("users")
    .filter({ username })
    .first()
    .value();

  return result;
};

const getUserById = (id: number) => {
  const result = db.read().get("users")
    .find({ id })
    .value();
  return result;
}


// 用户查询
router.get("/user", (req, res) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || authHeader === '') {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    res.sendStatus(401);
    return;
  }


  try {
    const decoded = jwt.verify(token, publicKey);
    if (decoded) {
      const { id } = decoded;
      const user = getUserById(id);
      res.status(202).send({
        code: 202,
        msg: "当前用户",
        data: {
          id: user.id,
          username: user.username,
          nickname: user.userinfo.nickname,
          rolename: user.userinfo.rolename,
          avatar_url: user.userinfo.avatar_url,
        }
      });
    } else {
      res.status(401).send({
        code: 401,
        msg: "无权限",
        data: {}
      });
    }
  } catch (error) {
    res.status(400).send({
      code: 400,
      msg: error.message,
      data: {}
    });
  }
});

// 用户注册
router.post("/users", (req, res, next) => {
  const { username, password } = req.body;
  const user = getUserByName(username);

  if (user) {
    res.status(409).send({
      code: 409,
      msg: "用户名被占用了！",
      data: {}
    });
    return;
  }

  bcrypt.hash(password, 10)
    .then(passwordHash => {
      req.body.password = passwordHash;
      next();
    });
});

// 用户登录
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = getUserByName(username);

  if (!user) {
    res.status(404).send({
      code: 404,
      msg: "用户名不存在",
      data: {}
    });
    return;
  }

  bcrypt.compare(password, user.password).then((result) => {
    if (result) {
      const { accessToken, refreshToken } = signToken(user);
      res.status(200).send({
        code: 200,
        msg: "success",
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600
        }
      });
    } else {
      res.status(401).send({
        code: 401,
        msg: "密码无效",
        data: {}
      });
    }
  });
});

// 验证 JWT
router.post("/token/validate", authMiddleware, (req, res) => {
  res.send("valid");
});

// 刷新 Token
router.post("/token/refresh", authRefreshMiddleware, (req, res) => {
  const { token } = req.body;
  res.status(200).send({
    code: 200,
    msg: "success",
    data: {
      refresh_token: token,
      expires_in: 3600,
    }
  });
});

// 角色集合
router.post("/roles", (req, res, next) => {
  const { list } = mockjs.mock({
    'list|10': [
      {
        id: '@GUID()',
        name: '@CWORD(2,8)',
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      }
    ]
  });
  db.set('roles', list).write();
});


export default router;
