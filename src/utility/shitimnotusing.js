//Client-side input validation. Prevent empty strings, etc, from even reaching server
//Should be moved server-side
function validateInput(input) {
    if(input===null) {
        console.log("input is null");
        return false;
    }

    if(input==='') {
        console.log("input is nothing");
        return false;
    }

    /*input = input.toString();
    if(containsSymbols(input)) {
        console.log("input contains symbols");
        return false;
    }*/

    return true;
}

//Strip HTML/XML/etc from any inputs
function stripHTML(input) {
    input = input.toString();
    return input.replace(/<[^>]*>/g, '');
}

//Check if string contains symbols. Symbols are not allowed in usernames
function containsSymbols(input) {
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input);
}

//Strip symbols from any inputs
function stripSymbols(input) {
    input = input.toString();
    return input.replace(/[^0-9a-z]/gi, '')
}