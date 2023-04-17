
import React, { useRef, useState } from "react";
import { validateEntry, calculateTotalDeduction } from './DeductionLogic'
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

    const isIncluded = props.amount > 0 ? true : false
    const [errorMsg, setErrorMsg] = useState('')

    const getMaxEntry = (value, limit) => {
        if (value === '') return 0
        const convertedValue = +value
        if (limit === 0) return convertedValue
        return convertedValue > limit ? limit : convertedValue
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
    const clearEntry = () => {
        mediclaimSelfDeduction.current.value = ''
        mediclaimParentDeduction.current.value = ''
        npsDeduction.current.value = ''
        homeLoanDeduction.current.value = ''
        homeLoanExtraDeduction.current.value = ''
        ltaDeduction.current.value = ''
        otherDeduction.current.value = ''
    }
    const addDeduction = () => {
        const deductionDetails = {
            mediclaimSelf: mediclaimSelfDeduction.current.value,
            mediclaimParent: mediclaimParentDeduction.current.value,
            nps: npsDeduction.current.value,
            homeLoan: homeLoanDeduction.current.value,
            homeLoanExtra: homeLoanExtraDeduction.current.value,
            ltaDeduction: ltaDeduction.current.value,
            other: otherDeduction.current.value
        }
        if (validateEntry(deductionDetails)) {
            const totalDeduction = calculateTotalDeduction(convertEntry(deductionDetails))
            if (totalDeduction === 0) {
                setErrorMsg('Enter at least one')
            }
            if (totalDeduction > 0) {
                setErrorMsg('')
                props.onDeduction(totalDeduction)
                clearEntry()
            }
        } else {
            setErrorMsg('Enter Numeric values only')
        }
    }

    const removeDeduction = () => {
        props.onDeduction(0)
    }
    const loanValue = props.loanDetails && props.loanDetails.interestPaid>0 ? props.loanDetails.interestPaid : 0 ;
    
  const extraLoanValue = props.loanDetails && props.loanDetails.extraInterestPaid>0 ? props.loanDetails.extraInterestPaid : 0 ;
    return (
        <div>
            <header>{isIncluded && <span>&#9989;</span>}
                DEDUCTION UNDER OTHER SECTION [YEARLY]</header>
            {errorMsg !== '' && <p className="error-msg">* {errorMsg}</p>}

            <Input label='Medical premium for Self / Spouse / Children' ref={mediclaimSelfDeduction} errorMsg='limit 25,000' /> {/*25,000 */}
            <Input label='Medical premium for Parent' ref={mediclaimParentDeduction} errorMsg='limit 50,000' />{/**50,000 */}
            <Input label='NATIONAL PENSION SCHEME(80CCD(1B))' ref={npsDeduction} errorMsg='limit 50,000' />{/**50,000 */}
            <Input label='HOME LOAN INTEREST (Section 24(b))' ref={homeLoanDeduction} errorMsg='limit 2,00,000' value={loanValue}/> {/*of Rs 2 lakh */}
            <Input label='HOME LOAN INTEREST (80EE/80EEA)' ref={homeLoanExtraDeduction} errorMsg='after 2lakh excemption limit 1,50,000'  value={extraLoanValue}/> {/*up to Rs 1,50,000*/}
            <Input label='Leave Travel Concession' ref={ltaDeduction} errorMsg='limit 36,000' /> {/*36,000 */}
            <Input label='OTHER DEDUCTIONS' ref={otherDeduction} /> {/*of Rs 2 lakh */}

            <AddRemoveDeduction isAdded={isIncluded} onAdd={addDeduction} onRemove={removeDeduction} />

        </div>
    )
}

export default DeductionByOther