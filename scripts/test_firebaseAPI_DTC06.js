
var firebaseConfig = {
  apiKey: "AIzaSyAk6iD4UxQ_Q2PHw8c1dOYeDPWJSg0jZws",
  authDomain: "insurus-1800.firebaseapp.com",
  projectId: "insurus-1800",
  storageBucket: "insurus-1800.appspot.com",
  messagingSenderId: "727070157634",
  appId: "1:727070157634:web:c7a8d728357428d78df6db"
    // apiKey: "AIzaSyBUs0BPrweOlJxdQjyUlH6vt3AOTHpgxzE",
    // authDomain: "comp1800-2023-project-dtn06.firebaseapp.com",
    // projectId: "comp1800-2023-project-dtn06",
    // storageBucket: "comp1800-2023-project-dtn06.appspot.com",
    // messagingSenderId: "877443410346",
    // appId: "1:877443410346:web:20794273552ffa63a2e3d3"
    // apiKey: "AIzaSyDR7et-R04h9d4coJG6u1SZY-G6kTIuTmU",
    // authDomain: "project2023-b71c5.firebaseapp.com",
    // projectId: "project2023-b71c5",
    // storageBucket: "project2023-b71c5.appspot.com",
    // messagingSenderId: "884597523435",
    // appId: "1:884597523435:web:26ef0ca9fbe7f12feb0fae",
    // measurementId: "G-3ECL1VRSE9"
  }; 

  //--------------------------------------------
  // initialize the Firebase app
  // initialize Firestore database if using it
  //--------------------------------------------
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();