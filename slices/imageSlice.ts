import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebaseConfig';

// Thunk để tải danh sách ảnh từ Firebase Storage
export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (folderPath: string) => {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    const imageUrls = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );
    return imageUrls;
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [] as { name: string; url: string }[], // Mảng lưu danh sách ảnh
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload; // Lưu danh sách ảnh
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch images';
      });
  },
});

export default imageSlice.reducer;
