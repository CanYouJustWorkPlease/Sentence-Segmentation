$(document).ready(function(){

    chrome.runtime.sendMessage({method: "getWhichSeparator"}, function(response) {
        const correctCheckbox = document.querySelector(`[id="${response.message || 'newLine'}"]`);
        correctCheckbox.checked = true;
    });


    $('[name="whichSeparator"]').change(function(){
        if ($(this).prop('checked')) {
            chrome.runtime.sendMessage({method: "setWhichSeparator", value: this.value}, function(response) {})
        }
    });
})