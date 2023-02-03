import Button from "../Generic/Button/Button"

const AddRemoveDeduction = props => {
    return (
        <>
            {!props.isAdded && <Button className="btn-add" label="ADD" onClick={props.onAdd} />}
            {props.isAdded && <Button className="btn-remove" label="REMOVE" onClick={props.onRemove} />}
        </>
    )
}
export default AddRemoveDeduction