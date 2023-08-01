import '../assets/sass/FindWord.scss'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import back from '../assets/images/previous.png'

export default function FindWord() {
    const navigate = useNavigate();
    const buttons = ['Mother', 'Month', 'Morning', 'Meta', 'Metro', 'Meteor', 'Mind', 'Math']
    const randomButtons = buttons.sort(() => Math.random() - 0.5)

    const renderButtons = randomButtons.map((button, index) => {
        return <button key={index} className='word' onClick={handleClick} name={button}>{button}</button>
    })

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
                {renderButtons}
            </form>
        </div>
    )
}