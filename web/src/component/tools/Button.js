import React from "react"
import "./Button.css"


const Button = ({ icon, content, type, onClick }) => (

    <button type={type} onClick={onClick} className="button">
        {icon && <i className={`fa fa-${icon} mr-3`} />}
        {content}
    </button>
)
Button.defaultProps = {
    type: 'button',
    icon: null
}
export default Button;