
const checkValidityAllField = (value) => value !== '' && !isNaN(value) && value.indexOf('e') < 0
const checkValidity = (value) => !isNaN(value) && value.indexOf('e') < 0

const validateEntryAllField = (details) => {
    for (const key in details) {
        if (!checkValidityAllField(details[key])) {
            return false;
        }
    }
    return true;
}
const validateEntry = (details) => {
    for (const key in details) {
        if (!checkValidity(details[key])) {
            return false;
        }
    }
    return true;
}

const modifyEntry = (value) => value === '' ? 0 : +value
const convertEntry = (details) => {
    for (const key in details) {
        details[key] = modifyEntry(details[key])
    }
    return details
}

const calculateTotalDeduction = (details,limit) => {
    let totalDeduction = 0
    for (const key in details) {
        totalDeduction += details[key]
    }
    if(!limit) return totalDeduction
    return totalDeduction > limit ? limit : totalDeduction
}

export {validateEntryAllField,validateEntry,convertEntry,calculateTotalDeduction}