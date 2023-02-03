
import React, { useRef, useState } from "react";
import Input from "../Generic/Input/Input"
import AddRemoveDeduction from "./AddRemoveDeduction";

const MAX_80_C_LIMIT = 150000
const DeductionBy80C = (props) => {

    const pfAmount = useRef();
    const licDeduction = useRef();
    const loanDeduction = useRef();
    const otherDeduction = useRef();


    const [isAdded, setIsAdded] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    const checkValidity = (value) => !isNaN(value) && value.indexOf('e') < 0
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
        let totalDeduction = 0
        for (const key in details) {
            totalDeduction += details[key]
        }
        return totalDeduction > MAX_80_C_LIMIT ? MAX_80_C_LIMIT : totalDeduction
    }
    const modifyEntry = (value) => value === '' ? 0 : +value
    const collectEntry = () => {
        return {
            pf: pfAmount.current.value,
            lic: licDeduction.current.value,
            homeLoan: loanDeduction.current.value,
            other: otherDeduction.current.value
        }
    }


    const addDeduction = () => {
        const deductionDetails = collectEntry()
        if (validateEntry(deductionDetails)) {
            const totalDeduction = calculateTotalDeduction(convertEntry(deductionDetails))
            if (totalDeduction === 0) {
                setErrorMsg('Enter at least one')
            }
            
            if (totalDeduction > 0) {
                setErrorMsg('')
                props.onDeduction(totalDeduction)
                setIsAdded(true)
            }
        } else {
            setErrorMsg('Enter Numeric values only')
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
                DEDUCTION UNDER 80C [ Max Limit Rs.{MAX_80_C_LIMIT} ] [YEARLY]</header>

            {errorMsg !== '' && <p className="error-msg">* {errorMsg}</p>}
            <Input label='Provident Fund' ref={pfAmount} errorMsg='' />
            <Input label='LIC' ref={licDeduction} />
            <Input label='Home Loan Principal Repay' ref={loanDeduction} />
            <Input label='Fxed Deposit / NSC / VPF / PPF / Other' ref={otherDeduction} />
 

            <AddRemoveDeduction isAdded={isAdded} onAdd={addDeduction} onRemove={removeDeduction} />
        </div>
    )
}

export default DeductionBy80C