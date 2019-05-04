"use strict"

const load = () => {
console.log("load event detected!");
document.getElementById('InstructionText').innerHTML = "Enter an array and press 'Remove' button";

// set the on-click functions that are defined below
document.getElementById('arrayUpdateButton').onclick = arrayUpdateButtonOnclick;
document.getElementById('runRemoveButton').onclick = runRemoveButtonOnclick;
document.getElementById('runRemoveButton').disabled = true;
console.log("load completed");
} 

function arrayUpdateButtonOnclick() {
    var inputText = '';

    inputText = document.getElementById('arrayInputText').value;
    if (checkLegalArray(inputText)) {
        document.getElementById('InputArrayDiv').innerHTML = inputText;
        document.getElementById('runRemoveButton').disabled = false;
    } else {
        document.getElementById('InputArrayDiv').innerHTML = "not a legal array";
        document.getElementById('runRemoveButton').disabled = true;
    }
};

let validArray = [];
function checkLegalArray(inputString) {
    let retval = false, testJSON = false, testArray, e;
    if (inputString.length > 0) {
        if (inputString.charAt(0) == '[' && inputString.slice(-1) == ']') {testJSON = true;}
        else {
            inputString = '[' + inputString + ']';
            testJSON = true
        }
    }

    if (testJSON) {
        try {
            validArray = JSON.parse(inputString);
            retval = true;
        }
        catch (e) {
            console.log('checkLegalArray', 'JSON array parse error:', e.message);
        }
    }

    return retval;
}
function runRemoveButtonOnclick() {
    let inputArrayJSON;

    try {
        inputArrayJSON = JSON.stringify(validArray)

        console.log('input array JSON =', inputArrayJSON);
        postAjax('/RemoveDuplicates', inputArrayJSON, runRemoveCallback);
        //callAjax('/RemoveDuplicates', runRemoveCallback);
    }
    catch (e) {
        console.log('runRemoveButtonOnclick', 'JSON array error:', e.message);
    }
};

function runRemoveCallback(responseText) {
    console.log('Ajax callback');
    document.getElementById('ResultArrayDiv').innerHTML = responseText;
}

function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    console.log('enter callAjax');
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    console.log('request Ajax');
}

function postAjax(url, data, success) {
    console.log('enter postAjax');
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        console.log('inside statechange postAjax: ', xhr.readyState, xhr.status, xhr.responseText);
        //console.log('postAjax ' + xhr.readyState + ' ' + xhr.status);
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    console.log('before send postAjax');
    xhr.send(params);
    return xhr;
}

window.onload = load;



