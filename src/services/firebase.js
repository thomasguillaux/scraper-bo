import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAnCkLBpWFzpdcjw_ki-kDjt4BR4BUbiG4",
    authDomain: "second-hand-motorbikes.firebaseapp.com",
    projectId: "second-hand-motorbikes",
    storageBucket: "second-hand-motorbikes.appspot.com",
    messagingSenderId: "796040404800",
    appId: "1:796040404800:web:62147e24bf5f366512e4a5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;