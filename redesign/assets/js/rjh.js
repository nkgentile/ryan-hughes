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
	pages.home = (function(){
		var modules, render, display;

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

		render = function(){
			var buffer;
			buffer = new DocumentFragment();
			buffer.appendChild(modules.gallery());
			return buffer;
		};

		display = function(){
			content.innerHTML = "";
			content.appendChild(render());
		};

		return {
			"display":display,
			"render":render
		};
	}());
	pages.bio = (function(){
		var modules, render, display;

		modules = {};
		modules.bio = function(){
			var bio;
			bio = document.createElement("div");
			bio.id = "bio";
			bio.appendChild(modules.about());
			bio.appendChild(modules.portrait());
			return bio;
		};
		modules.about= function(){
			var about;
			about = document.createElement("div");
			about.id = "about";
			model.about.bio.forEach(function(p, i){
				var paragraph;
				paragraph = document.createElement("p");
				paragraph.classList.add("about");
				paragraph.innerHTML = p;
				about.appendChild(paragraph);
			});
			return about;
		};
		modules.portrait = function(){
			var portrait, image;

			image = new Image();
			image.src = ["assets/img/",model.about.portrait].join("");

			portrait = document.createElement("div");
			portrait.id = "portrait";
			portrait.style.backgroundImage = ["url(", image.src, ")"].join("");
			return portrait;
		};

		render = function(){
			var buffer;
			buffer = new DocumentFragment();
			buffer.appendChild(modules.bio());
			return buffer;
		};

		display = function(){
			content.innerHTML = "";
			content.appendChild(render());
		};

		return {
			"render":render,
			"display":display
		};
	}());
	pages.pyrite = (function(){
		var modules, render, display;

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

			gallery.appendChild(modules.plans());
			gallery.appendChild(modules.elevations());
			gallery.appendChild(modules.images());
			gallery.appendChild(modules.model());

			return gallery;
		};
		modules.plans = function(){
			var carousel, slideshow;
			carousel = modules.carousel();
			model.projects.pyrite.assets.plans.forEach(function(e, i){
				var item;
				item = modules.carouselItem.call(e);
				carousel.appendChild(item);
				return item;
			});
			return carousel;
		};
		modules.elevations = function(){
			var carousel;
			carousel = modules.carousel();
			model.projects.pyrite.assets.elevations.forEach(function(e, i){
				var item;
				item = modules.carouselItem.call(e);
				carousel.appendChild(item);
				return item;
			});
			return carousel;
		};
		modules.images = function(){
			var carousel;
			carousel = modules.carousel();
			model.projects.pyrite.assets.images.forEach(function(e, i){
				var item;
				item = modules.carouselItem.call(e);
				carousel.appendChild(item);
				return item;
			});
			return carousel;
		};
		modules.model = function(){
			var item;
			item = document.createElement("div");
			item.classList.add("carousel__gallery");
			return item;
		};
		modules.carousel = function(){
			var carousel, slideshow;
			carousel = document.createElement("div");
			carousel.classList.add("carousel__gallery");
			slideshow = {
				"active":0,
				"interval":5000 * (Math.random() + 1),
				"next":function(){
					if(slideshow.active === carousel.children.length - 1)
						slideshow.go(0);
					else
						slideshow.go(slideshow.active+1);
				},
				"prev":function(){
					if(!slideshow.activeItem)
						return;
					else
						slideshow.go(slideshow.activeItem - 1)
				},
				"go":function(i){
					var nodes = carousel.children;
					carousel.firstElementChild.style.marginLeft = ["-", i, "00%"].join("");
					nodes[slideshow.active].classList.remove("active");
					slideshow.active = i;
					nodes[slideshow.active].classList.add("active");
				},
				"start":function(){
					slideshow.timer = setInterval(slideshow.next, slideshow.interval);
				},
				"stop":function(){
					if(slideshow.timer === undefined)
						return;
					clearInterval(slideshow.timer);
				}
			};
			slideshow.start();
			carousel.addEventListener("mouseenter", function(){
				this.classList.toggle("active");
				slideshow.stop();
			});
			carousel.addEventListener("mouseleave", function(){
				this.classList.toggle("active");
				slideshow.start();
			});
			return carousel;
		};
		modules.carouselItem = function(){
			var item, image;
			item = document.createElement("div");
			item.classList.add("item__carousel");

			image = new Image();
			image.src = ["assets/img/", this.name].join("");
			image.addEventListener("load", function(){
				item.style.backgroundImage = ["url(", image.src, ")"].join("");
			});
			return item;
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
			var buffer;
			buffer = new DocumentFragment();
			buffer.appendChild(modules.project());
			return buffer;
		};

		display = function(){
			content.innerHTML = "";
			content.appendChild(render());
		};

		return {
			"render":render,
			"display":display
		};
	}());
	pages.resume = (function(){
		var modules, render, display;
		
		modules = new Object();
		modules.resume = function(){
			var resume;
			resume = document.createElement("div");
			resume.id = "resume";
			resume.innerHTML = model.resume;
			return resume;
		};

		render = function(){
			var buffer;
			buffer = new DocumentFragment();
			buffer.appendChild(modules.resume());
			return buffer;
		};

		display = function(){
			content.innerHTML = "";
			content.appendChild(render());
		};

		return {
			"render":render,
			"display":display
		};
	}());

	modules = {};
	modules.container = function(){
		var _container;
		_container = document.createElement("div");
		_container.classList.add("container__main");
		document.body.appendChild(_container);
		container = _container;
	};
	modules.menu = function(){
		var menu, header, nav, activeItem, click;
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

		click = function(e){
			if(!pages[this.name])
				return console.error("Page " + this.name + " doesn't exist..");
			pages[this.name].display();
			if(activeItem){
				activeItem.classList.remove("active");
			}
			activeItem = e.target;
			activeItem.classList.add("active");
		};

		model.navigation.forEach(function(e, i){
			var item;

			item = modules.navItem();
			if(e.name === "projects"){
				item.appendChild((function(){
					var title;
					title = modules.navItem();
					title.classList.add("title");
					return title;
				}()));
				item.firstElementChild.textContent = e.name;
				item.classList.add("parent");
				e.children.forEach(function(f, n){
					var child;
					child = modules.navItem.call(f);
					child.classList.add("child");
					child.textContent = f.name;
					child.addEventListener("click", click.bind(f));
					item.appendChild(child);
				});
				item.addEventListener("mouseenter", function(){
					item.classList.add("active");
				});
				item.addEventListener("mouseleave", function(){
					item.classList.remove("active");
				});
			} else{
				item.textContent = e.name;
				item.addEventListener("click", click.bind(e));
			}
			nav.appendChild(item);
		});

		container.appendChild(menu);
	};
	modules.navItem = function(){
		var item;
		item = document.createElement("div");
		item.classList.add("item__main");
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
		modules.container();
		modules.menu();
		modules.content();
		pages.home.display();
	};

	return {
		"model": model
	};
})();
