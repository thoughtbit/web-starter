export type RoleType = "" | "*" | "admin" | "user";
export type UserInfo = {
  userId: string | number;
  username: string;
};
export type UserState = {
  users: UserInfo[];
  userInfo?: Nullable<UserInfo>;
  token?: string;
  role: RoleType;
};
