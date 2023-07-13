import '../assets/sass/Login.scss'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import back from '../assets/images/previous.png';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const onLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Please check your email for password reset")
                navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/invalid-email':
                        toast.error("Invalid email address");
                        console.log(errorMessage);
                        break;
                    case 'auth/missing-email':
                        toast.error("Please fill in email field");
                        console.log(errorMessage);
                        break;
                    case 'auth/user-not-found':
                        toast.error("Email not found");
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
                <h2>Password Reset</h2>
                <input
                    className="form-input"
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="form-submit"
                    onClick={onLogin}
                >Reset
                </button>
            </form>

            <p className="signin-link">Remember your password?
                <NavLink to="/login"> Login </NavLink>
            </p>
        </div >
    )
}

export default ForgotPassword
