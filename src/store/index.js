import {configureStore} from '@reduxjs/toolkit';
import {UserSlice} from './slice/slice';

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
  },
});

export default store;
