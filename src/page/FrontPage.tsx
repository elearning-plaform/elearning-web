import '../assets/sass/FrontPage.scss'
import { signInAnonymously } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import working from '../assets/images/mailchimp-04X1Yp9hNH8-unsplash.jpg';

const FrontPage = () => {
    const navigate = useNavigate()

    function handleClickAsGuest(event: any) {
        console.log("Login as Guest")

        signInAnonymously(auth)
            .then((userCredential) => {
                // The user is signed in anonymously
                // Retrieve the user's token
                const user = userCredential.user;
                user.getIdToken()
                    .then((token) => {
                        // Token retrieved successfully
                        // navigate to home page
                        localStorage.setItem('token', JSON.stringify(token))
                        navigate("/home")
                    })
                    .catch((error) => {
                        // Error retrieving the token
                        console.error('Error retrieving user token:', error);
                    });
            })
            .catch((error) => {
                // Error signing in anonymously
                console.error('Error signing in anonymously:', error);
            });
    }


    return (
        <div className="front-page">
            <nav className='nav-bar'>
                <div className='logo'>
                    <h1>Gogo Lingua</h1>
                </div>
                <ul className="nav-links">
                    <NavLink className="nav-link" to="/signup"> SignUp </NavLink>
                    <NavLink className="nav-link" to="/login"> Login </NavLink>
                </ul>
            </nav>
            <main className="main">
                <img
                    className="main-img"
                    src={working}
                    alt="working" />
                <div className="main-content">
                    <h1 className='title'>Learn a new language</h1>
                    <p className='title'>Learn a new language with Gogo Lingua</p>
                </div>
                <button
                    className='btn'
                    onClick={handleClickAsGuest}
                > Login as Guest
                </button>
            </main>

        </div>
    )
}

export default FrontPage