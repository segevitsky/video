{/* // Your web app's Firebase configuration */}
var firebaseConfig = {
  apiKey: 'AIzaSyDJYW3MnEmNKRmI7zjis7uEGLw7q0wlovg',
  authDomain: 'video-project-c864d.firebaseapp.com',
  databaseURL: 'https://video-project-c864d-default-rtdb.firebaseio.com',
  projectId: 'video-project-c864d',
  storageBucket: 'video-project-c864d.appspot.com',
  messagingSenderId: '690928711795',
  appId: '1:690928711795:web:0a227ee966a632072c1206',
  measurementId: 'G-PR870GM63Q'
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export const incrementViews = async (id) => {
  const ref = firebase.database().ref('/events').child(id);
  
  ref.transaction((currentViews) => {
    return currentViews + 1;
  });
};

incrementViews('views');


//  Like/Dislike handlers //
let upCounter = document.querySelector('.up-vote');
let downCounter = document.querySelector('.down-vote');

export const thumbsUp = document.querySelector('#thumbsUp');
thumbsUp.addEventListener('click',() => {
  incrementViews('likes');
  upCounter.innerHTML++;
});

export const thumbsDown = document.querySelector('#thumbsDown');
thumbsDown.addEventListener('click',() => {
  incrementViews('dislikes');
  downCounter.innerHTML++;
});
