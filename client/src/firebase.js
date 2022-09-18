import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: 'AIzaSyDov_eKJEywbqG2rlocghN4L1zPvrZRH7I',
	authDomain: 'movie-theater-fullstack.firebaseapp.com',
	projectId: 'movie-theater-fullstack',
	storageBucket: 'movie-theater-fullstack.appspot.com',
	messagingSenderId: '1058559932091',
	appId: '1:1058559932091:web:f1b9751333a266dc709b9e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app