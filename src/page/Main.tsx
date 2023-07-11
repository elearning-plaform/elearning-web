import '../assets/sass/Main.scss'
import { useEffect } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Home = () => {
    const navigate = useNavigate();

    // KEEP USER LOGGED IN
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            localStorage.removeItem('token')
            navigate('/elearning-web', { replace: true })
        }
    }, [navigate])

    // LOGOUT
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('token')
            navigate("/elearning-web")
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error.message)
            console.log(error.code)
        })
    }

    function handleInfo(event: any) {
        console.log(auth.currentUser)
    }

    const lessonStyle = {
        color: auth.currentUser?.isAnonymous ? '#fff' : '#000',
        backgroundColor: auth.currentUser?.isAnonymous ? '#0000003b' : '#fff',
        cursor: auth.currentUser?.isAnonymous ? 'not-allowed' : 'pointer',
        border: auth.currentUser?.isAnonymous ? 'none' : '1px solid #000',
        // className: auth.currentUser?.isAnonymous ? 'my-class' : undefined,
    }

    function handlClickIsAnonymous() {
        console.log(auth.currentUser?.isAnonymous)
        if (auth.currentUser?.isAnonymous) {
            toast.error('Sign in to access this lesson')
        } else {
            toast.success('Here is your lesson!')
            // navigate('/lesson')
        }
    }

    function freeLesson() {
        toast.success('Here is your lesson!')
        // navigate('/lesson')
    }



    return (
        <div>
            <Toaster />
            <nav className='nav-bar'>
                <div className='logo'>
                    <h1>Gogo Lingua</h1>
                </div>
                <ul className="nav-links">
                    <button
                        className="nav-link"
                        onClick={handleLogout}
                    > Logout </button>
                </ul>
            </nav>


            <button
                className="welcome"
                onClick={handleInfo}
            > User Info (Debug)
            </button>

            <div className='lesson-container'>
                <div
                    onClick={freeLesson}
                    // style={lessonStyle}
                    className='lesson one'
                >Lesson 1<div
                    className='progress-bar'
                ></div></div>
                <div
                    onClick={freeLesson}
                    // style={lessonStyle}
                    className='lesson two'
                >Lesson 2<div
                    className='progress-bar'
                ></div></div>
                <div
                    onClick={handlClickIsAnonymous}
                    style={lessonStyle}
                    className='lesson three'
                >
                    {auth.currentUser?.isAnonymous ? '' : 'Lesson 3'}
                    {!auth.currentUser?.isAnonymous && (
                        <div
                            className='progress-bar'
                        ></div>)}
                </div>
                <div
                    onClick={handlClickIsAnonymous}
                    style={lessonStyle}
                    className='lesson four'
                >
                    {auth.currentUser?.isAnonymous ? '' : 'Lesson 4'}
                    {!auth.currentUser?.isAnonymous && (<div className='progress-bar'></div>)}
                </div>

            </div>
        </div>
    )
}

export default Home