export interface IUserModel {
  id: number | string;
  username: string,
  nickname: string,
  rolename: string,
  avatar_url: string,
}

export interface ITokenModel {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
