// export {}
import { useState } from 'react';
import { auth } from '../../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

export default function ParentalConsent() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const sendConsentRequest = () => {
    const actionCodeSettings = {
      // URL you want to redirect the user to after sign-in completion
      url: 'http://localhost:3000/complete-sign-in',
      handleCodeInApp: true,
    };
    // firebase(auth, email, password)
    // .auth()
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForConsent', email);
        alert('Consent request sent. Please check your email for further instructions.');
        setEmail('');
      })
      .catch((error: any) => {
        console.error('Error sending consent request:', error);
      });
  };

  return (
    <div>
      <h2>Parental Consent</h2>
      <p>Please enter your parent's email address:</p>
      <input type="email" value={email} onChange={handleEmailChange} />
      <button onClick={sendConsentRequest}>Send Consent Request</button>
    </div>
  );
}
