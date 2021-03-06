import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCNTrybXrQVQ1xoyjHhgT9vhB2wwpdKZzY',
  authDomain: 'cs52-hw3-7d536.firebaseapp.com',
  databaseURL: 'https://cs52-hw3-7d536.firebaseio.com',
  storageBucket: 'cs52-hw3-7d536.appspot.com',
  rules: {
    read: true,
    write: true,
  },
};

firebase.initializeApp(config);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', snapshot => {
    callback(snapshot.val());
  });
}

export function addNote(id, titleInput) {
  firebase.database().ref().child('notes/').push({
    title: titleInput,
    text: 'content',
    x: 400,
    y: 12,
    zIndex: 0,
    isEditing: false,
  });
}
