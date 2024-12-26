import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import các hàm cần thiết từ Firestore
import { storage, firestore } from '../firebaseConfig'; // Đảm bảo firestore được cấu hình đúng
import { RootState } from '../store';
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

// Thunk để lấy noodleCount từ Firestore
export const fetchNoodleCount = createAsyncThunk(
  'images/fetchNoodleCount',
  async () => {
    const docRef = doc(firestore, 'Cup', 'm05RmMkix3KBOmaVmCgD'); // Tạo tham chiếu đến document
    const docSnap = await getDoc(docRef); // Lấy dữ liệu từ Firestore
    if (docSnap.exists()) {
      return docSnap.data()?.noodleCount || 0; // Trả về noodleCount hoặc 0 nếu không tồn tại
    }
    throw new Error('Document does not exist');
  }
);

// Thunk để cập nhật noodleCount trong Firestore
export const updateNoodleCount = createAsyncThunk(
  'images/updateNoodleCount',
  async (newCount: number) => {
    const docRef = doc(firestore, 'Cup', 'm05RmMkix3KBOmaVmCgD'); // Tạo tham chiếu đến document
    await updateDoc(docRef, { noodleCount: newCount }); // Cập nhật dữ liệu trong Firestore
    return newCount; // Trả về giá trị mới để cập nhật state
  }
);
// Thunk để giảm noodleCount và cập nhật Firestore
export const decrementNoodleCountBy = createAsyncThunk(
  'images/decrementNoodleCountBy',
  async (amount: number, { getState, dispatch }) => {
    const state = getState() as RootState; // Lấy state hiện tại
    const newCount = Math.max(0, state.images.noodleCount - amount); // Đảm bảo không giảm dưới 0
    const docRef = doc(firestore, 'Cup', 'm05RmMkix3KBOmaVmCgD'); // Tham chiếu tới document Firestore
    await updateDoc(docRef, { noodleCount: newCount }); // Cập nhật Firestore
    return newCount; // Trả về giá trị mới để cập nhật state
  }
);
const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [] as { name: string; url: string }[], // Mảng lưu danh sách ảnh
    loading: false,
    error: null as string | null,
    noodleCount: 0, // Biến noodleCount ban đầu
  },
  reducers: {
    // Reducer để tăng noodleCount
    incrementNoodleCount: (state) => {
      state.noodleCount += 1;
    },
    // Reducer để cập nhật noodleCount với giá trị cụ thể
    setNoodleCount: (state, action) => {
      state.noodleCount = action.payload;
    },
    // Reducer để giảm noodleCount mỗi khi chọn dish
    reduceNoodleCount: (state) => {
      if (state.noodleCount > 0) {
        state.noodleCount -= 1;
      }
    },
  },
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
      })
      .addCase(fetchNoodleCount.fulfilled, (state, action) => {
        state.noodleCount = action.payload; // Cập nhật noodleCount từ Firestore
      })
      .addCase(fetchNoodleCount.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch noodle count';
      })
      .addCase(updateNoodleCount.fulfilled, (state, action) => {
        state.noodleCount = action.payload; // Cập nhật noodleCount sau khi thành công
      });
  },
});

// Export reducers
export const {
  incrementNoodleCount,
  setNoodleCount,
  reduceNoodleCount,
} = imageSlice.actions;

export default imageSlice.reducer;
