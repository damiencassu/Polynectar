//Turn On/Off the extension (user-agents forgery)
var onOff = function(){
	
	if(localStorage["state"] === "ON"){
		document.getElementById("onoff").className = "btn btn-success btn-block";
		document.getElementById("onoff").innerHTML = '<span class="fa fa-power-off"></span></span> TURN ON';
		localStorage["state"] = "OFF";
	}else{
		document.getElementById("onoff").className = "btn btn-danger btn-block";
		document.getElementById("onoff").innerHTML = '<span class="fa fa-power-off"></span></span> TURN OFF';
		localStorage["state"] = "ON";
	}
	
};

//Display extension settings in the popup window
var init = function(){

	var os = localStorage["os"];
	var browser = localStorage["browser"];

	if(browser === "Chrome"){
		document.getElementById("browser").className = "fa fa-chrome";
	}else if(browser === "Firefox"){
		document.getElementById("browser").className = "fa fa-firefox";
	}else if(browser === "Opera"){
		document.getElementById("browser").className = "fa fa-opera";
	}

	if(os === "Windows"){
		document.getElementById("os").className = "fa fa-windows";
	}else if(os === "Linux"){
		document.getElementById("os").className = "fa fa-linux";
	}else if(os === "MacOS"){
		document.getElementById("os").className = "fa fa-apple";
	}	


	if(localStorage["state"] === "ON"){
		document.getElementById("onoff").className = "btn btn-danger btn-block";
		document.getElementById("onoff").innerHTML = '<span class="fa fa-power-off"></span></span> TURN OFF';
	}else{
		document.getElementById("onoff").className = "btn btn-success btn-block";
		document.getElementById("onoff").innerHTML = '<span class="fa fa-power-off"></span></span> TURN ON';
	}
};

//Goto options page
var showOptions = function(){

	chrome.tabs.create({url: "html/options.html"});
} 


document.getElementById("onoff").addEventListener("click", onOff);
document.getElementById("options").addEventListener("click", showOptions);
window.onload = init;
