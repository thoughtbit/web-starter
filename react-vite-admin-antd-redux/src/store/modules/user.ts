import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig, RootState } from "../store";

const namespace = "user/list";

interface User {
  name: string;
  email: string;
  password: string;
  gender: number;
}
interface UserState {
  pageLoading: boolean;
  loading: boolean;
  current: number;
  pageSize: number;
  total: number;
  userList: User[];
}

const initialState: UserState = {
  pageLoading: true,
  loading: true,
  current: 1,
  pageSize: 12,
  total: 0,
  userList: [],
};

// async actions
// -----------------------------------------------------------------------

export const getList = createAsyncThunk<any, any, AsyncThunkConfig>(
  `${namespace}/getUserList`,
  async (params: { pageSize: number; current: number }, { extra }) => {
    const { getUsers } = extra;
    const { pageSize, current } = params;
    return await getUsers({
      pageSize,
      current,
    })
      .then((result: Recordable) => {
        console.log("查看当前用户详情:", result);
        const { code, data, total } = result;
        if (code === 0) {
          return {
            list: data,
            total: total,
            pageSize: params.pageSize,
            current: params.current,
          };
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

const listCardSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    clearPageState: () => initialState,
    switchPageLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload?.list;
        state.total = action.payload?.total;
        state.pageSize = action.payload?.pageSize;
        state.current = action.payload?.current;
      })
      .addCase(getList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearPageState, switchPageLoading } = listCardSlice.actions;

export const selectUserList = (state: RootState) => state.user.userList;

export default listCardSlice.reducer;
