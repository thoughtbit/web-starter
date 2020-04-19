import {
  GetUser,
  GetUserList,
} from '../fragments/user';

export const getUser = `query getUser(${GetUser.variable}) {${GetUser.query}}`;
export const getUserList = `query getUserList(${GetUserList.variable}) {${GetUserList.query}}`;
