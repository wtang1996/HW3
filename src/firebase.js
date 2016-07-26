import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCNTrybXrQVQ1xoyjHhgT9vhB2wwpdKZzY',
  authDomain: 'cs52-hw3-7d536.firebaseapp.com',
  databaseURL: 'https://cs52-hw3-7d536.firebaseio.com',
  storageBucket: 'cs52-hw3-7d536.appspot.com',
};

firebase.initializeApp(config);

firebase.database().ref('/').child('zIndex')
.set({
  maxZ: 0,
});

export function fetchZ(callback) {
  firebase.database().ref('zIndex').on('value', snapshot => {
    callback(snapshot.val());
  });
}

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', snapshot => {
    callback(snapshot.val());
  });
}

export function addNote(titleInput) {
  firebase.database().ref('notes')
  .push({
    title: titleInput,
    text: 'content',
    x: 400,
    y: 12,
    zIndex: 0,
    isEditing: false,
  });
}

export function deleteNote(id) {
  firebase.database().ref('notes').child(id)
  .remove();
}

export function setZIndex(id, z) {
  firebase.database().ref('/zIndex').update({
    maxZ: z + 1,
  });
  firebase.database().ref(`notes/${id}`).update({
    zIndex: z + 1,
  });
}

export function updatePosition(id, x, y) {
  firebase.database().ref(`notes/${id}`).update({
    x,
    y,
  });
}

export function editNote(id, status) {
  firebase.database().ref(`notes/${id}`).update({
    isEditing: status,
  });
}

export function editText(id, text) {
  firebase.database().ref(`notes/${id}`).update({
    text,
  });
}
