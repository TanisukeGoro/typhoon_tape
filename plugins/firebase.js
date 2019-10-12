import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBfrYub4md8CDQ0ThQiEXC4JM0XMf8XK9Q',
    authDomain: 'mygrossary.firebaseapp.com',
    databaseURL: 'https://mygrossary.firebaseio.com',
    projectId: 'mygrossary',
    storageBucket: 'mygrossary.appspot.com',
    messagingSenderId: '285615567998',
    appId: '1:285615567998:web:c5aac62775fbc141'
  })
}
const authProviders = {
  // 使うものだけ定義しておきましょう
  Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID
}
const auth = firebase.auth()
export { auth, authProviders }
