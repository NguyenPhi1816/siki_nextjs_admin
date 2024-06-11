import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  selectors: {
    selectTokens: (auth) => ({
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setTokens } = authSlice.actions;

export const { selectTokens } = authSlice.selectors;

export default authSlice.reducer;
