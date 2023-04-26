import {createSlice} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    coords: null,
    previewRideData: null,
    rideDetails: null,
  },
  reducers: {
    AddUser(state, action) {
      state.user = action.payload;
    },
    RemoveUser(state) {
      state.user = null;
    },
    AddUserCoords(state, action) {
      state.coords = action.payload;
    },
    AddPreviewRideData(state, action) {
      state.previewRideData = action.payload;
    },
    AddRideDetails(state, action) {
      state.rideDetails = action.payload;
    },
    logout(state) {
      state.user = null;
      state.coords = null;
      state.previewRideData = null;
      state.rideDetails = null;
    },
  },
});

export {UserSlice};
export const {
  AddUser,
  RemoveUser,
  AddUserCoords,
  AddPreviewRideData,
  AddRideDetails,
  logout,
} = UserSlice.actions;
