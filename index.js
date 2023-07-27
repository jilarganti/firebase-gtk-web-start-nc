
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
const startMeetingButton = document.getElementById('startMeeting');
const joinMeeting = document.getElementById('signOut');
const userName = document.getElementById('userName');


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

  // ...
  // Called when the user clicks the SignUp button
  signUpButton.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      //signOut(auth);
    } else {
      // No user is signed in; allows user to sign in
      // ui.start('#firebaseui-auth-container', uiConfig);
      signInWithPopup(auth, provider);
    }
  });

  // ...
  // Called when the user clicks the SignIn button
  signInButton.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      //signOut(auth);
    } else {
      // No user is signed in; allows user to sign in
      // ui.start('#firebaseui-auth-container', uiConfig);
      signInWithPopup(auth, provider);
    }
  });

  // Called when the user clicks the RSVP button
  signOutButton.addEventListener('click', () => auth.signOut());

  /**
signInWithPopup(auth, provider): Это функция из Firebase SDK, которая запускает процесс аутентификации с использованием всплывающего окна для выбранного провайдера. auth - это объект Firebase Authentication, который обычно инициализируется с помощью firebase.auth(). provider - это объект, представляющий провайдера аутентификации (например, GoogleAuthProvider, FacebookAuthProvider и т. д.).

.then((result) => { ... }): Это метод Promise, который вызывается, когда аутентификация успешно завершается. result содержит информацию о результате аутентификации, такую как данные пользователя и токен доступа.

const credential = GoogleAuthProvider.credentialFromResult(result);: Здесь из результата аутентификации (result) извлекается учетная запись (credentials) Google, используя метод credentialFromResult, чтобы получить доступ к Google API. Это может быть использовано, например, для выполнения запросов к API Google от имени пользователя.

const token = credential.accessToken;: Здесь извлекается токен доступа (access token) из учетных данных (credentials), полученных от провайдера Google. Токен доступа может быть использован для выполнения безопасных запросов к API, требующим аутентификации.

const user = result.user;: Здесь из результата аутентификации (result) извлекается информация о зарегистрированном пользователе (user). Это может содержать информацию, такую как имя пользователя, электронная почта, идентификатор пользователя и другие данные, предоставленные провайдером аутентификации.

// IdP data available using getAdditionalUserInfo(result): Это закомментированная строка кода, которая указывает на возможность получения дополнительной информации о провайдере идентификации (Identity Provider) с использованием метода getAdditionalUserInfo(result). Например, это может содержать дополнительные данные о пользователе, предоставленные провайдером аутентификации.
 */
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      //console.log(user.displayName + '' + user.email);
      userName.textContent = user.displayName + ' -> ' + user.email;

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
    signUpButton.style.display = 'none';
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

}
main();
