"use strict";
var CONTNT;

CONTNT = (function(){
	var util, build, model, modules, menu, container, content, pages;

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
			build();
		});
		xhr.send();
	}());

	pages = {};
	pages.home = function(){
		var buffer, modules, render, display;

		buffer = new DocumentFragment();

		modules = {};
		modules.gallery = function(){
			var gallery;
			gallery = document.createElement("div");
			gallery.classList.add("gallery__home");
			for(var i=0; i<10; i++)
				gallery.appendChild(
					modules.card.call(model)
				);
			buffer.appendChild(gallery);
		};
		modules.card = function(){
			var card;
			card = document.createElement("div");
			card.classList.add("card__home");
			return card;
		};

		render = function(){
			modules.gallery();
		};

		display = function(){
			content.innerHTML = "";
			content.appendChild(buffer);
		};

		return {
			"render":render,
			"display":display
		};
	};
	pages.bio = function(){
		var buffer, modules, render, display;

		buffer = new DocumentFragment();

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

		render = function(){
			var bio, portrait;
			bio = modules.bio();
		};

		display = function(){
			content.innerHTML = "";
			content.appendChild(buffer);
		};

		return {
			"render":render,
			"display":display
		};
	};
	pages.pyrite = function(){
		var buffer, modules, render, display;

		modules = {};
		modules.title = function(){
			var title;
			title = document.createElement("h1");
			title.classList.add("title__project");
			title.textContent = model.projects.pyrite.title;
			return title;
		};
		modules.assets = function(){
			var assets;
			assets = document.createElement("article");
			assets.classList.add("assets__project");
			assets.appendChild(modules.description());
			assets.appendChild(modules.gallery());
			return assets;
		};
		modules.description = function(){
			var description;
			description = document.createElement("div");
			description.classList.add("description__project");
			model.projects.pyrite.description.forEach(function(e, i){
				var p;
				p = document.createElement("p");
				p.classList.add("description__project");
				p.innerHTML = e;
				description.appendChild(p);
			});
			return description;
		};
		modules.gallery = function(){
			var gallery;
			gallery = document.createElement("div");
			gallery.classList.add("project__gallery");

			for(var i=4; i--;){
				var n;
				n = document.createElement("div");
				n.classList.add("carousel__gallery");
				gallery.appendChild(n);
			}

			return gallery;
		};
		modules.assets = function(){
			var assets;
			assets = document.createElement("div");
			assets.classList.add("assets__project");
			assets.appendChild(modules.description());
			assets.appendChild(modules.gallery());
			return assets;
		};
		modules.project = function(){
			var project;
			project = document.createElement("div");
			project.classList.add("project");
			project.appendChild(modules.title());
			project.appendChild(modules.assets());
			return project;
		};

		render = function(){
			buffer = new DocumentFragment();
			buffer.appendChild(modules.project());
		};

		display = function(){
			content.innerHTML = "";
			content.appendChild(buffer);
		};

		return {
			"render":render,
			"display":display
		};
	};

	modules = {};
	modules.container = function(){
		var _container;
		_container = document.createElement("div");
		_container.classList.add("container__main");
		document.body.appendChild(_container);
		container = _container;
	};
	modules.menu = function(){
		var menu, header, nav, activeItem;
		menu = document.createElement("aside");
		menu.classList.add("menu__main");

		header = document.createElement("h1");
		header.classList.add("header__main");
		header.textContent = "ryan hughes";
		header.addEventListener("click", function(){
			pages.home.display();
		});
		menu.appendChild(header);

		nav = document.createElement("nav");
		nav.classList.add("__main");
		menu.appendChild(nav);

		model.navigation.forEach(function(e, i){
			var navItem, click;

			navItem = modules.navItem.call(e);

			click = function(){
				console.log(this.name);
				if(!pages[this.name])
					return console.error("Page \'"+this.name+"\' doesn't exist.");
				pages[this.name].display();

				if(activeItem !== undefined)
					activeItem.classList.remove("active");
				activeItem = navItem;
				activeItem.classList.add("active");
			}.bind(e);
			if(!e.children)
				navItem.addEventListener("click", click);

			nav.appendChild(navItem);
			return navItem;
		});
		container.appendChild(menu);
	};
	modules.navItem = function(){
		var item;
		item = document.createElement("div");
		item.classList.add("item__main");
		item.textContent = this.name;
		if(this.children){
			this.children.forEach(function(c, i){
				var inner;
				inner = modules.navItem.call(c);
				item.appendChild(inner);
				item.addEventListener("click", function(e){
					pages[c.name].display();
				});
			});
		};
		return item;
	};
	modules.content = function(){
		var _content;
		_content = document.createElement("div");
		_content.classList.add("content__main");
		container.appendChild(_content);
		content = _content;
	};

	build = function(){
		for(var page in pages){
			pages[page] = pages[page].call();
		};
		modules.container();
		modules.menu();
		modules.content();
		for(var page in pages){
			pages[page].render();
			if(page === "pyrite"){
				pages[page].display();
			}
		};
	};

	return {
		"model": model
	};
})();
