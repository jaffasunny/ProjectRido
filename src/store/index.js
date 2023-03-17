import {configureStore} from '@reduxjs/toolkit';
import MapSlice from './slice/slice';

const store = configureStore({
  reducer: {
    map: MapSlice.reducer,
  },
});

export default store;
