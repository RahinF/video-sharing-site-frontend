import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface MenuState {
  isOpen: boolean;
}

const initialState: MenuState = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const selectMenuIsOpen = (state: RootState) => state.menu.isOpen;

export const { setMenuIsOpen } = menuSlice.actions;
export default menuSlice.reducer;
