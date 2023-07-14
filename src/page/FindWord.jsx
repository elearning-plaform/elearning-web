import '../assets/sass/FindWord.scss'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import back from '../assets/images/previous.png'

export default function FindWord() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            localStorage.removeItem('token')
            navigate('/elearning-web', { replace: true })
        } else {
        }
    }, [navigate])


    function handleSubmit(event) {
        event.preventDefault()
    }

    function handleClick(event) {
        if (event.target.name === 'Morning') {
            toast.success('Correct!')
        } else {
            toast.error('Wrong answer. Please try again')
        }
    }

    return (
        <div className="exercise-wrapper">
            <Toaster />
            <NavLink className="nav-link-home" to="/main">
                <img className="home-btn" src={back} alt="back to home btn" />
            </NavLink>
            <h1 className='exercise-title'>Translate French!</h1>
            <div className="wrapper-question">
                <p>Matin</p>
            </div>
            <form className="wrapper-answer" onSubmit={handleSubmit}>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Mother'>
                    Mother
                </button>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Month'>
                    Month
                </button>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Morning'>
                    Morning
                </button>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Meta'>
                    Meta
                </button>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Metro'>
                    Metro
                </button>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Meteor'>
                    Meteor
                </button>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Meteor'>
                    Mind
                </button>

                <button
                    className='word'
                    onClick={handleClick}
                    name='Meteor'>
                    Math
                </button>

            </form>
        </div>
    )
}