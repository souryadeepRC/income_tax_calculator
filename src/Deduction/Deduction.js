import { useState } from "react";
import "./Deduction.css";
import DeductionBy80C from "./DeductionBy80C";
import DeductionByOther from "./DeductionByOther";
import DeductionByRent from "./DeductionByRent";
import HomeLoan from "./HomeLoan";

const OLD_SCHEME_MAX_LIMIT = 500000;
const BY_80C = "Deduction By 80C";
const BY_RENT = "Rent Excemption";
const BY_OTHER = "Deduction By Other";
const IncludeDeduction = (props) => {
  const [loanDetails, setLoanDetails] = useState(undefined);
  const collect80CDeduction = (amount) =>
    props.onDeductionAdded({ "Deduction By 80C": amount });
  const collectRentDeduction = (amount) =>
    props.onDeductionAdded({ "Rent Excemption": amount });
  const collectOtherDeduction = (amount) =>
    props.onDeductionAdded({ "Deduction By Other": amount });
  const collectLoanDeduction = (details) => setLoanDetails(details);

  return (
    <section className="deduction-section">
      <HomeLoan onDeduction={collectLoanDeduction} />
      <DeductionByRent
        amount={props.deductionDetail[BY_RENT]}
        onDeduction={collectRentDeduction}
      />
      <DeductionBy80C
        amount={props.deductionDetail[BY_80C]}
        loanDetails={loanDetails}
        onDeduction={collect80CDeduction}
      />
      <DeductionByOther
        amount={props.deductionDetail[BY_OTHER]}
        loanDetails={loanDetails}
        onDeduction={collectOtherDeduction}
      />
    </section>
  );
};
const ZeroDeduction = () => {
  return (
    <section>
      <p className="empty-tax-msg">
        Deduction is not required. You don't have to pay Income Tax
      </p>
    </section>
  );
};

const Deduction = (props) => {
  return (
    <>
      {props.income <= OLD_SCHEME_MAX_LIMIT && <ZeroDeduction />}
      {props.income > OLD_SCHEME_MAX_LIMIT && (
        <IncludeDeduction
          deductionDetail={props.deductionDetail}
          onDeductionAdded={props.onDeductionAdded}
        />
      )}
    </>
  );
};
export default Deduction;
