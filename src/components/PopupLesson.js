import '../assets/sass/PopupLesson.scss'

function PopupLesson(props) {
    return ((props.trigger) ? (
        <div className="popup-lesson" onClick={() => props.setTrigger(false)}>
            <div className="popup-inner">
                {/* <button className="close-btn" onClick={()=>props.setTrigger(false)}>close</button> */}
                {props.children}
            </div>
        </div>
    ) : "");
}

export default PopupLesson;