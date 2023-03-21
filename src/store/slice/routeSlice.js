import {createSlice} from '@reduxjs/toolkit';

const RouteSlice = createSlice({
  name: 'route',
  initialState: [],
  reducers: {
    AddRoute(state, action) {
      state.pop();
      state.push(action.payload);
    },
  },
});

export default RouteSlice;
export const {AddRoute} = RouteSlice.actions;
