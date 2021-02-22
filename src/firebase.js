import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyD1jXb55ZjxnNX6DgTkE8ChMZsJjqQivQo",
  authDomain: "color-journal-521ab.firebaseapp.com",
  projectId: "color-journal-521ab",
  storageBucket: "color-journal-521ab.appspot.com",
  databaseURL: "https://color-journal-521ab-default-rtdb.firebaseio.com/",
  messagingSenderId: "1047473330212",
  appId: "1:1047473330212:web:3396d7b819ce97f344e0b1",
  measurementId: "G-LYGKFSG0QD"
}

const app = firebase.initializeApp(config)
export const auth = app.auth()
// auth.useEmulator("http://localhost:9099")

export const rtdb = app.database()
// rtdb.useEmulator("localhost", 9000)

export default app
