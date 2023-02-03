import React from "react"
import './Input.css'
const Input = React.forwardRef((props, ref) => {

    return (
        <div className="entry-option">
            <label>{props.label} :&nbsp;<p>{props.errorMsg}</p></label>
            <input type="text" ref={ref} />
        </div>
    )
})
export default Input