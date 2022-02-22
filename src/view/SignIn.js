import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callback: {
  
  }
};

function SignIn() {
  return (
    <div className='min-h-screen flex bg-sign-in'>
      <div className='flex flex-col items-center justify-center m-auto bg-black bg-opacity-80 rounded p-8'>
        <h1 className='uppercase text-xl text-white pb-4 font-bold hover:text-orange-600 transition'>
          <Link to={'/'}>Dra Cinema</Link>
        </h1>
        <div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
