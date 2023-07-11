import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';
import eye from '../assets/images/eye-svgrepo-com.svg';
import emailjs from '@emailjs/browser';

const Signup = () => {
    const navigate = useNavigate();
    const form = useRef();

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

    const onSubmit = async (e) => {
        e.preventDefault()

        if (username === '') {
            toast.error("Please fill in username field")
            return
        } else if (email === '') {
            toast.error("Please fill in email field")
            return
        } else if (password === '') {
            toast.error("Please fill in password field")
            return
        } else if (parentConfirmation === '' && isChecked === false) {
            toast.error("Please enter your parent's email")
            return
        } else if (parentConfirmation !== '' && parentConfirmation === email) {
            toast.error("Parent's email cannot be the same as yours")
            return
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // SIGNING UP
                const user = userCredential.user;
                await updateProfile(auth.currentUser, {
                    displayName: username
                })
                sendEmailVerification(user)
                if (isChecked === false && parentConfirmation !== '') {
                    emailjs.sendForm(
                        process.env.REACT_APP_YOUR_SERVICE_ID,
                        process.env.REACT_APP_YOUR_TEMPLATE_ID,
                        form.current,
                        process.env.REACT_APP_YOUR_PUBLIC_KEY)
                        .then((result) => {
                            console.log(result.text);
                        }, (error) => {
                            console.log(error.text);
                        });
                }
                alert("Please check your email for verification. Also check your spam folder")
                navigate("/login")
            })
            // ERROR HANDLING
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        toast.error("Email address is already in use");
                        console.log(errorMessage);
                        break;
                    case 'auth/invalid-email':
                        toast.error("Invalid email address");
                        console.log(errorMessage);
                        break;
                    case 'auth/operation-not-allowed':
                        toast.error("Error during sign up");
                        console.log(errorMessage);
                        break;
                    case 'auth/weak-password':
                        toast.error("Password is less than 6 characters");
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

            <nav className='nav-bar'>
                <div className='logo'>
                    <h1>Gogo Lingua</h1>
                </div>
                <ul className="nav-links">
                    <NavLink className="nav-link" to="/home"> Home </NavLink>
                    <NavLink className="nav-link" to="/signup"> SignUp </NavLink>
                    <NavLink className="nav-link" to="/login"> Login </NavLink>
                </ul>
            </nav>

            <form
                ref={form}
                noValidate
                className="form"
                onSubmit={onSubmit}
            >
                <h2> Sign Up </h2>

                <input
                    // USERNAME
                    className="form-input"
                    type="username"
                    name="to_name"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    placeholder="Username"
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
                <div className="age-restrictions">
                    <input
                        // AGE RESTRICTIONS
                        id='email-okay'
                        type="checkbox"
                        name="years-old"
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                    />
                    <label htmlFor="okayToEmail">I certify that I am at least 18 years old.</label>
                </div>

                <p>If you are under the age of 18, please enter your parent's email address.</p>

                <input
                    // PARENTS EMAIL
                    className="form-input"
                    type="email"
                    name="parent_email"
                    value={parentConfirmation}
                    onChange={(e) => setParentConfirm(e.target.value)}
                    required={!isChecked}
                    disabled={isChecked}
                    placeholder="Parent email"
                />


                <button className="form-submit">
                    Sign Up</button>

                <p>By creating an account, you agree to the Gogo Lingua Terms of Use and Privacy Policy.</p>

            </form>

            <p className='signin-link'> Already have an account?
                <NavLink to="/login"> Sign in</NavLink>
            </p>

        </div>
    )
}

export default Signup
