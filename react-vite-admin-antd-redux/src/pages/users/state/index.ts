import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, AsyncThunkConfig, RootState } from "@/store";

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

export const getUserList = createAsyncThunk<any, any, AsyncThunkConfig>(
  `${namespace}/getUserList`,
  async (params: { pageSize: number; current: number }, { extra }) => {
    const { getUserList } = extra;
    const { pageSize, current } = params;
    return await getUserList({
      pageSize,
      current,
    })
      .then((result: Recordable) => {
        console.log("查看当前用户列表:", result);
        const { code, data } = result;
        if (code === 0) {
          return {
            list: data.users,
            total: data.totalCount,
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

export const changePage = (pageSize: number, current: number) =>  async (dispatch: AppDispatch) => {
  await dispatch(
    getUserList({
      pageSize: pageSize,
      current: current,
    })
  );
};

export const reset = () => (dispatch: AppDispatch) => {
  dispatch(listUserSlice.actions.clearPageState());
};

// reducers
// -----------------------------------------------------------------------

const listUserSlice = createSlice({
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
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload?.list;
        state.total = action.payload?.total;
        state.pageSize = action.payload?.pageSize;
        state.current = action.payload?.current;
      })
      .addCase(getUserList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearPageState, switchPageLoading } = listUserSlice.actions;

export const selectUserList = (state: RootState) => state.user;

export default listUserSlice.reducer;
