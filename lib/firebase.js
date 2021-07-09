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
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export const getUserWithUsername = async username => {
	const usersRef = firestore.collection('users');
	const query = usersRef.where('username', '==', username).limit(1);
	const userDoc = (await query.get()).docs[0];
	return userDoc;
};

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export const postToJSON = doc => {
	const data = doc.data();
	return {
		...data,
		createdAt: data.createdAt.toMillis(),
		updatedAt: data.updatedAt.toMillis(),
	};
};

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
