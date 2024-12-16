import { listAll, getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const getAllImages = async (folderPath: string = '') => {
  try {
    // Tham chiếu đến thư mục trong Firebase Storage
    const folderRef = ref(storage, folderPath);

    // Lấy danh sách tất cả tệp trong thư mục
    const result = await listAll(folderRef);

    // Lấy URL tải xuống của từng tệp
    const urls = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      })
    );

    return urls; // Trả về danh sách URL
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
