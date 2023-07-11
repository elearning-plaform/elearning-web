import '../assets/sass/Home.scss';
import { useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // KEEP USER LOGGED IN
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            localStorage.removeItem('token');
            navigate('/elearning-web', { replace: true });
        }
    }, [navigate])

    // LOGOUT
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('token');
            navigate("/elearning-web");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error.message)
            console.log(error.code)
        });
    }

    function handleInfo(event: any) {
        console.log(auth.currentUser)
    }

    function handlClickIsAnonymous(event: any) {
        console.log(auth.currentUser?.isAnonymous)
        if (auth.currentUser?.isAnonymous) {
            alert('Sign in to access this lesson')
        } else {
            alert('Here is your lesson!')
            // navigate('/lesson')
        }
    }

    const lessonStyle = {
        color: auth.currentUser?.isAnonymous ? '#fff' : '#000',
        backgroundColor: auth.currentUser?.isAnonymous ? '#000' : '#fff'
    };

    return (
        <div>
            <nav>
                <p>Welcome Home</p>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleInfo}>User Info</button>
                </div>
            </nav>

            <div className='lesson-container'>
                <div
                    // onClick={handlClick}
                    // style={lessonStyle}
                    className='lesson one'>
                    Lesson 1</div>
                <div
                    // onClick={handlClick}
                    // style={lessonStyle}
                    className='lesson two'
                >Lesson 2</div>
                <div
                    onClick={handlClickIsAnonymous}
                    style={lessonStyle}
                    className='lesson three'
                >Lesson 3</div>
                <div
                    onClick={handlClickIsAnonymous}
                    style={lessonStyle}
                    className='lesson four'>
                    Lesson 4</div>
                <div
                    onClick={handlClickIsAnonymous}
                    style={lessonStyle}
                    className='lesson five'>
                    Lesson 5</div>
                <div
                    onClick={handlClickIsAnonymous}
                    style={lessonStyle}
                    className='lesson six'>L
                    esson 6</div>
                <div
                    onClick={handlClickIsAnonymous}
                    style={lessonStyle}
                    className='lesson seven'
                >Lesson 7</div>
            </div>
        </div>
    )
}

export default Home;