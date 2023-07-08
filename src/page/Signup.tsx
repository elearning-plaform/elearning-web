import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';
import eye from '../assets/images/eye-svgrepo-com.svg';

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
        } else if (parentConfirmation !== '' && isChecked === false) {
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
            <form
                noValidate
                className="form"
                onSubmit={onSubmit}
            >
                <h2> Sign Up </h2>

                <input
                    // USERNAME
                    className="form-input"
                    type="username"
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
