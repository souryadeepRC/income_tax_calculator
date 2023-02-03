import { calculateTax } from '../TaxCalculation/TaxCalculation'
import ShowTaxBreakup from './ShowTaxBreakup';

const ShowTax = ({ income, deductionDetail }) => {
    const taxBreakup = calculateTax(income, deductionDetail)
     
    return (<div>
        <ShowTaxBreakup label='New Tax Regime' data={taxBreakup.newScheme} />
        <ShowTaxBreakup label='Old Tax Regime' data={taxBreakup.oldScheme} />

        <p style={{margin:0 ,padding: '5px 0',background: '#e3e3e3',textAlign: 'center',border: '2px solid darkgrey'}}>
        
        {taxBreakup.Difference.amount === '0.00' && <span>Both Tax Regime will produce same tax amount</span>}
        {taxBreakup.Difference.amount !== '0.00' && 
            <span>You will save monthly 
                <strong> Rs.{taxBreakup.Difference.amount} </strong> 
                by Choosing {taxBreakup.Difference.type} Tax Regime 
            </span>}
        </p>
    </div>)
}
export default ShowTax