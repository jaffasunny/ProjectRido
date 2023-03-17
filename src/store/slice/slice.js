import {createSlice} from '@reduxjs/toolkit';

const MapSlice = createSlice({
  name: 'map',
  initialState: [],
  reducers: {
    AddMapDistance(state, action) {
      state.push({distance: action.payload});
    },
    AddMapDuration(state, action) {
      state.push({duration: action.payload});
    },
  },
});

export default MapSlice;
export const {AddMapDistance, AddMapDuration} = MapSlice.actions;
