const IS_NEW_SCHEME = true
const calculateByNewTaxSlab = (taxableAmount) => {

    const TAX_SLAB_AMOUNT = 300000
    /* ------- The income tax rebate limit : 7 Lakh ----*/
    if (taxableAmount <= 700000) {
        return 0
    }
    /* -------  Up to Rs.3 lakh - 0% ------- 
     ------- Rs.3 lakh to Rs.6 lakh - 5% ----*/
    let taxAmount = TAX_SLAB_AMOUNT * 0.05

    /* ------- Rs.6 lakh to Rs.9 lakh - 10% ----*/
    if (taxableAmount > 600000 && taxableAmount <= 900000) {
        return taxAmount + ((taxableAmount - 600000) * 0.10)
    } else {
        taxAmount += TAX_SLAB_AMOUNT * 0.10
    }

    /* ------- Rs.9 lakh to Rs.12 lakh - 15% ----*/
    if (taxableAmount > 900000 && taxableAmount <= 1200000) {
        return taxAmount + ((taxableAmount - 900000) * 0.15)
    } else {
        taxAmount += TAX_SLAB_AMOUNT * 0.15
    }

    /* ------- Rs.12 lakh to Rs.15 lakh - 20% ----*/
    if (taxableAmount > 1200000 && taxableAmount <= 1500000) {
        return taxAmount + ((taxableAmount - 1200000) * 0.20)
    } else {
        taxAmount += TAX_SLAB_AMOUNT * 0.20
    }

    /* ------- Above Rs.15 lakh - 30% ----*/
    return taxAmount + ((taxableAmount - 1500000) * 0.30)

}

const calculateByOldTaxSlab = (taxableAmount) => {

    /* ------- The income tax rebate limit : 5 Lakh ----*/
    if (taxableAmount <= 500000) {
        return 0;
    }
    /* --- Up to Rs.2.5Lakh  - 0% ---
     --- Rs.2.5Lakh to Rs.5Lakh  -  5% -- */
    let taxAmount = 250000 * 0.05

    /* --- Rs.5Lakh to Rs.10Lakh -  5% -- */
    if (taxableAmount > 500000 && taxableAmount <= 1000000) {
        return taxAmount + ((taxableAmount - 500000) * 0.20)
    } else {
        taxAmount += 500000 * 0.20
    }

    /* ------- Above Rs.10 lakh - 30% ----*/
    return taxAmount + ((taxableAmount - 1000000) * 0.30);

}
const calculateCess = (incomeTax) => incomeTax * 0.04

const calculateIncomeTax = (taxableAmount, type) => {
    let totalTax = 0
    if (type) {
        totalTax = calculateByNewTaxSlab(taxableAmount)
    } else {
        totalTax = calculateByOldTaxSlab(taxableAmount)
    }
    const cessAmount = calculateCess(totalTax)
    const yearlyTax = totalTax + cessAmount
    const monthlyTax = yearlyTax / 12
    return {
        taxableAmount,
        totalTax,
        cessAmount,
        yearlyTax,
        monthlyTax
    }
}

const calculateTax = (taxableAmount, deductionDetail) => {
     
    let deductedAmount = 0
    for (const key in deductionDetail) {
        deductedAmount += deductionDetail[key]
    }
    const newSchemeTaxableIncome = +taxableAmount - deductionDetail['Standard Deduction']
    let taxBreakup =  {
        newScheme: calculateIncomeTax(newSchemeTaxableIncome, IS_NEW_SCHEME),
        oldScheme: calculateIncomeTax(taxableAmount - deductedAmount, !IS_NEW_SCHEME)
    }
    const difference = (taxBreakup.newScheme.monthlyTax - taxBreakup.oldScheme.monthlyTax).toFixed(2)
    taxBreakup['Difference'] = {
        amount : difference < 0  ? difference * - 1 : difference,
        type : difference < 0  ? 'New' : 'Old'
    }
    return taxBreakup
}

export { calculateTax }