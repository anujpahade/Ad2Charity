'use strict';

/*ON INSTALL BASIC*/

chrome.runtime.onInstalled.addListener(function() {
	// Runs when the extension is installed..
  chrome.storage.sync.set({color: '#3aa757'}, function() {
  	// the 'color' value in 'storage' is now accessible to other components 
    console.log("The color is green.");
  });

/*VALIDATE URL*/
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'book'}, //IMPORTANT
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
});

/*
* Send a message to content that the icon was clicked.
* The content file now should manipulate the DOM of the current page.
*/
chrome.pageAction.onClicked.addListener(function(tab) {  	
});
