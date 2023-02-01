import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface UserState {
  id: string | null;
  image: string | null;
  subscriptions: string[];
}

const initialState: UserState = {
  id: null,
  image: null,
  subscriptions: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const { id, image, subscriptions } = action.payload;
      state.id = id;
      state.image = image;
      state.subscriptions = subscriptions;
    },
    clearUser() {
      return initialState;
    },
    addSubscription(state, action: PayloadAction<string>) {
      state.subscriptions.push(action.payload);
    },
    removeSubscription(state, action: PayloadAction<string>) {
      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription !== action.payload
      );
    },
  },
});

export const selectCurrentUserId = (state: RootState) => state.user.id;
export const selectCurrentUserImage = (state: RootState) => state.user.image;
export const selectCurrentUserSubscriptions = (state: RootState) =>
  state.user.subscriptions;
export const { setUser, clearUser, addSubscription, removeSubscription } =
  userSlice.actions;
export default userSlice.reducer;
