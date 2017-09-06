const AUTHENTICATING = 'AUTHENTICATING';
const IS_AUTHED = 'IS_AUTHED';
const NOT_AUTHED = 'NOT_AUTHED';

import { fbAuth, db } from '~/config/settings';
import { Actions } from 'react-native-router-flux';

export function authenticating() {
  return {
    type: AUTHENTICATING
  }
}

export function notAuthed() {
  return {
    type: NOT_AUTHED
  }
}

export function isAuthed(uid) {
  return {
    type: IS_AUTHED,
    uid
  }
}

export function loginUser (user) {
  return function (dispatch, getState) {
    dispatch(authenticating());

    const email = user.email;
    const password = user.password;

    fbAuth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        dispatch(notAuthed());
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(`${errorCode}: ${errorMessage}`);
      })
      .then(() => {
        const user = fbAuth.currentUser;
        dispatch(authenticating());
        dispatch(isAuthed(user.uid));
      })
      .catch((error) => {
        console.warn(`Error in callback: ${error}`)
      });
    }
}

export function createUser (formData) {
  return function (dispatch, getState) {
    dispatch(authenticating());

    const email = formData.email;
    const password = formData.password;

    fbAuth.createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then(() => {
      // User creation was successful
      const user = fbAuth.currentUser;

      // Get id of artist beta tester
      const artistId = "UIYh4W4VuXcJBhZ803obFVIo9cq1";

      // Store basic user data
      db.ref(`users/${user.uid}`).set({
        username: formData.username,
        displayName: formData.displayName,
        uid: user.uid
      })

      // Add username to list of usernames
      db.ref(`usernames/`).push(formData.username);

      // If the current users id doesn't match the artists id,
      // automatically follow artist
      if (user.uid !== artistId) {
        db.ref(`users/${user.uid}/following/${artistId}`).set(true)
          .then(() => dispatch(isAuthed(user.uid)))
      }
    }).catch((error) => {
      console.warn(`Error in callback: ${error}`)
    });
  }
}

export function signOut () {
  return function (dispatch, getState) {
    fbAuth.signOut().then(() => {
      // Sign-out successful.
      dispatch(notAuthed());
    }).catch((error) => {
      // An error happened.
      console.warn(error);
    });
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: false,
  uid: ''
}

export default function authentication (state = initialState, action) {
  switch(action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: !state.isAuthenticating
      }
    case NOT_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: false,
        uid: ''
      }
    case IS_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: true,
        uid: action.uid
      }
    default :
      return state
  }
}
