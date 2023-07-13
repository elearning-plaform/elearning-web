import '../assets/sass/PopupLesson.scss'

function PopupLesson(props) {
    return ((props.trigger) ? (
        <div className="popup-lesson" onClick={() => props.setTrigger(false)}>
            <div className="popup-inner">
                {props.children}
            </div>
        </div>
    ) : "");
}

export default PopupLesson;