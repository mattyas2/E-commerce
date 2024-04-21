import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../assets/config/firebase"
import { useAuth } from "../auth/AuthProvider";

export const ResetPassword = ()=>{
    const {email} = useAuth()
    const auth = getAuth(app);
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch(() => {
    console.error();
    // ..
  });
    return(
      <>
      <h1>hola</h1>
      </>
    )
}