import '../assets/sass/PopupLesson.scss'

function PopupLesson(props) {
    return ((props.trigger) ? (
        <div className="popup-lesson">
            <div className="popup-inner">
                <button className="close-btn">close</button>
                {props.children}
            </div>
        </div>
    ) : "");
}

export default PopupLesson;