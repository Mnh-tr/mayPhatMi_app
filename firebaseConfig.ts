import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; // Thêm Firestore

const firebaseConfig = {
    apiKey: "AIzaSyBkGyLCxZBH5gvF0GPrecZ9Btc0aTq-Iv8",
    authDomain: "startreact-cf835.firebaseapp.com",
    projectId: "startreact-cf835",
    storageBucket: "startreact-cf835.appspot.com",
    messagingSenderId: "94345318468",
    appId: "1:94345318468:web:1790f940f1c1a317c12c11",
    measurementId: "G-25GYNYWY6X"
};

// Khởi tạo Firebase app
const app = initializeApp(firebaseConfig);

// Khởi tạo Storage
const storage = getStorage(app);

// Khởi tạo Firestore
const firestore = getFirestore(app);

export { storage, firestore };
