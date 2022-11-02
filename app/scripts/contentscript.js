'use strict';
let elem;
let whichSeparator;
$(document).ready(function() {
    whichSeparator = 'newLine'; // default

    chrome.runtime.sendMessage({method: "getWhichSeparator"}, function(response) {
        whichSeparator = response.message || 'newLine';
    });
});

// Refactoring for space insertion.
function repeatSpace(n) {
    return "&nbsp;".repeat(n);
}

// Added the 2 new features: paragraphTwoNewLines and paragraphTwoNewLinesAndSeparator.
// Removed period for each line break and replaced multiple &nbsp; with
// repeatSpace() .
function generateLineBreak() {
    let lineBreak; 
    if (whichSeparator === 'newLine') {
        lineBreak = "<br/>";
    }   
    else if (whichSeparator === 'paragraphTwoNewLines') {
        lineBreak = "<br/><br/>";
    }
    else if (whichSeparator === 'paragraphTwoNewLinesAndSeparator') {
        lineBreak = "<br/>----------<br/>";
    }   
    else if (whichSeparator === '2spaces') {
        lineBreak = repeatSpace(2);
    }
    else if (whichSeparator === '3spaces') {
        lineBreak = repeatSpace(3);
    }
    else if (whichSeparator === '4spaces') {
        lineBreak = repeatSpace(4);
    }
    else if (whichSeparator === '5spaces') {
        lineBreak = repeatSpace(5);
    }
    return lineBreak;
}

const segmentSection = function(){
    elem = "body";
    $(elem + " *").each(function(){
        let v = $(this).html();
        const lineBreak = generateLineBreak();
        
        // Turned whichSeparator value to lower case so it can detect if it
        // is newLine, paragraphTwoNewLines or paragraphTwoNewLinesAndSeparator.
        const separatorElem = whichSeparator.toLowerCase().includes("line") ? 
                            "<span class='segmentSeparator'></span>" : "";
        // This code applies for the 2 new features that I added.
        if (whichSeparator === 'paragraphTwoNewLines' || whichSeparator === 'paragraphTwoNewLinesAndSeparator') {
            
            // Regex to find every third consecutive period, question mark or exclamation mark (in a random placement)
            // followed by a space or a newline character.
            //
            // Example for "Two new lines" over here:
            // https://regex101.com/r/TJPQH1/2
            const regexForSymbolsAdvanced = /((?:[\.\?\!][^\.\?\!]*){2})([\.\?\!])([\s\n<])/g;
            
            // Replacing every third consecutive period, question mark or exclamation mark (in a random placement)
            // followed by a space or newline character with the character to be replaced and newlines and/or 
            // separation line.
            // v = v.replace(regexForSymbolsAdvanced, ("$1" + '<span style="background-color: red">' + "$2" + '</span>' + lineBreak + separatorElem + "$3"));
            v = v.replace(regexForSymbolsAdvanced, ("$1" + "$2" + lineBreak + separatorElem + "$3"));
            
            // After enabling any of the two new features in the options, and clicking the icon for the second
            // time, you'll notice the paragraph shrunk. Clicking the icon over and over it will turn the paragraph
            // into a sentence, the same way "New line" feature does it.
            // Only the very first paragraph won't be affected by this behaviour of paragraph shrinking.
            
        // This code applies to your original features.
        } else {
            
            // Regex to find every period, question mark or exclamation mark followed
            // by a space character.
            const regexForSymbolsSimple = /([\.\?\!])([\s\n<])/g;
            
            // Replacing every period, question mark or exclamation mark followed by a space character
            // with the character to be replaced and space(or multiple spaces) or newline.
            // v = v.replace(regexForSymbolsSimple, ('<span style="background-color: red">' + "$1" + '</span>' + lineBreak + separatorElem + "$2")); 
            v = v.replace(regexForSymbolsSimple, ("$1" + lineBreak + separatorElem + "$2")); 
            
        }
        // Adding replaced content back to the DOM element.
        $(this).html(v);                
    });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.method === 'executeSegmentSection') {
        segmentSection();
    }
});