import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../";
import { api } from "@/services";

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

export const getList = createAsyncThunk(
  `${namespace}/getUserList`,
  async (params: { pageSize: number; current: number }) => {
    const { pageSize, current } = params;
    const result: any = await api.getUsers({
      pageSize,
      current,
    });
    return {
      list: result?.list,
      total: result?.total,
      pageSize: params.pageSize,
      current: params.current,
    };
  }
);

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

export const selectUserList = (state: RootState) => state.userList;

export default listCardSlice.reducer;
