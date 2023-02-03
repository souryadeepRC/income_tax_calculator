import React, { useState } from "react"
import Deduction from "../Deduction/Deduction";

import DeductionBreakup from "./DeductionBreakup";
import './Income.css'
import ShowTax from "../ShowTax/ShowTax";
const deductionDetails = {
    'Standard Deduction': 50000,
    'Professional Tax': 2400,
    'Rent Excemption': 0,
    'Deduction By 80C': 0,
    'Deduction By Other': 0
}
const OLD_SCHEME_MAX_LIMIT = 500000
const Income = (props) => {
    console.log('----Income Rendered----');

    const [deductionDetail, setDeductionDetail] = useState(deductionDetails)
  
    const [income, setIncome] = useState('')
 
    const isValidData = income !== '' && !isNaN(income) && income.indexOf('e') < 0

    const changeInputHandler = (e) => {
        setIncome(e.target.value)
    }
    const collectDeduction = (info) => {
        setDeductionDetail(details => {
            const modifiedDetails = Object.assign(details, info)
            return { ...modifiedDetails }
        })
    }
    return (
        <div className="container">

            <div>
                <div className="income-section">
                    <label>Gross Total Income :&nbsp;</label>
                    {income !== '' && !isValidData && <h6>Enter only Numeric values in Gross Amount</h6>}
                    <input type="text" value={income} onChange={changeInputHandler} placeholder="Enter Gross Income"/>
                </div>
                {isValidData && <DeductionBreakup deductionDetails={deductionDetail} />}
                {isValidData && <ShowTax income={income} deductionDetail={deductionDetail} />}

            </div>
            {isValidData && +income <= OLD_SCHEME_MAX_LIMIT &&
                <div><p className="empty-tax-msg">Deduction is Not Dequired. You don't have to pay Income Tax</p>
                </div>}

            {isValidData && +income > OLD_SCHEME_MAX_LIMIT &&
                <Deduction onDeductionAdded={collectDeduction} />}
        </div>
    )
}
export default Income