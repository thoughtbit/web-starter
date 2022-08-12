import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageManager, { TOKEN_KEY } from "@/services/storage";
import { DataStatus } from "../types";
import type { AsyncThunkConfig, RootState } from "../store";

const TOKEN = "TOKEN";
const namespace = "auth";

export type AuthState = {
  dataStatus: DataStatus;
  userInfo: any;
  token: string;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  dataStatus: DataStatus.IDLE,
  userInfo: {},
  token: "",
  isAuthenticated: false,
};

// async actions
// -----------------------------------------------------------------------

// login
export const login = createAsyncThunk<any, any, AsyncThunkConfig>(`${namespace}/login`, async (params, { extra }) => {
  const { login } = extra;
  return await login(params)
    .then((result: Recordable) => {
      console.log("用户登录:", result);
      const { code, data } = result;
      if (code === 0) {
        StorageManager.set(TOKEN_KEY, data.token);
        return result.data;
      } else {
        return result;
      }
    })
    .catch((error) => {
      return error;
    });
});

// getUserInfo
export const getUserInfo = createAsyncThunk<any, any, AsyncThunkConfig>(
  `${namespace}/getUserInfo`,
  async (_, { getState, extra }) => {
    const { getUserInfo } = extra;
    const { auth } = getState();
    return await getUserInfo(auth.token)
      .then((result: Recordable) => {
        console.log("查看当前用户详情:", result);
        const { code, data } = result;
        if (code === 0) {
          return data;
        } else {
          return result;
        }
      })
      .catch((error) => {
        return error;
      });
  }
);

// reducers
// -----------------------------------------------------------------------
const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      StorageManager.remove(TOKEN);
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
      .addCase(login.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        StorageManager.set(TOKEN, action.payload);

        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { logout, remove } = userSlice.actions;

export default userSlice.reducer;
