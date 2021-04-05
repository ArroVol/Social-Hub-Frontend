import '../styles/globals.css'
// pull in a hook from firebase hooks
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import Login from "./login";
import Loading from '../components/Loading';
import firebase from "firebase";
import {useEffect} from "react";

function MyApp({ Component, pageProps }) {
  //check if there is a user logged in right now
  //get the user, if there was a user logged in - this is a real time listener, it will update the user once we log in
  //which will then return the rest of the applciation
  const [user, loading] = useAuthState(auth);

  //the first time the user logs in - capture them (have their details stored in a users collections)
  //use effects are used to collect a users code, whenever the component mounts this will trigger
  //to mount initially - pass in an empty bracket (when the ocmponent mounts, we will fire off the code inside)
  //also fires whenever the user changes
  useEffect(() => {
    if(user) {
      //tapping into the firestore (nosql structure firebase)
      // using .set, if it wasnt created initially, (first time use)
      // users uid comes from their google profile
      //pass in an object in the paranthesis
      //set goes in and replaces everything in that document (when the user logs in for the first time)
      db.collection("users").doc(user.uid).set(
        {
        email: user.email,
        //firebase time stamp, we all use the same database, so use firebases time stamp
        //then we will translate it on our local machine to our timezone
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        //get the users profile picture from google
        photoURL: user.photoURL,
      },
      //second argument passed in
      { merge: true }
      );
    }
  }, [user]);


  //if there is loading return a loading component (not a page)
  if(loading) return <Loading />
    //if there is no user logged in return the login screen
  if(!user) return <Login />;

  return <Component {...pageProps} />
}

export default MyApp
