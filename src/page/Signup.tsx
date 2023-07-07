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

        <div className="form-container">
            <form className="form">
                <h3> Profil oluştur </h3>

                <input
                    className="form-input"
                    type="username"
                    // value={username}
                    // onChange={(e) => setUserName(e.target.value)}
                    required
                    placeholder="Kullanıcı adı"
                />
                <input
                    className="form-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Şifre"
                />
                <div className="age-restrictions">
                    <input
                        id='email-okay'
                        type="checkbox"
                        name="years-old"
                    // onChange={handleChange}
                    // checked={formData.joinedNewsletter}
                    />
                    <label htmlFor="okayToEmail">En az 18 yaşında olduğumu onaylıyorum</label>
                </div>

                <p>18 yaşından küçükseniz lütfen velinizin email adresini giriniz.</p>

                <input
                    className="form-input"
                    type="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Veli emai"
                />

                <button
                    className="form-submit"
                    type="submit"
                    onClick={onSubmit}
                >
                    Sign up
                </button>

                <p>Üye olarak Gogo Lingua Kullanım Şartları ve Gizlilik Politikasını
                    kabul etmiş olursunuz.</p>
            </form>

            <p className='signin-link'>
                Already have an account?{' '}
                <NavLink to="/login"> Sign in</NavLink>
            </p>

        </div>
    )
}

export default Signup