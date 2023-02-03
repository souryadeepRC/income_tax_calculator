
import React, { useRef, useState } from "react";
import Input from "../Generic/Input/Input"
import AddRemoveDeduction from "./AddRemoveDeduction";

const DeductionByOther = (props) => {

    const mediclaimSelfDeduction = useRef();
    const mediclaimParentDeduction = useRef();
    const npsDeduction = useRef();
    const homeLoanDeduction = useRef();
    const homeLoanExtraDeduction = useRef();
    const ltaDeduction = useRef();
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
        return {
            mediclaimSelf: getMaxEntry(details.mediclaimSelf, 25000),
            mediclaimParent: getMaxEntry(details.mediclaimParent, 50000),
            nps: getMaxEntry(details.nps, 50000),
            homeLoan: getMaxEntry(details.homeLoan, 200000),
            homeLoanExtra: getMaxEntry(details.homeLoanExtra, 150000),
            ltaDeduction: getMaxEntry(details.ltaDeduction, 36000),
            other: getMaxEntry(details.other, 0),
        }
    }
    const calculateTotalDeduction = (details) => {
        let totalDeduction = 0
        for (const key in details) {
            totalDeduction += details[key]
        }
        return totalDeduction
    }

    const getMaxEntry = (value, limit) => {
        if (value === '') return 0
        const convertedValue = +value
        if (limit === 0) return convertedValue
        return convertedValue > limit ? limit : convertedValue
    }
    const collectEntry = () => {
        return {
            mediclaimSelf: mediclaimSelfDeduction.current.value,
            mediclaimParent: mediclaimParentDeduction.current.value,
            nps: npsDeduction.current.value,
            homeLoan: homeLoanDeduction.current.value,
            homeLoanExtra: homeLoanExtraDeduction.current.value,
            ltaDeduction: ltaDeduction.current.value,
            other: otherDeduction.current.value
        }
    }
 
    const addDeduction = () => {
        const deductionDetails = collectEntry()
        if(validateEntry(deductionDetails)){
            const totalDeduction = calculateTotalDeduction(convertEntry(deductionDetails))
            if (totalDeduction === 0) {
                setErrorMsg('Enter at least one')
            }
            if (totalDeduction > 0) {
                setErrorMsg('')
                props.onDeduction(totalDeduction)
                setIsAdded(true)
            }
        }else{
            setErrorMsg('Enter Numeric values only')
        }
    }

    const removeDeduction = () => {
        props.onDeduction(0)
        setIsAdded(false)
    }
    return (
        <div>
            <header>{isAdded && <span>&#9989;</span>}
                DEDUCTION UNDER OTHER SECTION [YEARLY]</header>
            {errorMsg !== '' && <p className="error-msg">* {errorMsg}</p>}


            <Input label='Medical premium for Self / Spouse / Children' ref={mediclaimSelfDeduction} errorMsg='limit 25,000' /> {/*25,000 */}
            <Input label='Medical premium for Parent' ref={mediclaimParentDeduction} errorMsg='limit 50,000' />{/**50,000 */}
            <Input label='NATIONAL PENSION SCHEME(80CCD(1B))' ref={npsDeduction} errorMsg='limit 50,000' />{/**50,000 */}
            <Input label='HOME LOAN INTEREST (Section 24(b))' ref={homeLoanDeduction} errorMsg='limit 2,00,000' /> {/*of Rs 2 lakh */}
            <Input label='HOME LOAN INTEREST (80EE/80EEA)' ref={homeLoanExtraDeduction} errorMsg='after 2lakh excemption limit 1,50,000' /> {/*up to Rs 1,50,000*/}
            <Input label='Leave Travel Concession' ref={ltaDeduction} errorMsg='limit 36,000' /> {/*36,000 */}
            <Input label='OTHER DEDUCTIONS' ref={otherDeduction} /> {/*of Rs 2 lakh */}


            <AddRemoveDeduction isAdded={isAdded} onAdd={addDeduction} onRemove={removeDeduction} />
             
        </div>
    )
}

export default DeductionByOther