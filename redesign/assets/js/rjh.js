"use strict";
var CONTNT, Page;

Page = function(_name){
	return {
		"name":_name,
		"modules":null,
		"display":null,
		"render":null,
	};
};

CONTNT = (function(){
	var util, render, model, modules;

	util = {};

	model = (function(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "assets/json/model.json", true);
		xhr.addEventListener("readystatechange", function(){
			if(this.readyState < 4)
				return;
			if(this.status !== 200)
				return;
			try{
				model = JSON.parse(this.response);
			} catch(e){
				return console.error("Invalid JSON...");
			}
			render.call(model);
		});
		xhr.send();
	}());

	modules = {};
	modules.container = function(){
		var container;
		container = document.createElement("div");
		container.id = "container";
		document.body.appendChild(container);
		this.container = container;
	};
	modules.menu = function(){
		var menu;
		menu = document.createElement("nav");
		this.container.appendChild(menu);
		this.menu = menu;
	};

	render = function(){
		modules.container.call(this);
		modules.menu.call(this);
	};

	return {
		"model": model
	};
})();
