import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;

  } catch (error) {
    console.log(error, 'error');
    return null;
  }
}
