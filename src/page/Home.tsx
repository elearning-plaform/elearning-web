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
                    >Gogo Lingua</h1>
                    <p
                        className='front-page-text'
                    >
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt
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



            {/* <NavLink to="/forgot-password">Forgot password?</NavLink>
                <br />
                <NavLink to="/login">Login</NavLink>
                <br />
                <NavLink to="/signup">Sign Up</NavLink> */}


        </div>
    )
}

export default Home