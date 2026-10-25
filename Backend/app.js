/// --- Lock Screen --- ///
const lockScreen = document.getElementById("lockScreen");``
const mainScreen = document.getElementById("mainScreen");``
const pwInput = document.getElementById("pwInput");``
const pwSubmit = document.getElementById("pwSubmit");``
const pwError = document.getElementById("pwError");``

function tryUnlock(){
    if ( pwInput.value === TEAM_PASSWORD ){
        sessionStorage.setItem("rt_unlocked", '1');
        lockScreen.style.display = "none";
        mainScreen.style.display = "block";
        initDB();
    } else {
        pwError.style.display = "block";
    }
    return 0;
}
pwSubmit.addEventListener("click", tryUnlock);
pwInput.addEventListener("keydown", (e) => { if (e.key == "Enter") tryUnlock(); })

if ( sessionStorage.getItem("rt_unlocked") == "1" ){
    mainScreen.style.display = "block";
} else {
    lockScreen.style.display = "block";
}

// --- Time Format --- //

function isValidTime(hhmm) {
    if ( !/^\d{4}$/.test(hhmm) ) return false;
    const hh = parseInt(hhmm.slice(0, 2), 10);
    const mm = parseInt(hhmm.slice(2, 4), 10);
    return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
}

function formatTimeDisplay(hhmm){
    return `${hhmm.slice(0, 2)}:${hhmm.slice(2,4)}`;
}


// function buildText(name, hhmm){
//     return `Today ${name} helped me out at ${hhmm}.`;
// }

function helpText(name1, name2, hhmm){
    return `Today ${name1} helped ${name2} out at ${hhmm}.`;
}

function assistText(name1, name2, hhmm){
    return `Homeless man assisted by ${name1} and ${name2} at ${hhmm}.`
}

function giveText(name1, name2, hhmm){
    return `${name1} with ${name2} gave candy to a kid at ${hhmm}.`
}

function escortText(name1, name2, hhmm){
    return `${name1} with ${name2} escorted the ambulance out at ${hhmm}.`
}

// --- Main Screen --- //
const nameInput1 = document.getElementById("nameInput1");
const nameInput2 = document.getElementById("nameInput2");
const actionInput = document.getElementById("action");
const timeInput = document.getElementById("timeInput");
const timeError = document.getElementById("timeError");
const outputText = document.getElementById("outputText");


// let currentDb = null;

function refreshOutput(){
    const name1 = nameInput1.value;
    const name2 = nameInput2.value;
    const action = actionInput.value;
    const t = timeInput.value;
    const timeOk = isValidTime(t);
    timeError.style.display = (t.length > 0 && !timeOk ) ? "block" : "none";

    if (name1 && name2 && t){
        switch (action) {
            case "help":
                outputText.textContent = helpText(name1, name1, formatTimeDisplay(t));
                break;
            case "assist":
                outputText.textContent = assistText(name1, name2, formatTimeDisplay(t));
                break;
            case "give":
                outputText.textContent = giveText(name1, name2, formatTimeDisplay(t));
                break;
            case "escort":
                outputText.textContent = escortText(name1, name2, formatTimeDisplay(t))
                break;
            default:
                return 0;
        }
    } else {
        outputText.textContent = '--';
    }
}

nameInput1.addEventListener("input", refreshOutput);
nameInput2.addEventListener("input", refreshOutput);
actionInput.addEventListener("input", refreshOutput);
timeInput.addEventListener("input", refreshOutput);
refreshOutput();