import React, { useRef, useState } from "react";
// components
import { validateEntryAllField, convertEntry } from "./DeductionLogic";
import Input from "../Generic/Input/Input";
import AddRemoveDeduction from "./AddRemoveDeduction";

const METRO_CITY_LIMIT = 0.5;
const NON_METRO_CITY_LIMIT = 0.4;
const DeductionByRent = (props) => {
  const basicAmount = useRef();
  const hraAmount = useRef();
  const rentAmount = useRef();
  const rentCity = useRef();
  const rentDuration = useRef();

  const [errorMsg, setErrorMsg] = useState('')
  const isIncluded = props.amount > 0 ? true : false

  const calculateTotalDeduction = (details) => {
    const ruleByRent = details.rent - details.basic * 0.1;
    const ruleByBasic =
      details.basic *
      (rentCity.current.checked ? METRO_CITY_LIMIT : NON_METRO_CITY_LIMIT);

    const excemptedRent =
      Math.min(details.hra, ruleByRent, ruleByBasic) * details.duration;
    return excemptedRent;
  };

  const clearEntry = () => {
    basicAmount.current.value = "";
    hraAmount.current.value = "";
    rentAmount.current.value = "";
    rentDuration.current.value = "";
  };
  const calculateDeduction = () => {
    const deductionDetails = {
      basic: basicAmount.current.value,
      hra: hraAmount.current.value,
      rent: rentAmount.current.value,
      duration: rentDuration.current.value,
    };
    if (validateEntryAllField(deductionDetails)) {
      return calculateTotalDeduction(convertEntry(deductionDetails));
    } else {
      return 0;
    }
  };
  const addDeduction = () => {
    const totalDeduction = calculateDeduction();

    if (totalDeduction < 0) {
      setErrorMsg("Rent Amount too low");
    }
    if (totalDeduction === 0) {
      setErrorMsg("Fill all fields and Enter Numeric values only");
    }
    if (totalDeduction > 0) {
      setErrorMsg("");
      props.onDeduction(totalDeduction);
      clearEntry();
    }
  };
  const removeDeduction = () => {
    props.onDeduction(0);
  };
  return (
    <div>
      <header>
        {isIncluded && <span>&#9989;</span>}
        DEDUCTION UNDER Rent [ All amount should be monthly ]
      </header>
      {errorMsg !== "" && <p className="error-msg">* {errorMsg}</p>}
      <Input label="BASIC" ref={basicAmount} />
      <Input label="HRA" ref={hraAmount} />
      <Input label="Rent Amount" ref={rentAmount} />
      <Input label="Rent Duration (in Month)" ref={rentDuration} />

      <Input label="Metro City" type="checkbox" ref={rentCity} />

      <AddRemoveDeduction
        isAdded={isIncluded}
        onAdd={addDeduction}
        onRemove={removeDeduction}
      />
    </div>
  );
};

export default DeductionByRent;
