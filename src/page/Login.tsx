import '../assets/sass/Login.scss'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user.emailVerified === false) {
                    toast.error("Please verify your email first")
                    return
                }
                navigate("/home")
                localStorage.setItem('token', JSON.stringify(user.getIdToken))
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
            <form className="form">
                <h1> Login </h1>

                <input
                    className="form-input"
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="form-input"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="form-submit"
                    onClick={onLogin}
                > Login
                </button>
            </form>
            <p className="signin-link"
            >No account yet? {' '}
                <NavLink to="/signup"> Sign up </NavLink>
            </p>
        </div >

    )
}

export default Login