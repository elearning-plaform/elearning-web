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
            navigate('/login', { replace: true });
        }
    }, [navigate])

    // LOGOUT
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('token');
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error.message)
            console.log(error.code)
        });
    }

    function handleInfo(event: any) {
        console.log(auth.currentUser)
    }

    return (
        <div>
            <nav>
                <p>
                    Welcome Home
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                    <button onClick={handleInfo}>
                        user info
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Home;