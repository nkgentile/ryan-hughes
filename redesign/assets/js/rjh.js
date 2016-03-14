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
		var buffer, model, modules, render, display;
		model = this;

		modules = {};
		modules.gallery = function(){
			var gallery;
			gallery = document.createElement("div");
			gallery.classList.add("gallery__home");
			for(var i=0; i<10; i++)
				gallery.appendChild(
					modules.card.call(model)
				);
			return gallery;
		};
		modules.card = function(){
			var card;
			card = document.createElement("div");
			card.classList.add("card__home");
			return card;
		};

		buffer = new DocumentFragment();
		render = (function(){
			buffer.appendChild(
				modules.gallery()
			);
		}());

		display = function(){
			model.content.innerHTML = "";
			model.content.appendChild(buffer);
		};

		return {
			"display":display
		};
	};
	pages.bio = function(){
		var buffer, model, modules, render, display;
		model = this;

		modules = {};
		modules.bio = function(){
			var bio;
			bio = document.createElement("div");
			model.about.bio.forEach(function(p, i){
				var paragraph;
				paragraph = document.createElement("p");
				paragraph.classList.add("about");
				paragraph.textContent = p;
				bio.appendChild(paragraph);
			});
		};

		buffer = new DocumentFragment();
		render = (function(){
			var bio, portrait;
			bio = modules.bio();
		}());

		display = function(){
			model.content.innerHTML = "";
			model.content.appendChild(buffer);
		};

		return {
			"display":display
		};
	};

	modules = {};
	modules.container = function(){
		var container;
		container = document.createElement("div");
		container.classList.add("container__main");
		document.body.appendChild(container);
		this.container = container;
	};
	modules.menu = function(){
		var menu, header, nav;
		menu = document.createElement("aside");
		menu.classList.add("menu__main");

		header = document.createElement("h1");
		header.classList.add("header__main");
		header.textContent = "ryan hughes";
		menu.appendChild(header);

		nav = document.createElement("nav");
		nav.classList.add("__main");
		menu.appendChild(nav);

		this.navigation.forEach(function(e, i){
			var navItem;
			navItem = modules.navItem.call(e);
			nav.appendChild(navItem);
			return navItem;
		});
		this.container.appendChild(menu);
		this.menu = menu;
	};
	modules.navItem = function(){
		var item, click;
		item = document.createElement("div");
		item.classList.add("item__main");
		item.textContent = this.name;

		click = function(){
			if(!pages[this.name])
				return console.error("Page \'"+this.name+"\' doesn't exist.");
			console.log(this.name);
			pages[this.name].display();
		}.bind(this);
		item.addEventListener("click", click);

		return item;
	};
	modules.content = function(){
		var content;
		content = document.createElement("div");
		content.classList.add("content__main");
		this.container.appendChild(content);
		this.content = content;
	};

	render = function(){
		modules.container.call(model);
		modules.menu.call(model);
		modules.content.call(model);
		for(var page in pages){
			pages[page] = pages[page].call(model);
		};
		pages.home.display();
	};

	return {
		"model": model
	};
})();
