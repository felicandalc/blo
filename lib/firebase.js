import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDMLenGknLl-Dk4ULX8VxAjX2yQHOGdUNA',
	authDomain: 'blog-27117.firebaseapp.com',
	projectId: 'blog-27117',
	storageBucket: 'blog-27117.appspot.com',
	messagingSenderId: '824309384621',
	appId: '1:824309384621:web:a8ed8b2c95a686870ccd24',
	measurementId: 'G-C8P8KTJBDT',
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GithubAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
