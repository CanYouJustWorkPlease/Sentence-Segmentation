chrome.runtime.onInstalled.addListener(function() {
    console.log("Installed");
    chrome.storage.local.get('whichSeparator', resp => {
        // only if nothing's in storage set this separator
        if (Object.keys(resp).length === 0) {
            chrome.storage.local.set({'whichSeparator': 'newLine'});
        }
    });

});

// var whichSeparator = "";

// var getWhichSeparator = function(){
//     chrome.storage.local.get(null, function(resp){
//         console.log(resp.whichSeparator);
//         whichSeparator = resp.whichSeparator;
//     });
// };

// setTimeout(function(){
//     getWhichSeparator();
// },500);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "setWhichSeparator") {
            chrome.storage.local.set({'whichSeparator': request.value});
            sendResponse({message: "whichSeparator changed to:" + request.value});
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
            });
            // getWhichSeparator();
        }
        else if (request.method == "getWhichSeparator"){
            chrome.storage.local.get('whichSeparator', resp => {
                sendResponse({message: resp.whichSeparator});
            });
            return true;
        }
    });

chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {method: 'executeSegmentSection'});
});