import '../assets/sass/Login.scss'
import { useState } from 'react'
import { signInWithEmailAndPassword, } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import eye from '../assets/images/eye-svgrepo-com.svg'
import back from '../assets/images/previous.png'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    };

    const onLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user.emailVerified === false) {
                    toast.error("Please verify your email first")
                    return
                }

                if (user) {
                    // User is signed in, proceed to get the ID token
                    user.getIdToken()
                        .then((token) => {
                            // Token retrieved successfully
                            // navigate to home page
                            localStorage.setItem('token', JSON.stringify(token))
                            navigate("/main")
                        })
                        .catch((error) => {
                            console.error('Error getting ID token:', error)
                        });
                } else {
                    // User is not signed in
                    console.log('User is not signed in')
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/invalid-email':
                        toast.error("Invalid email address");
                        console.log(errorMessage);
                        break;
                    case 'auth/missing-password':
                        toast.error("Missing password");
                        console.log(errorMessage);
                        break;
                    case 'auth/user-not-found':
                        toast.error("Email not found");
                        console.log(errorMessage);
                        break;
                    case 'auth/wrong-password':
                        toast.error("Wrong password");
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
            <NavLink className="nav-link-home" to="/home">
                <img className="home-btn" src={back} alt="back to home btn" />
            </NavLink>

            <form className="form">
                <h2>Login</h2>
                <input
                    className="form-input"
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className='password'>
                    <input
                        // PASSWORD
                        className="form-input form-password"
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        minLength={6}
                    />
                    <img
                        src={eye}
                        alt='eye'
                        className='toggle-password'
                        onClick={togglePasswordVisibility}
                    />
                </div>
                <NavLink
                    className='forgot-password'
                    to="/forgot-password"
                >Forgot password?</NavLink>
                <button
                    className="form-submit"
                    onClick={onLogin}
                > Login
                </button>
                {/* <div
                    className="form-submit guest"
                    onClick={handleClickAsGuest}
                > Login as Guest
                </div> */}
                {/* <p><NavLink to="/forgot-password">Forgot password?</NavLink></p> */}
            </form>

            <p className="signin-link">No account yet?
                <NavLink to="/signup"> Sign up </NavLink>
            </p>
        </div >

    )
}

export default Login
