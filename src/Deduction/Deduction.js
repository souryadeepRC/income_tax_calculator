 
import './Deduction.css';
import DeductionBy80C from './DeductionBy80C';
import DeductionByOther from './DeductionByOther';
import DeductionByRent from './DeductionByRent';


const Deduction = (props) => {

    const collect80CDeduction = (amount) => props.onDeductionAdded({ 'Deduction By 80C': amount })
    const collectRentDeduction = (amount) => props.onDeductionAdded({ 'Rent Excemption': amount })
    const collectOtherDeduction = (amount) => props.onDeductionAdded({ 'Deduction By Other': amount })


    return (<div className='deduction-section'>
        <DeductionByRent onDeduction={collectRentDeduction} />
        <DeductionBy80C onDeduction={collect80CDeduction} />
        <DeductionByOther onDeduction={collectOtherDeduction} />

    </div>)
}
export default Deduction