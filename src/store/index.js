import {configureStore} from '@reduxjs/toolkit';
import RouteSlice from './slice/routeSlice';
import MapSlice from './slice/slice';

const store = configureStore({
  reducer: {
    map: MapSlice.reducer,
    route: RouteSlice.reducer,
  },
});

export default store;
