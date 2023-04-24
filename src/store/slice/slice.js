import {createSlice} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
  },
  reducers: {
    AddToken(state, action) {
      state.token = action.payload;
    },
    RemoveToken(state) {
      state.token = null;
    },
  },
});

export {UserSlice};
export const {AddToken, RemoveToken} = UserSlice.actions;
