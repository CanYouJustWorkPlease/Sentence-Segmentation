'use strict';
var elem;
var doubleSpace;
$(document).ready(function() {
    doubleSpace = false;

    chrome.runtime.sendMessage({method: "getDoubleSpace"}, function(response) {
        if (response.message == "On"){
            console.log("border turned On");
            doubleSpace = true;
        }
        else{
            doubleSpace = false;
        }
    });
});

var segmentSection = function(){
    elem = "body";
    $(elem + " *").each(function(){
        var v = $(this).html();
        var regexForPeriod = /\.\s/g;       //regex to find period
        var regexForQuestion = /\?\s/g;     //regex to find question mark
        var lineBreak = doubleSpace?".&nbsp;&nbsp;":".<br/>";
        var questionBreak = "?<br/>";
        var separatorElem = doubleSpace?"":"<span class='segmentSeparator'></span>";
        v = v.replace(regexForPeriod, (lineBreak + separatorElem));        //replacing period with period and newline
        v = v.replace(regexForQuestion, (questionBreak + separatorElem));      //replacing questionmark with questionmark and newline
        $(this).html(v);        //adding replaced content back to the DOM element
    });
};


