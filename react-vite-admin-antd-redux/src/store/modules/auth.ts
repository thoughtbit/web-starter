import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import StorageManager, { TOKEN_KEY } from "~/services/storage";
import { DataStatus } from "../types";
import type { AsyncThunkConfig, RootState } from "../";

const TOKEN = "TOKEN";
const namespace = "auth";

export type AuthState = {
  loading: boolean;
  errorMessage: unknown;
  dataStatus: DataStatus;
  userInfo: any;
  token: string;
  authorities: any[];
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  loading: false,
  errorMessage: null,
  dataStatus: DataStatus.IDLE,
  userInfo: {},
  token: "",
  authorities: [],
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
    return await getUserInfo(auth?.token)
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

export const getRoles = createAsyncThunk<any, any, AsyncThunkConfig>(
  `${namespace}/getRoles`,
  async (_, { getState, extra }) => {
    const { getRoles } = extra;
    const { auth } = getState();
    return await getRoles(auth?.token)
      .then((result: Recordable) => {
        console.log("查看当前用户角色:", result);
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
    logout(state: AuthState) {
      StorageManager.remove(TOKEN);
      state.token = "";
      state.userInfo = {};
      state.isAuthenticated = false;
    },
    remove(state: AuthState) {
      state.token = "";
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        StorageManager.set(TOKEN, action.payload);

        state.token = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(getRoles.fulfilled, (state, action) => {
        state.authorities = action.payload.data;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })

      .addMatcher(isFulfilled(getUserInfo, getRoles), (state) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.loading = false;
      })
      .addMatcher(isPending(login, getUserInfo, getRoles), (state) => {
        state.dataStatus = DataStatus.PENDING;
        state.errorMessage = null;
        state.loading = true;
      })
      .addMatcher(isRejected(login, getUserInfo, getRoles), (state, action) => {
        state.dataStatus = DataStatus.REJECTED;
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { logout, remove, reset } = userSlice.actions;

export default userSlice.reducer;
