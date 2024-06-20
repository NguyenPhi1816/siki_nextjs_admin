import { IAuthResponse } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: IAuthResponse | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  selectors: {
    selectUser: (user) => ({
      user: user.user,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;
