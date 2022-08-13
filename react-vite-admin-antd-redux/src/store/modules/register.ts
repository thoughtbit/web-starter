import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serializeAxiosError } from "../utils";

const namespace = "user";

export type RegisterState = {
  loading: boolean;
  registrationSuccess: boolean;
  registrationFailure: boolean;
  errorMessage: any;
  successMessage: any;
};

const initialState: RegisterState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
  successMessage: null,
};

export const handleRegister = createAsyncThunk(
  `${namespace}/register/create_account`,
  async (data: { login: string; email: string; password: string }) => axios.post("api/register", data),
  { serializeError: serializeAxiosError }
);

export const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
      })

      .addCase(handleRegister.rejected, (state, action) => ({
        ...initialState,
        registrationFailure: true,
        errorMessage: action.error.message,
      }))
      .addCase(handleRegister.fulfilled, () => ({
        ...initialState,
        registrationSuccess: true,
        successMessage: "register.messages.success",
      }));
  },
});

export const { reset } = RegisterSlice.actions;

export default RegisterSlice.reducer;
