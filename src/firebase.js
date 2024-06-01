import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB03zLvXU8SnawN5T7Cr4FVokx3mS9wo00",
  authDomain: "course-enroll-web-app.firebaseapp.com",
  projectId: "course-enroll-web-app",
  storageBucket: "course-enroll-web-app.appspot.com",
  messagingSenderId: "845503126500",
  appId: "1:845503126500:web:89f52aab2563d9592f45f1",
  measurementId: "G-J9YKF70CKV"
};

const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);