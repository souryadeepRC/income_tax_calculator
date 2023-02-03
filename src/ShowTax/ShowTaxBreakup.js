import './ShowTaxBreakup.css'
const ShowTaxBreakup = ({label,data}) => { 
    
    return (
        <div className='tax-breakup'>
            <header>{label}</header>
            <p>Taxable Income : <strong>Rs.{(data.taxableAmount).toFixed(2)}</strong></p>
            <p>Income Tax : <strong>Rs.{(data.totalTax).toFixed(2)}</strong></p>
            <p>Health and Education Cess : <strong>Rs.{(data.cessAmount).toFixed(2)}</strong></p>
            <p>Total Tax Liability : <strong>Rs.{(data.yearlyTax).toFixed(2)}</strong>&nbsp;
                 (Monthly : <strong>Rs.{(data.monthlyTax).toFixed(2)}</strong>)</p>
        </div>
    )
}
export default ShowTaxBreakup