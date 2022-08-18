import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import debounce from "lodash/debounce";
import type { AppDispatch, ThunkResult } from "@/store";
import request from "@/services/request";
import qs from "qs";

export type UserFilter = Record<string, string | boolean | any[]>;

type User = {
  name: string;
  email: string;
  password: string;
  gender: number;
};
type UserListState = {
  users: User[];
  query: string;
  perPage: number;
  page: number;
  totalPages: number;
  showPaging: boolean;
  filters: UserFilter[];
  isLoading: boolean;
};
type UsersFetched = {
  users: User[];
  perPage: number;
  page: number;
  totalCount: number;
};

const initialState: UserListState = {
  users: [],
  query: "",
  page: 0,
  perPage: 50,
  totalPages: 1,
  showPaging: false,
  filters: [{ name: "activeLast30Days", value: false }],
  isLoading: false,
};

export function fetchUsers(): ThunkResult<void> {
  return async (dispatch, getState) => {
    try {
      const { page, query, filters } = getState().demos;

      const result = await request({
        url: "/api/users",
        method: "get",
        params: {
          page: page,
          query: query,
          filters: filters,
        },
        paramsSerializer: (params: any) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      });

      dispatch(usersFetched(result.data));
    } catch (error) {
      usersFetchEnd();
      console.error(error);
    }
  };
}

const fetchUsersWithDebounce = debounce((dispatch: AppDispatch) => dispatch(fetchUsers()), 500);

export function changeQuery(query: string): ThunkResult<void> {
  return async (dispatch) => {
    dispatch(usersFetchBegin());
    dispatch(queryChanged(query));
    fetchUsersWithDebounce(dispatch);
  };
}

export function changeFilter(filter: UserFilter): ThunkResult<void> {
  return async (dispatch) => {
    dispatch(usersFetchBegin());
    dispatch(filterChanged(filter));
    fetchUsersWithDebounce(dispatch);
  };
}

export function changePage(page: number): ThunkResult<void> {
  return async (dispatch) => {
    dispatch(usersFetchBegin());
    dispatch(pageChanged(page));
    dispatch(fetchUsers());
  };
}

export const userListSlice: any = createSlice({
  name: "userList",
  initialState,
  reducers: {
    usersFetched: (state: any, action: PayloadAction<UsersFetched>) => {
      const { totalCount, perPage, ...rest } = action.payload;
      const totalPages = Math.ceil(totalCount / perPage);

      return {
        ...state,
        ...rest,
        totalPages,
        perPage,
        showPaging: totalPages > 1,
        isLoading: false,
      };
    },
    usersFetchBegin: (state: UserListState) => {
      return { ...state, isLoading: true };
    },
    usersFetchEnd: (state: UserListState) => {
      return { ...state, isLoading: false };
    },
    queryChanged: (state: UserListState, action: PayloadAction<string>) => ({
      ...state,
      query: action.payload,
      page: 0,
    }),
    pageChanged: (state: UserListState, action: PayloadAction<number>) => ({
      ...state,
      page: action.payload,
    }),
    filterChanged: (state: UserListState, action: PayloadAction<UserFilter>) => {
      const { name, value } = action.payload;

      if (state.filters.some((filter) => filter.name === name)) {
        return {
          ...state,
          page: 0,
          filters: state.filters.map((filter) => (filter.name === name ? { ...filter, value } : filter)),
        };
      }
      return {
        ...state,
        page: 0,
        filters: [...state.filters, action.payload],
      };
    },
  },
});

export const { usersFetched, usersFetchBegin, usersFetchEnd, queryChanged, pageChanged, filterChanged } =
  userListSlice.actions;

export default userListSlice.reducer;
