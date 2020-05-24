import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {privateKey, publicKey} from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
    jwt.verify(token, publicKey);
    next();
  } catch (error) {
    res.status(400).send(error.message);
    return false;
  }
};


export const authRefreshMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || authHeader === '') {
    res.sendStatus(401);
    return;
  }

  const refreshToken = authHeader.replace('Bearer ', '');

  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  try {
    const newDecoded = jwt.verify(refreshToken, publicKey);
    if (newDecoded) {
      // @ts-ignore
      const { id, username } = newDecoded;
      const payload = {
        id: id,
        username: username
      };

      const accessToken = jwt.sign(payload, privateKey, {
        expiresIn: "1d", // 有效时间为1天
        algorithm: "RS256" // RSA SHA256
      });

      req.body.token = accessToken;
      next();
    }
  } catch (error) {
    res.status(400).send(error.message);
    return false;
  }
}
