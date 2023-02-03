

import React, { useRef, useState } from "react";
import Input from "../Generic/Input/Input"
import AddRemoveDeduction from "./AddRemoveDeduction";

const METRO_CITY_LIMIT = 0.5
/* const NON_METRO_CITY_LIMIT = 0.4 */
const DeductionByRent = (props) => {

    const basicAmount = useRef();
    const hraAmount = useRef();
    const rentAmount = useRef();

    const [isAdded, setIsAdded] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const checkValidity = (value) => value!=='' && !isNaN(value)  && value.indexOf('e') < 0
    const validateEntry = (details) => {
        for (const key in details) {
            if (!checkValidity(details[key])) {
                return false;
            }
        }
        return true;
    }
    const convertEntry = (details) => {
        for (const key in details) {
            details[key] = modifyEntry(details[key])
        }
        return details
    }
    const calculateTotalDeduction = (details) => {
        const ruleByRent = details.rent - (details.basic * 0.1)
        const ruleByBasic = details.basic * METRO_CITY_LIMIT

        const excemptedRent = Math.min(details.hra, ruleByRent, ruleByBasic) * 12
        return excemptedRent
    }
    const modifyEntry = (value) => value==='' ? 0 : +value
     
    const calculateDeduction = () => {
        const deductionDetails = {
            basic: basicAmount.current.value,
            hra: hraAmount.current.value,
            rent: rentAmount.current.value
        }
        if (validateEntry(deductionDetails)) {
            return calculateTotalDeduction(convertEntry(deductionDetails))
        } else {
            return 0
        }
    }
    const addDeduction = () => {
        const totalDeduction = calculateDeduction()

        if (totalDeduction < 0) {
            setErrorMsg('Rent Amount too low')
        }
        if (totalDeduction === 0) {
            setErrorMsg('Fill all fields and Enter Numeric values only')
        }
        if (totalDeduction > 0) {
            setErrorMsg('')
            props.onDeduction(totalDeduction)
            setIsAdded(true)
        }

    }

    const removeDeduction = () => {
        props.onDeduction(0)
        setIsAdded(false)
    }
    return (
        <div>
            <header>
                {isAdded && <span>&#9989;</span>}
                DEDUCTION UNDER Rent [ All amount should be monthly ]
            </header>
            {errorMsg !== '' && <p className="error-msg">* {errorMsg}</p>}
            <Input label='BASIC' ref={basicAmount} />
            <Input label='HRA' ref={hraAmount} />
            <Input label='Rent Amount' ref={rentAmount} />
            
            <AddRemoveDeduction isAdded={isAdded} onAdd={addDeduction} onRemove={removeDeduction} />
             
        </div>
    )
}

export default DeductionByRent