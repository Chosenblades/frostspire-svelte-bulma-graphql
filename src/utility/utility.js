//Put commas in numbers for readability. Example: totalExperience goes from 6969696969 to 6,969,696,969
export function formatNumber(num) {
    return num.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//Client-side check if input is empty
export function validateInput(input) {
    if(!input || input.length === 0) {
        return false;
    } else {
        return true;
    }
}