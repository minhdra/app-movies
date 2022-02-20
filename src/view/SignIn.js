import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function SignIn() {
  return (
    <div className='pt-24 min-h-screen flex'>
      <div className='flex flex-col items-center justify-center m-auto'>
        <h1 className='uppercase text-xl text-orange-600 font-bold'>Sign In</h1>
        <form className='p-4'>
          <div>
            <input className='pt-2 outline-0 bg-transparent border-b border-slate-400' type='text' placeholder='username/email' />
          </div>
          <div>
            <input className='pt-2 outline-0 bg-transparent border-b border-slate-400' type='password' placeholder='password'/>
          </div>
          <div className='flex justify-between'>
            <button type='submit' className='bg-orange-600 text-white py-1 px-4 mt-2 rounded-md hover:brightness-90'>Sign In</button>
            <button type='submit' className='border border-slate-400 py-1 px-4 mt-2 rounded-md hover:brightness-75'>Sign Up</button>
          </div>
        </form>
          <div>Or sign in with socials</div>
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    </div>
  )
}

export default SignIn;