//Update icons accordingly with selected options
var changeLogo = function(e){

	if(e.target.value === "Chrome"){
		document.getElementById("logoBrowser").className = "fa fa-chrome";
	}else if(e.target.value === "Firefox"){
		document.getElementById("logoBrowser").className = "fa fa-firefox";
	}else if(e.target.value === "Opera"){
		document.getElementById("logoBrowser").className = "fa fa-opera";
	}else if(e.target.value === "Windows"){
		document.getElementById("logoOS").className = "fa fa-windows";
	}else if(e.target.value === "Linux"){
		document.getElementById("logoOS").className = "fa fa-linux";
	}else if(e.target.value === "MacOS"){
		document.getElementById("logoOS").className = "fa fa-apple";
	}
};

//Change current user-agent
var applyChanges = function(){

	localStorage["os"] = document.getElementById("os").value;
	localStorage["browser"] = document.getElementById("browser").value;
};

//Display current settings
var updateList = function(){

	document.getElementById(localStorage["browser"]).selected = "selected";	
	document.getElementById(localStorage["os"]).selected = "selected";
	var event = new Event("change");
	document.getElementById("os").dispatchEvent(event);
	event = new Event("change");
	document.getElementById("browser").dispatchEvent(event);
};

document.getElementById("browser").addEventListener("change", changeLogo);
document.getElementById("os").addEventListener("change", changeLogo);
document.getElementById("apply").addEventListener("click", applyChanges);
window.onload = updateList;

