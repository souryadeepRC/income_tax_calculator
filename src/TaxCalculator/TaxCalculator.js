import React, { useState } from "react"

import DeductionBreakup from "./DeductionBreakup";
import ShowTax from "../ShowTax/ShowTax";

import './TaxCalculator.css'
import Deduction from "../Deduction/Deduction";

const deductionDetails = {
    'Standard Deduction': 50000,
    'Professional Tax': 2400,
    'Rent Excemption': 0,
    'Deduction By 80C': 0,
    'Deduction By Other': 0
}

const Income = () => {

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
            <section>
                <div className="income-section">
                    <label>Gross Total Income :&nbsp;</label>
                    {income !== '' && !isValidData &&
                        <h6>Enter only Numeric values in Gross Amount</h6>}
                    <input type="text" value={income}
                        onChange={changeInputHandler} placeholder="Enter Gross Income" />
                </div>
                {isValidData && <DeductionBreakup deductionDetails={deductionDetail} />}
                {isValidData && <ShowTax income={income} deductionDetail={deductionDetail} />}

            </section>
            {isValidData &&
                <Deduction
                    income={+income}
                    deductionDetail={deductionDetail}
                    onDeductionAdded={collectDeduction} />
            }

        </div>
    )
}
export default Income