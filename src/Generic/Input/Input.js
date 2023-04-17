import React from "react";
import "./Input.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className="entry-option">
      <label>
        {props.label} :&nbsp;<p>{props.errorMsg}</p>
      </label>
      {props.type && <input type={props.type} ref={ref} />}
      {!props.type && !props.value &&<input type="text" ref={ref} />}
      {props.value && <input type="text" ref={ref} value={props.value}/>}
    </div>
  );
});
export default Input;
