//Registered user-agents
var userAgents = new Array();
userAgents["Linux_Chrome"]="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
userAgents["Windows_Chrome"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
userAgents["MacOS_Chrome"]="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
userAgents["Linux_Firefox"]="Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:51.0) Gecko/20100101 Firefox/51.0";
userAgents["Windows_Firefox"]="Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0";
userAgents["MacOS_Firefox"]="Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0";
userAgents["Linux_Opera"]="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.991";
userAgents["Windows_Opera"]="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.991";
userAgents["MacOS_Opera"]="Mozilla/5.0 (Macintosh; Intel Mac OS X 10.18.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.991"; 

//Function in charge of user-agent forgery before HTTP Request sending
var updateUA = function(details) {

	if(localStorage["state"] === "ON"){
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			if (details.requestHeaders[i].name === 'User-Agent') {
				details.requestHeaders[i].value = userAgents[localStorage["os"]+"_"+localStorage["browser"]];              
				break;
			}
		}
	}
	return {requestHeaders: details.requestHeaders};
};

//user-agent forgery activated for all URLs
var filter = {urls: ["<all_urls>"]};

//HTTP request blocked until callback function returns
var opt_extraInfoSpec = ["blocking", "requestHeaders"];

//Extension's initialization
var init = function(details){

	if(!localStorage["state"]){
		localStorage["state"] = "ON";
	}
	
	if(!localStorage["browser"]){
		localStorage["browser"] = "Chrome";
	}

	if(!localStorage["os"]){
		localStorage["os"] = "Windows";
	}	
} 

//updateUA function launched after each HTTP header creation by the browser
chrome.webRequest.onBeforeSendHeaders.addListener(updateUA, filter, opt_extraInfoSpec);

//init function launched on install or update
chrome.runtime.onInstalled.addListener(init);
