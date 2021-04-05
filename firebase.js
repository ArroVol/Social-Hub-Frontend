import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBe9IMpCrHBpTKS3r_UMv1hrVNIUIZlW64",
    authDomain: "buzz-bulletin.firebaseapp.com",
    projectId: "buzz-bulletin",
    storageBucket: "buzz-bulletin.appspot.com",
    messagingSenderId: "670727914331",
    appId: "1:670727914331:web:0fd706c650f68cf141507e"
  };

  //set up access to the firebase database
  //first thing - initialize the app
  //since we are doing server side rendering we need to protect ourselves 
  //in case we already initialized the app .
  //we have a fast refresh mechanizism
  // ternery expression. if there are no firebase apps then initialize one
  // if we already initialized it then just use it
  const app = !firebase.apps.length
  //otherwise initialize a new one with teh config "firebaseconfig"
   ? firebase.initializeApp(firebaseConfig) 
   // use this one if we already have one
   : firebase.app()

   //get access to the database
   const db = app.firestore()
   //get access to the authentication
   const auth = app.auth();

   //get access a provider 
   const provider = new firebase.auth.GoogleAuthProvider();

   //export it so we can use it outside, allow us to have access to our firebase inside our application
   export {db, auth, provider};