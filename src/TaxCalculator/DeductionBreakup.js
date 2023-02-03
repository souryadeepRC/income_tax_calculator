import './DeductionBreakup.css'
const DeductionBreakup = (props) => {
    const deductionDetails = props.deductionDetails 
    let deductions = []
    for (const key in deductionDetails) {
        if (deductionDetails[key] !== 0) {
            deductions.push({
                'Label': key,
                'Amount': deductionDetails[key]
            })
        }
    } 
    return (
        <div className="deduction-breakup">
            <header>Included Deduction for Old Tax Regime</header>
            <p className='deduction-info'></p>
            {
                deductions.map((item, index) => { 
                    return (<p key={index}>{item.Label} : {item.Amount}</p>)
                })
            }
        </div>
    )
}
export default DeductionBreakup