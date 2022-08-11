import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storage } from "@/services";
import type { RootState } from "..";

const TOKEN = "TOKEN";
const namespace = "auth";

export type AuthState = {
  userInfo: any;
  token: string;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  userInfo: {},
  token: "",
  isAuthenticated: false,
};

// login
export const login = createAsyncThunk(`${namespace}/login`, async (params: Record<string, unknown>) => {
  const mockLogin = async (params: Record<string, unknown>) => {
    // 登录请求流程
    console.log(params);
    const { username, password } = params;
    if (username !== "admin") {
      return {
        code: 401,
        message: "账号不存在",
      };
    }
    if (["Admin@2022", "Test@2022"].indexOf(password) === -1) {
      return {
        code: 401,
        message: "密码错误",
      };
    }

    return {
      code: 200,
      message: "登陆成功",
      data: {
        token: "token_xxxx",
        userInfo: {
          username: "admin",
        },
      },
    };
  };

  const res = await mockLogin(params);
  if (res.code === 200) {
    return res.data;
  }
  throw res;
});

// getUserInfo
export const getUserInfo = createAsyncThunk(`${namespace}/getUserInfo`, async (_, { getState }: any) => {
  const { token } = getState();
  const mockRemoteUserInfo = async (token: string) => {
    if (token === "token_xxxx") {
      return {
        name: "admin",
        roles: ["*"],
      };
    }
    return {
      name: "test",
      roles: ["dashboard", "login"],
    };
  };

  const res = await mockRemoteUserInfo(token);

  return res;
});

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      storage.remove(TOKEN);
      state.token = "";
      state.userInfo = {};
      state.isAuthenticated = false;
    },
    remove: (state: AuthState) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        storage.set(TOKEN, action.payload);

        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { logout, remove } = userSlice.actions;

export default userSlice.reducer;
