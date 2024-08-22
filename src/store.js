import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlices';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,       
  },
  devTools: true, 
});

export default store;

