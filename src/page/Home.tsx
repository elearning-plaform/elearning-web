import '../assets/sass/Home.scss'
import { signInAnonymously } from 'firebase/auth'
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import frontPageIcons from '../assets/images/WLP_Alternative Background_small.png';

const Home = () => {
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
                        navigate("/main")
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
        <div className='home-page'>
            <div className='container-home'>
                <img
                    className='front-page-icons'
                    src={frontPageIcons}
                    alt="front-page-icons" />
                <div className='front-page-info'>
                    <h1
                        className='front-page-title'
                    >Language Learning</h1>
                    <p
                        className='front-page-text'
                    >
                        The free, fun, and effective way to learn a language!
                    </p>
                    <h1
                        className='front-page-title-2'
                    >Learn English for free</h1>
                    <div className='front-page-buttons'>
                        <NavLink to='/login' className='front-page-button'>I HAVE AN ACCOUNT</NavLink>
                        <NavLink to='/signup' className='front-page-button'>GET STARTED</NavLink>
                        <div 
                        onClick={handleClickAsGuest}
                        className='front-page-button'
                        >TRY IT</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
