//Function in charge of user-agent forgery before HTTP Request sending
var updateUA = function(details) {

	var userAgents = JSON.parse(localStorage["userAgents"]);

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

	//User-agents' list loading
	var xhr = new XMLHttpRequest();
	xhr.open("GET", chrome.extension.getURL("data/user_agents.json"), false);
	xhr.send(null);	

	if(xhr.status === 200){
		localStorage["userAgents"] = xhr.responseText;
	}
} 

//updateUA function launched after each HTTP header creation by the browser
chrome.webRequest.onBeforeSendHeaders.addListener(updateUA, filter, opt_extraInfoSpec);

//init function launched on install or update
chrome.runtime.onInstalled.addListener(init);
