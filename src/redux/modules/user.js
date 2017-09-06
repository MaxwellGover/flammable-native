import { fbAuth, db } from '../../config/settings';
import { Actions } from 'react-native-router-flux';

const STORE_USER_DATA = 'STORE_USER_DATA';

function storeUserData(userData) {
  return {
    type: 'STORE_USER_DATA',
    userData
  }
}

export function getUserData(uid) {
  return function(dispatch, getState) {
    db.ref(`users/${uid}/`).on('value', snapshot => {
      console.log(snapshot.val());
      dispatch(storeUserData(snapshot.val()));
      if (uid === "UIYh4W4VuXcJBhZ803obFVIo9cq1") {
        Actions.me();
      } else {
        Actions.home();
      }
    })
  }
}

const initialState = {
  user: null
}

export default function user(state = initialState, action) {
  switch(action.type) {
    case STORE_USER_DATA :
      return {
        user: action.userData
      }
    default :
      return state
  }
}
