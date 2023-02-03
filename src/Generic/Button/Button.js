import './Button.css'
export default function Button(props) {
    return <div className={`btn-container ${props.className}`}>
        <button onClick={props.onClick}>{props.label}</button>
    </div>
}