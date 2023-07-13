import '../assets/sass/Main.scss'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import padlock from '../assets/images/padlock.png';
import unlocked from '../assets/images/unlock.png';
import PopupLesson from '../components/PopupLesson'

const Home = () => {
    const navigate = useNavigate();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);

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

    function handleInfo() {
        console.log(auth.currentUser)
    }

    const lessonStyle = {
        color: isAnonymous ? '#fff' : '#000',
        backgroundColor: isAnonymous ? '#0000003b' : '#fff',
        cursor: isAnonymous ? 'not-allowed' : 'pointer',
        border: isAnonymous ? 'none' : '1px solid #000',
        // className: auth.currentUser?.isAnonymous ? 'my-class' : undefined,
    }

    const headerStyle = {
        // color: isAnonymous ? '#fff' : '#000',
        background: isAnonymous ? '#0000003b' : '',
    }

    function handlClickIsAnonymous() {
        // console.log(auth.currentUser?.isAnonymous)
        if (isAnonymous) {
            toast.error('Sign in to access this lesson')
        } else {
            toast.success('Here is your lesson!')
            // navigate('/lesson')
        }
    }

    function freeLesson() {
        toast.success('Here is your lesson!')
        // navigate('/lesson')
        setButtonPopup(true)

    }



    return (
        <div>
            <Toaster />
            <PopupLesson trigger={buttonPopup} setTrigger={setButtonPopup}>
                <button
                    onClick={() => console.log('read')}
                >Read</button>
                <button
                    onClick={() => console.log('practice')}
                >Practice</button>
            </PopupLesson>

            <div className='main-container'>
                <div className='left-side'>
                    <button
                        className="nav-link"
                        onClick={handleLogout}
                    > Logout </button>
                    <button
                        className="welcome"
                        onClick={handleInfo}
                    > User Info (Debug)
                    </button>
                </div>

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
                            >
                                <img className="lock" src={unlocked} alt="padlock" />
                                <div
                                    className='progress-bar'
                                >
                                </div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON TWO */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson two'
                            >
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>
                    </div>




                    <div className='header-advanced' style={headerStyle}>
                        <h1>ADVENCED</h1>
                    </div>
                    <div className='container-lessons'>

                        {/* LESSON ONE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson one'
                            >
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON TWO */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson two'
                            >
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>
                    </div>



                    <div className='header-pro' style={headerStyle}>
                        <h1>PRO</h1>
                    </div>
                    <div className='container-lessons'>

                        {/* LESSON ONE */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson one'
                            >
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
                            </div>
                            <p className='lesson-title'>Lesson</p>
                        </div>

                        {/* LESSON TWO */}
                        <div className='container-lesson'>
                            <div
                                onClick={handlClickIsAnonymous}
                                style={lessonStyle}
                                className='lesson two'
                            >
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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
                                <img className="lock" src={isAnonymous ? padlock : unlocked} alt="padlock" />
                                <div className='progress-bar'></div>
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