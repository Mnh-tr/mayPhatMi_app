import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';
import userReducer from './slices/userSlice'; // Import userSlice

const store = configureStore({
  reducer: {
    images: imageReducer, // Reducer cho hình ảnh
    user: userReducer,   // Reducer cho người dùng
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
