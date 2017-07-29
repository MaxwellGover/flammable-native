const AUTHENTICATING = 'AUTHENTICATING';
const IS_AUTHED = 'IS_AUTHED';
const NOT_AUTHED = 'NOT_AUTHED';

import { fbAuth, db } from '~/config/settings';
import { Actions } from 'react-native-router-flux';

export function authenticating () {
  return {
    type: AUTHENTICATING
  }
}

export function notAuthed () {
  return {
    type: NOT_AUTHED
  }
}

export function isAuthed (user) {
  return {
    type: IS_AUTHED,
    user
  }
}

export function loginUser (user) {
  return function (dispatch, getState) {
    dispatch(authenticating());

    const email = user.email;
    const password = user.password;

    fbAuth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(`${errorCode}: ${errorMessage}`);
      })
      .then(() => {
        dispatch(authenticating());
        Actions.feed()
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
      const artistId = 'p8ROzG1xAvewhF1j3ISz0bsXwhq1';

      // Store basic user data
      db.ref(`users/${user.uid}`).set({
        username: formData.username,
        displayName: formData.displayName,
        uid: user.uid
      })

      // Add username to list of taken usernames
      db.ref(`usernames/`).push(formData.username);

      // If the current users Id doesn't match the artists id,
      // automatically follow artist
      if (user.uid !== artistId) {
        db.ref(`users/${user.uid}/following/${artistId}`).set(true)
          .then(() => Actions.home())
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
      dispatch(notAuthed())
      Actions.register();
    }).catch((error) => {
    // An error happened.
      console.warn(error);
    });
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: false
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
        isAuthed: false
      }
    case IS_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: true
      }
    default :
      return state
  }
}
