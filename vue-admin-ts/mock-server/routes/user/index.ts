// @ts-nocheck
import * as express from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import mockjs from "mockjs";
import { create } from "svg-captcha";
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

const getUserByPhone = (phone: string) => {
  const result = db.read().get("users")
    .filter({ userinfo: { phone }  })
    .first()
    .value();

  return result;
};

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
        message: "当前用户",
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
        message: "无权限",
        data: {}
      });
    }
  } catch (error) {
    res.status(403).send({
      code: 403,
      message: "Token过期了",
      data: {}
    });
  }
});

// 用户注册
router.post("/users", (req, res, next) => {
  const {
    username,
    password,
    repassword,
    phone,
    code,
    isAgree
  } = req.body;


  const userPhone = getUserByPhone(phone);
  if (userPhone) {
    res.status(409).send({
      code: 409,
      message: "手机号已被注册了",
      data: {}
    });
    return;
  }

  const userName = getUserByName(username);
  if (userName) {
    res.status(409).send({
      code: 409,
      message: "此用户已被注册了！",
      data: {}
    });
    return;
  }

  req.body.userinfo = {
    "gender": 1,
    "phone": phone,
    "nickname": "客户",
    "rolename": "editor",
    "avatar_url": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    "isAgree": isAgree
  }

  delete req.body.repassword;
  delete req.body.phone;
  delete req.body.code;
  delete req.body.isAgree;

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
      message: "用户名不存在",
      data: {}
    });
    return;
  }

  bcrypt.compare(password, user.password).then((result) => {
    if (result) {
      const { accessToken, refreshToken } = signToken(user);
      res.status(200).send({
        code: 200,
        message: "success",
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600
        }
      });
    } else {
      res.status(401).send({
        code: 401,
        message: "密码无效",
        data: {}
      });
    }
  });
});

// 退出登录
router.post("/logout", (req, res) => {
  res.status(200).send({
    code: 200,
    message: "退出登录",
    data: {}
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
    message: "success",
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

// 生成验证码
router.get("/kaptcha",  (req, res) => {
  const captcha = create({
    size: 5,
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 48,
    // 干扰线条的数量
    noise: 3,
    // 宽度
    width: 128,
    // 高度
    height: 40,
  });
  // console.log("captcha:", captcha);
  // res.status(200).send({
  //   code: 0,
  //   message: '图形验证码',
  //   data: {
  //     // 产生的验证码 忽略大小写
  //     kaptcha: captcha.text.toLowerCase(),
  //     kaptchaSvg: String(captcha.data)
  //   },
  // });
  res.set({
    "Content-Type": "image/svg+xml",
    "Captcha-Text": captcha.text
  })
  res.status(200).send(captcha.data);
})


// 获取短信验证码
router.get("/sns/:phone",  (req, res) => {
  const { phone } = req.params;
  // const whiteList = ["13484903846", "18066752060", "18088888888"];
  // if (!phone) {
  //   res.status(401).send({
  //     code: 401,
  //     message: "手机号无效",
  //     data: {}
  //   });
  //   return;
  // }
  //
  // if (whiteList.indexOf(phone) !== -1) {
  //   res.status(409).send({
  //     code: 409,
  //     message: "此手机号已经注册",
  //     data: {}
  //   });
  // }

  res.status(200).send({
    code: 200,
    message: "获取验证码成功",
    data: {}
  });
})

// 用户登录
router.post("/loginByMobile", (req, res) => {
  const { phone, code } = req.body;
  const user = getUserByPhone(phone);

  if (!user) {
    res.status(404).send({
      code: 404,
      message: "手机号不存在",
      data: {}
    });
    return;
  }

  const password = "123456";

  bcrypt.compare(password, user.password).then((result) => {
    if (result) {
      const { accessToken, refreshToken } = signToken(user);
      res.status(200).send({
        code: 200,
        message: "success",
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600
        }
      });
    } else {
      res.status(401).send({
        code: 401,
        message: "验证码无效",
        data: {}
      });
    }
  });
});

export default router;
