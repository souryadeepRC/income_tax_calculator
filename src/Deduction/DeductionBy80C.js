import React, { useRef, useState } from "react";
// components
import {
  validateEntry,
  convertEntry,
  calculateTotalDeduction,
} from "./DeductionLogic";
import Input from "../Generic/Input/Input";
import AddRemoveDeduction from "./AddRemoveDeduction";

const MAX_80_C_LIMIT = 150000;
const DeductionBy80C = (props) => {
  const pfAmount = useRef();
  const licDeduction = useRef();
  const loanDeduction = useRef();
  const otherDeduction = useRef();

  const isIncluded = props.amount > 0 ? true : false;

  const [errorMsg, setErrorMsg] = useState("");

  /* const calculateTotalDeduction = (details) => {
        let totalDeduction = 0
        for (const key in details) {
            totalDeduction += details[key]
        }
        return totalDeduction > MAX_80_C_LIMIT ? MAX_80_C_LIMIT : totalDeduction
    }  */
 
  const clearEntry = () => {
    pfAmount.current.value = "";
    licDeduction.current.value = "";
    loanDeduction.current.value = "";
    otherDeduction.current.value = "";
  };

  const addDeduction = () => {
    const deductionDetails = {
      pf: pfAmount.current.value,
      lic: licDeduction.current.value,
      homeLoan: loanDeduction.current.value,
      other: otherDeduction.current.value,
    };
    if (validateEntry(deductionDetails)) {
      const totalDeduction = calculateTotalDeduction(
        convertEntry(deductionDetails),
        MAX_80_C_LIMIT
      );
      if (totalDeduction === 0) {
        setErrorMsg("Enter at least one");
      }

      if (totalDeduction > 0) {
        setErrorMsg("");
        props.onDeduction(totalDeduction);
        clearEntry();
      }
    } else {
      setErrorMsg("Enter Numeric values only");
    }
  };

  const removeDeduction = () => {
    props.onDeduction(0);
  };
 
  const loanValue = props.loanDetails && props.loanDetails.principalPaid>0 ? props.loanDetails.principalPaid : 0 ;
  return (
    <div>
      <header>
        {isIncluded && <span>&#9989;</span>}
        DEDUCTION UNDER 80C [ Max Limit Rs.{MAX_80_C_LIMIT} ] [YEARLY]
      </header>

      {errorMsg !== "" && <p className="error-msg">* {errorMsg}</p>}
      <Input label="Provident Fund" ref={pfAmount} errorMsg="" />
      <Input label="LIC" ref={licDeduction} />
      <Input label="Home Loan Principal Repay" ref={loanDeduction} value={loanValue}/>
      <Input
        label="Fxed Deposit / NSC / VPF / PPF / Other"
        ref={otherDeduction}
      />

      <AddRemoveDeduction
        isAdded={isIncluded}
        onAdd={addDeduction}
        onRemove={removeDeduction}
      />
    </div>
  );
};

export default DeductionBy80C;
