

chrome.runtime.onInstalled.addListener(function() {
    console.log("Installed");
    chrome.storage.local.set({'doubleSpace': "Off"});

});

var doubleSpace = "";

var getDoubleSpace = function(){
    chrome.storage.local.get(null, function(resp){
        console.log(resp.doubleSpace);
        doubleSpace = resp.doubleSpace;
    });
};

setTimeout(function(){
    getDoubleSpace();
},500);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "doubleSpace") {
            if (request.value == true){
                chrome.storage.local.set({'doubleSpace': "On"});
                sendResponse({message: "doubleSpace turned On"});
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                });
                getDoubleSpace();
            }
            else{
                chrome.storage.local.set({'doubleSpace': "Off"});
                sendResponse({message: "doubleSpace turned Off"});
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                });
                getDoubleSpace();
            }
        }
        else if (request.method == "getDoubleSpace"){
            sendResponse({message: doubleSpace});
        }
    });

    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.executeScript(null, {
            code: "segmentSection('body');"
        });
    });