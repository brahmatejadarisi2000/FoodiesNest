import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Login from './Login';

const firebaseConfig = {
  apiKey: "AIzaSyBZiYhdN-l8qH6M6AaT7-EAEXMG7FqsH2c",
  authDomain: "my-cart-sign-in.firebaseapp.com",
  projectId: "my-cart-sign-in",
  storageBucket: "my-cart-sign-in.appspot.com",
  messagingSenderId: "165179843690",
  appId: "1:165179843690:web:2737d088696222855b1613",
};

export function SignIn() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Login />
      <button onClick={handleSignIn}>Login With Google</button>
    </>
  );
}

export default SignIn;
