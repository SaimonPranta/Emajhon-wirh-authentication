import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const handleSignInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProvider)
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        };
        // setUser(newUser)
        // setUserContainer(newUser)
        return newUser
        console.log('google click', result)
        navigate(from, { replace: true })
      })
      .catch(error => console.log(error))
  }