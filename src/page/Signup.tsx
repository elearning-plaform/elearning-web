import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                const idToken = await user.getIdToken();
                console.log("idToken - ", idToken);
                console.log(user);
                sendEmailVerification(user)
                navigate("/login")
                alert("Please check your email for verification")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });

    }

    return (
        <main >
            <section>
                <div>
                    <div>
                        <h1> Sign Up </h1>
                        <form>
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={onSubmit}
                            >
                                Sign up
                            </button>

                        </form>

                        <p>
                            Already have an account?{' '}
                            <NavLink to="/login" >
                                Sign in
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Signup