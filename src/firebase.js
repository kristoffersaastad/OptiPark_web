import * as firebase from 'firebase';
import {config} from './firebaseConfig';

firebase.initializeApp(config);
const firestoreRef = firebase.firestore();

export const fsRef = firestoreRef;
export const auth = firebase.auth();