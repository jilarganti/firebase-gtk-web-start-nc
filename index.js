// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';

import firebaseui from 'firebaseui';

// Document elements
//const startRsvpButton = document.getElementById('startRsvp');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signOutButton = document.getElementById('signOut');
//const guestbookContainer = document.getElementById('guestbook-container');
//const form = document.getElementById('leave-message');
//const input = document.getElementById('message');
//const guestbook = document.getElementById('guestbook');
//const numberAttending = document.getElementById('number-attending');
//const rsvpYes = document.getElementById('rsvp-yes');
//const rsvpNo = document.getElementById('rsvp-no');

//let rsvpListener = null;
let guestbookListener = null;

let db, auth;

async function main() {
  // Add Firebase project configuration object here
  const firebaseConfig = {
    apiKey: 'AIzaSyDT-Vcr2KjxBc2g4rgxATnVh6J-7FHRSLQ',
    authDomain: 'web-codelab-7b944.firebaseapp.com',
    projectId: 'web-codelab-7b944',
    storageBucket: 'web-codelab-7b944.appspot.com',
    messagingSenderId: '822035804668',
    appId: '1:822035804668:web:4c8ff3fd019e3a782a4279',
  };

  // initializeApp(firebaseConfig);
  initializeApp(firebaseConfig);
  auth = getAuth();
  db = getFirestore();
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

  /*
  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
    },
  };

  // Initialize the FirebaseUI widget using Firebase
  const ui = new firebaseui.auth.AuthUI(auth);
*/
  /*
  // ...
  // Called when the user clicks the RSVP button
  startRsvpButton.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      signOut(auth);
    } else {
      // No user is signed in; allows user to sign in
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
*/
  // ...
  // Called when the user clicks the RSVP button
  signUpButton.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      signOut(auth);
    } else {
      // No user is signed in; allows user to sign in
      // ui.start('#firebaseui-auth-container', uiConfig);
      signInWithPopup(auth, provider);
    }
  });

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });


  // Обработчик события для отслеживания состояния входа/выхода пользователя
  onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
      // Пользователь вошел, скрываем форму входа и отображаем кнопку выхода
      signInButton.style.display = 'none';
      signOutButton.style.display = 'block';
    } else {
      // Пользователь вышел, скрываем кнопку выхода и отображаем форму входа
      signInButton.style.display = 'block';
      signOutButton.style.display = 'none';
    }
  });

  /*
  // Listen to the form submission
  form.addEventListener('submit', async (e) => {
    // Prevent the default form redirect
    e.preventDefault();
    // Write a new message to the database collection "guestbook"
    addDoc(collection(db, 'guestbook'), {
      text: input.value,
      timestamp: Date.now(),
      name: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
    });
    // clear message input field
    input.value = '';
    // Return false to avoid redirect
    return false;
  });

  // Create query for messages
  const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
  onSnapshot(q, (snaps) => {
    // Reset page
    guestbook.innerHTML = '';
    // Loop through documents in database
    snaps.forEach((doc) => {
      // Create an HTML entry for each document and add it to the chat
      const entry = document.createElement('p');
      entry.textContent = doc.data().name + ': ' + doc.data().text;
      guestbook.appendChild(entry);
    });
  });

  // ...
  // Listen to guestbook updates
  function subscribeGuestbook() {
    const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
    guestbookListener = onSnapshot(q, (snaps) => {
      // Reset page
      guestbook.innerHTML = '';
      // Loop through documents in database
      snaps.forEach((doc) => {
        // Create an HTML entry for each document and add it to the chat
        const entry = document.createElement('p');
        entry.textContent = doc.data().name + ': ' + doc.data().text;
        guestbook.appendChild(entry);
      });
    });
  }

  // ...
  // Unsubscribe from guestbook updates
  function unsubscribeGuestbook() {
    if (guestbookListener != null) {
      guestbookListener();
      guestbookListener = null;
    }
  }

  */
}
main();
