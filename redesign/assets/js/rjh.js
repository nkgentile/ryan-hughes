"use strict";

var CONTNT = (function(){
	var util, pages, render, model, page;

	util = {};

	model = (function(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "assets/json/model.json", true);
		xhr.addEventListener("readystatechange", function(){
			if(this.readyState < 4)
				return;
			if(this.status !== 200)
				return;
			model = JSON.parse(this.response);
			render.call(model);
		});
		xhr.send();
	}());

	return {
		"model": model
	};
})();
