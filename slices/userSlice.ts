import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Định nghĩa cấu trúc dữ liệu của user
interface User {
  avatar: string;
  birthday: string;
  department: string;
  gender: string;
  name: string;
  noodleCount: number; // Bổ sung cột noodleCount
}

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Khởi tạo trạng thái ban đầu
const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// Async action để lấy dữ liệu user từ Firestore
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const db = getFirestore();
    const userRef = doc(db, "User", userId); // Tham chiếu đến bảng User và userId
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as User; // Trả về dữ liệu user
    } else {
      throw new Error("User not found");
    }
  }
);

// Tạo slice để quản lý state user
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Gán dữ liệu user vào state
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default userSlice.reducer;
