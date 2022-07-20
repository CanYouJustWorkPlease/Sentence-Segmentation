'use strict';
var elem;
var whichSeparator;
$(document).ready(function() {
    whichSeparator = 'newLine'; // default

    chrome.runtime.sendMessage({method: "getWhichSeparator"}, function(response) {
        whichSeparator = response.message || 'newLine';
    });
});

function generateLineBreak() {
    let lineBreak; 
    if (whichSeparator === 'newLine') {
        lineBreak = ".<br/>";
    }
    else if (whichSeparator === '2spaces') {
        lineBreak = ".&nbsp;&nbsp;";
    }
    else if (whichSeparator === '3spaces') {
        lineBreak = ".&nbsp;&nbsp;&nbsp;";
    }
    else if (whichSeparator === '4spaces') {
        lineBreak = ".&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else if (whichSeparator === '5spaces') {
        lineBreak = ".&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    return lineBreak;
}

var segmentSection = function(){
    elem = "body";
    $(elem + " *").each(function(){
        var v = $(this).html();
        var regexForPeriod = /\.\s/g;       //regex to find period
        var regexForQuestion = /\?\s/g;     //regex to find question mark
        const lineBreak = generateLineBreak();
        var questionBreak = "?" + lineBreak.slice(1);
        var separatorElem =  whichSeparator === 'newLine' ? "<span class='segmentSeparator'></span>" : "";
        v = v.replace(regexForPeriod, (lineBreak + separatorElem));        //replacing period with period and newline
        v = v.replace(regexForQuestion, (questionBreak + separatorElem));      //replacing questionmark with questionmark and newline
        $(this).html(v);        //adding replaced content back to the DOM element
    });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'executeSegmentSection') {
        segmentSection();
    }
});