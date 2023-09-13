import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const config = {
  apiKey: 'AIzaSyD1jXb55ZjxnNX6DgTkE8ChMZsJjqQivQo',
  authDomain: 'color-journal-521ab.firebaseapp.com',
  projectId: 'color-journal-521ab',
  storageBucket: 'color-journal-521ab.appspot.com',
  databaseURL: 'https://color-journal-521ab-default-rtdb.firebaseio.com/',
  messagingSenderId: '1047473330212',
  appId: '1:1047473330212:web:3396d7b819ce97f344e0b1',
  measurementId: 'G-LYGKFSG0QD',
};

const app = initializeApp(config);
export const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

export const rtdb = getDatabase(app);
connectDatabaseEmulator(rtdb, 'localhost', 9000);

export default app;
