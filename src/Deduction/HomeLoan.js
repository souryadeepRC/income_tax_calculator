import { useRef, useState } from "react";
import Input from "../Generic/Input/Input";
import AddRemoveDeduction from "./AddRemoveDeduction";

const calculateEMI = (principal, rate, tenure) => {
  const tenureInMonth = tenure * 12;
  const monthlyRate = rate / (12 * 100);
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonth)) /
      (Math.pow(1 + monthlyRate, tenureInMonth) - 1)
  );
};
const MONTH_ARRAY = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getLoanPeriod = (period) => {
    const index = MONTH_ARRAY.indexOf(period.Month)
    if (index === 11) {
        return {
            'Month': MONTH_ARRAY[0],
            'Year': period.Year + 1
        }
    } else {
        return {
            'Month': MONTH_ARRAY[index + 1],
            'Year': period.Year
        }
    }
}

const getNextPrePaymentAmount = (amount, percentage) => amount * (100 + percentage) / 100

const getPrePaymentInfo = (info, month) => {
    if (month !== MONTH_ARRAY[2]) info.Is_PrePayment = false

    if (month === MONTH_ARRAY[2]) {
        info.Is_PrePayment = true

        if (info.Is_First_PrePayment) {
            info.Amount = info.Next_PrePayment
            info.Is_First_PrePayment = false
            info.Next_PrePayment = getNextPrePaymentAmount(info.Amount, info.Increase_Percentage)
        } else {
            info.Amount = info.Next_PrePayment
            info.Next_PrePayment = getNextPrePaymentAmount(info.Amount, info.Increase_Percentage)
        }
    }
    return info
}

const calculateMonthlyDetails = (info, rate, prePaymentInfo) => {
  const period = getLoanPeriod({ Month: info.Month, Year: info.Year });
  const monthlyRate = rate / (12 * 100);
  const interestPaid = info.Next_Principal_Remaining * monthlyRate;
  const principalPaid = info.Emi - interestPaid;
  let principalRemaining = info.Next_Principal_Remaining - principalPaid;

  if (prePaymentInfo.Is_PrePayment) {
    principalRemaining = principalRemaining - prePaymentInfo.Amount;
  }
  return {
    Principal_Paid: Number(principalPaid.toFixed(2)),
    Interest_Paid: Number(interestPaid.toFixed(2)),
    Next_Principal_Remaining: Number(principalRemaining.toFixed(2)),
    Monthly_Saving: Number((prePaymentInfo.Next_PrePayment / 12).toFixed(2)),
    PrePayment: prePaymentInfo.Is_PrePayment ? prePaymentInfo.Amount : 0,
    Month: period.Month,
    Year: period.Year,
    Emi: info.Emi,
  };
};
const HomeLoan = (props) => {
  const loanAmount = useRef();
  const tenure = useRef();
  const rate = useRef();
  const startPeriod = useRef();

  const collectInput = () => {
    const period = startPeriod.current.value.split("-");
    return {
      Principal: +loanAmount.current.value,
      Rate: +rate.current.value,
      Tenure: +tenure.current.value,
      Year: +period[0],
      Month: MONTH_ARRAY[period[1] - 1],
      Pre_Payment_Amount: 0,
      Pre_Payment_Increase: 0,
    };
  };

  const calculateDeduction = () => {
 

    const inputDetails = collectInput();

    const emi = calculateEMI(
      inputDetails.Principal,
      inputDetails.Rate,
      inputDetails.Tenure
    );

    let result = [];

    const prePaymentAmount = inputDetails.Pre_Payment_Amount;
    const prePaymentIncrease = inputDetails.Pre_Payment_Increase;

    let prePaymentInfo = {
      Amount: 0,
      Next_PrePayment: prePaymentAmount,
      Increase_Percentage: prePaymentIncrease,
      Previous_Amount: 0,
      Is_First_PrePayment: true,
      Is_PrePayment: false,
    };
    let monthlyInfo = {
      Next_Principal_Remaining: inputDetails.Principal,
      Emi: emi,
      Month: inputDetails.Month,
      Year: inputDetails.Year,
    };
    for (; true; ) {
      monthlyInfo = calculateMonthlyDetails(
        monthlyInfo,
        inputDetails.Rate,
        prePaymentInfo
      );

      if (monthlyInfo.Next_Principal_Remaining > 0) {
        result.push(monthlyInfo);
      } else {
        break;
      }
      prePaymentInfo = getPrePaymentInfo(prePaymentInfo, monthlyInfo.Month);
    }
    return result;
  };
  const addDeduction = () => {
    const totalDeduction = calculateDeduction(); 
    
    let totalPrincipalPaid = 0 ,totalInterestPaid = 0;
 
    for (let index = 0; index < totalDeduction.length; index++) {
   
        totalInterestPaid += totalDeduction[index].Interest_Paid;
        totalPrincipalPaid += totalDeduction[index].Principal_Paid;
        if(totalDeduction[index].Month ==="March"){
            break;
        }
    }
    const extraInterest = totalInterestPaid - 200000
    props.onDeduction({
        principalPaid : totalPrincipalPaid,
        interestPaid : totalInterestPaid >= 200000 ? 200000 : totalInterestPaid,
        extraInterestPaid : extraInterest>=150000 ? 150000 : extraInterest
    })

  };
  const removeDeduction = () => {
    props.onDeduction(0);
  };
  
  const [errorMsg] = useState('')
  const isIncluded = false

  return (
    <div>
      {errorMsg !== "" && <p className="error-msg">* {errorMsg}</p>}
      <Input label="Loan Amount" ref={loanAmount} />
      <Input label="Tenure" ref={tenure} />
      <Input label="Rate" ref={rate} />
      <Input label="Start Period" type="month" ref={startPeriod} />

      <AddRemoveDeduction
        isAdded={isIncluded}
        onAdd={addDeduction}
        onRemove={removeDeduction}
      />
    </div>
  );
};
export default HomeLoan;
