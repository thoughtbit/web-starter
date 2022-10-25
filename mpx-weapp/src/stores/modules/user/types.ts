export type UserInfo = {
  id: string | number;
  name: string;
  email?: string
};
export type UserState = {
  isLogin: boolean;
  userInfo?: Nullable<UserInfo>;
};
