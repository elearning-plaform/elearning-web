import '../assets/sass/Main.scss'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Home = () => {
    const navigate = useNavigate();
    const [isAnonymous, setIsAnonymous] = useState(false);

    // AUTH STATE CHANGE
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.isAnonymous) {
                    // User is signed in anonymously.
                    console.log("User is signed in anonymously.");
                    setIsAnonymous(true);
                } else {
                    // User is signed in with a regular account.
                    console.log("User is signed in with a regular account.");
                }
            } else {
                // User is signed out.
                console.log("User is signed out.");
            }
        });
    }, []);

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
                <h1>Gogo Lingua</h1>
                <button
                    className="nav-link"
                    onClick={handleLogout}
                > Logout </button>
                <button
                    className="welcome"
                    onClick={handleInfo}
                > User Info (Debug)
                </button>
            </nav>

            <div className='main-container'>
                <div
                    className='left-side'
                ></div>

                <div className='central'>

                    <div className='header-basics'>
                        <h1>BASICS</h1>
                    </div>
                    <div className='container-lessons'>

                        {/* LESSON ONE */}
                        <div className='container-lesson'>
                            <div
                                onClick={freeLesson}
                                className='lesson one'
                            ><div
                                className='progress-bar'
                            >
                                </div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON TWO */}
                        <div className='container-lesson'>
                            <div
                                onClick={freeLesson}
                                className='lesson two'
                            ><div
                                className='progress-bar'
                            >
                                </div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON THREE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson three'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON FOUR */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON FIVE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON SIX */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON SEVEN */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON EIGHT */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON NINE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>
                    </div>




                    <div className='header-advanced'>
                        <h1>ADVENCED</h1>
                    </div>
                    <div className='container-lessons'>

                        {/* LESSON ONE */}
                        <div className='container-lesson'>
                            <div
                                onClick={freeLesson}
                                className='lesson one'
                            ><div
                                className='progress-bar'
                            >
                                </div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON TWO */}
                        <div className='container-lesson'>
                            <div
                                onClick={freeLesson}
                                className='lesson two'
                            ><div
                                className='progress-bar'
                            >
                                </div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON THREE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson three'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON FOUR */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON FIVE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON SIX */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON SEVEN */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON EIGHT */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON NINE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>
                    </div>



                    <div className='header-pro'>
                        <h1>PRO</h1>
                    </div>
                    <div className='container-lessons'>

                        {/* LESSON ONE */}
                        <div className='container-lesson'>
                            <div
                                onClick={freeLesson}
                                className='lesson one'
                            ><div
                                className='progress-bar'
                            >
                                </div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON TWO */}
                        <div className='container-lesson'>
                            <div
                                onClick={freeLesson}
                                className='lesson two'
                            ><div
                                className='progress-bar'
                            >
                                </div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON THREE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson three'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON FOUR */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON FIVE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON SIX */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON SEVEN */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON EIGHT */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON NINE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson four'
                            >
                                {!isAnonymous && (<div className='progress-bar'></div>)}
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>
                    </div>




                </div>

                <div
                    className='right-side'
                ></div>
            </div>

        </div>
    )
}

export default Home