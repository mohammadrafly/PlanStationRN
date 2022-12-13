import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVPwiZ0xwki1o_cw7Eug6wOdGdpsDoBf0",
  authDomain: "plan-station-5ebdf.firebaseapp.com",
  projectId: "plan-station-5ebdf",
  storageBucket: "plan-station-5ebdf.appspot.com",
  messagingSenderId: "822101279077",
  appId: "1:822101279077:web:43aa5c524c6883c852618c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;