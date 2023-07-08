import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';
import eye from '../assets/images/eye-solid.svg';

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [parentConfirmation, setParentConfirm] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // SIGNING UP
                const user = userCredential.user;
                sendEmailVerification(user)
                alert("Please check your email for verification")
                navigate("/login")
            })
            // ERROR HANDLING
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        toast.error(`Email address is already in use: \n ${email}`);
                        console.log(errorMessage);
                        break;
                    case 'auth/invalid-email':
                        toast.error(`Email address is invalid: \n ${email}`);
                        console.log(errorMessage);
                        break;
                    case 'auth/operation-not-allowed':
                        toast.error(`Error during sign up.`);
                        console.log(errorMessage);
                        break;
                    case 'auth/weak-password':
                        toast.error('Password is not strong enough. Add additional characters including special characters and numbers.');
                        console.log(errorMessage);
                        break;
                    default:
                        console.log(errorMessage);
                        break;
                }
            });
    }

    return (

        <div className="form-container">
            <Toaster />
            <form
                className="form"
                onSubmit={onSubmit}
            >
                <h3> Profil Oluştur </h3>

                <input
                    // USERNAME
                    className="form-input"
                    type="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    placeholder="Kullanıcı adı"
                />
                <input
                    // EMAIL
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                />
                <div className='password'>
                    <input
                        // PASSWORD
                        className="form-input form-password"
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Şifre"
                        minLength={6}
                    />
                    <img
                        src={eye}
                        className='toggle-password'
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <div className="age-restrictions">
                    <input
                        // AGE RESTRICTIONS
                        id='email-okay'
                        type="checkbox"
                        name="years-old"
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                    />
                    <label htmlFor="okayToEmail">En az 18 yaşında olduğumu onaylıyorum.</label>
                </div>

                <p>18 yaşından küçükseniz lütfen velinizin email adresini giriniz.</p>

                <input
                    // PARENTS EMAIL
                    className="form-input"
                    type="email"
                    value={parentConfirmation}
                    onChange={(e) => setParentConfirm(e.target.value)}
                    required={!isChecked}
                    disabled={isChecked}
                    placeholder="Veli email"
                />

                <button className="form-submit">
                    Hesap Aç</button>

                <p>Hesap açarak Gogo Lingua Kullanım Şartları ve Gizlilik Politikasını
                    kabul etmiş olursunuz.</p>

            </form>

            <p className='signin-link'> Already have an account?
                <NavLink to="/login"> Sign in</NavLink>
            </p>

        </div>
    )
}

export default Signup
