import '../assets/sass/Login.scss'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user.emailVerified === false) {
                    alert("Please verify your email first")
                    return
                }
                navigate("/home")
                localStorage.setItem('token', JSON.stringify(user.getIdToken));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    return (

        <div className="form-container">
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