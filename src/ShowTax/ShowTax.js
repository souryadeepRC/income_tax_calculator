import { calculateTax } from '../TaxCalculation/TaxCalculation'
import ShowTaxBreakup from './ShowTaxBreakup';

const ShowTax = ({ income, deductionDetail }) => {
    const taxBreakup = calculateTax(income, deductionDetail)
    const difference = (taxBreakup.newScheme.monthlyTax - taxBreakup.oldScheme.monthlyTax).toFixed(2)
    console.log(difference);
    return (<div>
        <ShowTaxBreakup label='New Tax Regime' data={taxBreakup.newScheme} />
        <ShowTaxBreakup label='Old Tax Regime' data={taxBreakup.oldScheme} />
        <p style={{margin:0 ,padding: '5px 0',background: '#e3e3e3',textAlign: 'center',border: '2px solid darkgrey'}}>
        
        {difference < 0 && <span>You will save monthly <strong>Rs.{difference * -1}</strong> by Choosing New Tax Regime </span>}
        {difference > 0 && <span>You will save monthly <strong>Rs.{difference}</strong> by Choosing Old Tax Regime </span>}
        {difference === '0.00' && <span>Both Tax Regime will produce same tax amount</span>}
        </p>
    </div>)
}
export default ShowTax