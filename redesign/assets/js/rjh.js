"use strict";
var CONTNT, Page;

Page = function(){
	var model, style;
};

CONTNT = (function(){
	var util, render, model, modules, pages;

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

	pages = {};
	pages.home = function(){
		var buffer, modules, render, display;

		modules = {};
		modules.gallery = function(){
			var gallery;
			gallery = document.createElement("div");
			gallery.id = "gallery";
			for(var i=0; i<10; i++)
				gallery.appendChild(
					modules.card.call(this)
				);

			return gallery;
		};
		modules.card = function(){
			var card;
			card = document.createElement("div");
			card.classList.add("card");
			return card;
		};

		render = (function(){
			buffer = new DocumentFragment();
			buffer.appendChild(
				modules.gallery.call(this)
			);
		}());

		display = function(){
			this.content.innerHTML = "";
			this.content.appendChild(buffer);
		};

		return {
			"display":display
		};
	};

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
	modules.content = function(){
		var content;
		content = document.createElement("div");
		this.container.appendChild(content);
		this.content = content;
	};

	render = function(){
		modules.container.call(this);
		modules.menu.call(this);
		modules.content.call(this);
		pages.home.call(this).display.call(this);
	};

	return {
		"model": model
	};
})();
