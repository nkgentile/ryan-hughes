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
			this.forEach(function(e, i){
				var card;
				card = modules.card(e);
				gallery.appendChild(card);
			});
			return gallery;
		};
		modules.card = function(item){
			var card, image, caption;

			image = new Image();
			image.src = "assets/img/" + item.name;

			card = document.createElement("div");
			card.classList.add("card__home");
			card.style.backgroundImage = ["url(", image.src, ")"].join("");

			card.addEventListener("click", function(){
				pages[item.page].display();
			});
			card.addEventListener("mouseenter", function(){
				card.classList.add("active");
			});
			card.addEventListener("mouseleave", function(){
				card.classList.remove("active");
			});

			caption = document.createElement("div");
			caption.classList.add("caption__home");
			caption.innerHTML = item.caption;
			card.appendChild(caption);

			return card;
		};

		render = function(){
			var buffer;
			buffer = new DocumentFragment();
			buffer.appendChild(modules.gallery.call(model.showcase));
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
		modules.about = function(){
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
		modules.description = function(){
			var description, header, footer;

			description = document.createElement("div");
			description.classList.add("description__project");

			header = document.createElement("p");
			header.innerHTML = model.projects.pyrite.description.header;
			header.style.fontFamily = "Brandon Grotesque Thin";
			header.style.fontSize = "10pt";
			description.appendChild(header);

			model.projects.pyrite.description.body.forEach(function(e, i){
				var p;
				p = document.createElement("p");
				p.classList.add("description__project");
				p.innerHTML = e;
				description.appendChild(p);
			});

			footer = document.createElement("div");
			footer.innerHTML = model.projects.pyrite.description.footer;
			footer.style.fontFamily = "Brandon Grotesque Thin";
			footer.style.fontSize = "10pt";
			description.appendChild(footer);

			return description;
		};
		modules.overlay = function(){
			var overlay, close;
			overlay = document.createElement("div");
			overlay.id = "overlay";
			return overlay;
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
			var carousel;
			carousel = modules.carousel(model.projects.pyrite.assets.plans);
			return carousel;
		};
		modules.elevations = function(){
			var carousel;
			carousel = modules.carousel(model.projects.pyrite.assets.elevations);
			return carousel;
		};
		modules.images = function(){
			var carousel;
			carousel = modules.carousel(model.projects.pyrite.assets.images);
			return carousel;
		};
		modules.model = function(){
			var item;
			item = document.createElement("div");
			item.classList.add("carousel__gallery");
			item.appendChild(modules.obj(model.projects.pyrite.assets.model[0]));
			item.addEventListener("mouseenter", function(){
				item.classList.add("active");
			});
			item.addEventListener("mouseleave", function(){
				item.classList.remove("active");
			});
			item.addEventListener("click", function(){
				var overlay, close, obj;

				obj = modules.obj(model.projects.pyrite.assets.model[0]);
				
				overlay = document.getElementById("overlay");
				overlay.innerHTML = "";
				overlay.appendChild(obj);
				overlay.classList.add("active");

				close = document.createElement("div");
				close.id = "close";
				close.addEventListener("click", function(){
					overlay.classList.remove("active");
				});
				overlay.appendChild(close);
			});
			return item;
		};
		modules.obj = function(model){
			var container, camera, pivot, scene, renderer, caption;
			var mouseX = 0, mouseY = 0;
			init();
			animate();
			function init() {
				container = document.createElement( 'div' );
				container.classList.add("item__carousel");

				camera = new THREE.PerspectiveCamera( 45, 300 / 300, 1, 50 );
				camera.position.z = 20;
				// scene
				scene = new THREE.Scene();
				var ambient = new THREE.AmbientLight( 0x444444 );
				scene.add( ambient );
				
				var directionalLight = new THREE.DirectionalLight( 0xaaaaaa );
				directionalLight.position.set( 20, 20, 20 );
				scene.add( directionalLight );
				
				pivot = new THREE.Group();
				scene.add(pivot);

				// texture
				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};
				var texture = new THREE.Texture();
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};
				var onError = function ( xhr ) {
				};
				var loader = new THREE.ImageLoader( manager );
				loader.load( 'assets/img/board.jpg', function ( image ) {
					texture.image = image;
					texture.needsUpdate = true;
				} );
				// model
				var loader = new THREE.OBJLoader( manager );
				loader.load( 'assets/img/'+ model.name, function ( object ) {
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
					} );
					var box = new THREE.Box3().setFromObject( object );
					box.center( object.position ); // this re-sets the mesh position
					object.position.multiplyScalar( - 1 );
					pivot.add( object );
				}, onProgress, onError );
				//
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setClearColor(0xffffff);
				renderer.setSize( 900, 900 );
				renderer.domElement.style.maxWidth = "100%";
				renderer.domElement.style.maxHeight = "100%";
				renderer.domElement.style.minWidth = "300px";
				renderer.domElement.style.minHeight = "300px";
				container.appendChild( renderer.domElement );
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				render();
			}
			function render() {
				pivot.rotation.y += 0.001;
				renderer.render( scene, camera );
			}

			caption = modules.caption.call(model.caption);
			container.appendChild(caption);
				
			return container;
		};
		modules.carousel = function(images){
			var carousel, slideshow, lArrow, rArrow, overlay;
			carousel = document.createElement("div");
			carousel.classList.add("carousel__gallery");
			slideshow = {
				"active":0,
				"interval":5000 * (Math.random() + 1),
				"next":function(){
					if(slideshow.active === carousel.getElementsByClassName("item__carousel").length - 1)
						slideshow.go(0);
					else
						slideshow.go(slideshow.active+1);
				},
				"prev":function(){
					if(!slideshow.active)
						return slideshow.go(carousel.getElementsByClassName("item__carousel").length - 1);
					else
						slideshow.go(slideshow.active - 1)
				},
				"go":function(i){
					var nodes = carousel.getElementsByClassName("item__carousel");
					nodes[0].style.marginLeft = ["-", i, "00%"].join("");
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
				this.classList.add("active");
				slideshow.stop();
			});
			carousel.addEventListener("mouseleave", function(){
				this.classList.remove("active");
				slideshow.start();
			});

			carousel.addEventListener("click", function(e){
				var close;
				switch(e.target.id){
					case "left":
						return;
					case "right":
						return;
					default:
						break;
				}

	
				close = document.createElement("div");
				close.id = "close";
				close.addEventListener("click", function(){
					overlay.classList.remove("active");
				});

				overlay = document.getElementById("overlay");
				overlay.innerHTML = "";
				overlay.appendChild(modules.overlayCarousel(images, slideshow.active));
				overlay.classList.add("active");
				overlay.appendChild(close);
			});

			images.forEach(function(e, i){
				carousel.appendChild(modules.carouselItem.call(e));
			});

			lArrow = modules.arrow();
			lArrow.id = "left";
			lArrow.addEventListener("click", function(){
				slideshow.prev();
			});
			carousel.appendChild(lArrow);

			rArrow = modules.arrow();
			rArrow.id = "right";
			rArrow.addEventListener("click", function(){
				slideshow.next();
			});
			carousel.appendChild(rArrow);

			return carousel;
		};
		modules.overlayCarousel = function(images, index){
			var carousel, slideshow, lArrow, rArrow;
			carousel = document.createElement("div");
			carousel.classList.add("carousel__gallery");
			images.forEach(function(e, i){
				var item;
				item = modules.carouselItem.call(e);
				carousel.appendChild(item);
			});

			slideshow = {
				"active":index,
				"nodes":carousel.getElementsByClassName("item__carousel"),
				"next":function(){
					if(slideshow.active === slideshow.nodes.length - 1)
						slideshow.go(0);
					else
						slideshow.go(slideshow.active+1);
				},
				"prev":function(){
					if(!slideshow.active)
						return slideshow.go(slideshow.nodes.length-1);
					else
						slideshow.go(slideshow.active - 1);
				},
				"go":function(i){
					slideshow.nodes[0].style.marginLeft = ["-", i, "00%"].join("");
					slideshow.nodes[slideshow.active].classList.remove("active");
					slideshow.active = i;
					slideshow.nodes[slideshow.active].classList.add("active");
				}
			};

			document.addEventListener("keydown", function(e){
				switch (e.keyCode){
					case 39:
						slideshow.next(); 
						break;
					case 37:
						slideshow.prev();
						break;
					default:
						break;
				}
			});
			
			lArrow = modules.arrow();
			lArrow.id = "left";
			lArrow.addEventListener("click", function(){
				slideshow.prev();
			});
			carousel.appendChild(lArrow);

			rArrow = modules.arrow();
			rArrow.id = "right";
			rArrow.addEventListener("click", function(){
				slideshow.next();
			});
			carousel.appendChild(rArrow);
			
			return carousel;
		};
		modules.arrow = function(){
			var arrow;
			arrow = document.createElement("div");
			arrow.classList.add("arrow");
			return arrow;
		};
		modules.carouselItem = function(){
			var item, image, caption;
			item = document.createElement("div");
			item.classList.add("item__carousel");

			image = new Image();
			image.src = ["assets/img/", this.name].join("");
			image.addEventListener("load", function(){
				item.style.backgroundImage = ["url(", image.src, ")"].join("");
			});

			caption = modules.caption.call(this.caption);
			item.appendChild(caption);

			return item;
		};
		modules.caption = function(){
			var caption;
			caption = document.createElement("div");
			caption.classList.add("caption__item");
			caption.innerHTML = this;
			return caption;
		};
		modules.assets = function(){
			var assets;
			assets = document.createElement("div");
			assets.classList.add("assets__project");
			assets.appendChild(modules.description());
			assets.appendChild(modules.gallery());
			assets.appendChild(modules.overlay());
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
	pages.marden = (function(){
		var modules, render, display;

		modules = {};
		modules.title = function(){
			var title;
			title = document.createElement("h1");
			title.classList.add("title__project");
			title.textContent = model.projects.marden.title;
			return title;
		};
		modules.description = function(){
			var description, header, footer;

			description = document.createElement("div");
			description.classList.add("description__project");

			header = document.createElement("p");
			header.style.fontFamily = "Brandon Grotesque Thin";
			header.style.fontSize = "10pt";
			header.innerHTML = model.projects.marden.description.header;
			description.appendChild(header);

			model.projects.marden.description.body.forEach(function(e, i){
				var p;
				p = document.createElement("p");
				p.classList.add("description__project");
				p.innerHTML = e;
				description.appendChild(p);
			});

			footer = document.createElement("div");
			footer.innerHTML = model.projects.marden.description.footer;
			footer.style.fontFamily = "Brandon Grotesque Thin";
			footer.style.fontSize = "10pt";
			description.appendChild(footer);

			return description;
		};
		modules.overlay = function(){
			var overlay, close;
			overlay = document.createElement("div");
			overlay.id = "overlay";
			return overlay;
		};
		modules.gallery = function(){
			var gallery;
			gallery = document.createElement("div");
			gallery.classList.add("project__gallery");

			gallery.appendChild(modules.plans());
			gallery.appendChild(modules.images());
			gallery.appendChild(modules.inspiration());
			gallery.appendChild(modules.video());

			return gallery;
		};
		modules.plans = function(){
			var carousel;
			carousel = modules.carousel(model.projects.marden.assets.plans);
			return carousel;
		};
		modules.inspiration = function(){
			var carousel;
			carousel = modules.carousel(model.projects.marden.assets.inspiration);
			return carousel;
		};
		modules.images = function(){
			var carousel;
			carousel = modules.carousel(model.projects.marden.assets.images);
			return carousel;
		};
		modules.video = function(){
			var item;
			item = document.createElement("div");
			item.innerHTML = model.projects.marden.assets.video;
			item.classList.add("carousel__gallery");
			return item;
		};
		modules.carousel = function(images){
			var carousel, slideshow, lArrow, rArrow, overlay;
			carousel = document.createElement("div");
			carousel.classList.add("carousel__gallery");
			slideshow = {
				"active":0,
				"interval":5000 * (Math.random() + 1),
				"next":function(){
					if(slideshow.active === carousel.getElementsByClassName("item__carousel").length - 1)
						slideshow.go(0);
					else
						slideshow.go(slideshow.active+1);
				},
				"prev":function(){
					if(!slideshow.active)
						return slideshow.go(carousel.getElementsByClassName("item__carousel").length - 1);
					else
						slideshow.go(slideshow.active - 1)
				},
				"go":function(i){
					var nodes = carousel.getElementsByClassName("item__carousel");
					nodes[0].style.marginLeft = ["-", i, "00%"].join("");
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
				this.classList.add("active");
				slideshow.stop();
			});
			carousel.addEventListener("mouseleave", function(){
				this.classList.remove("active");
				slideshow.start();
			});

			carousel.addEventListener("click", function(e){
				var close;
				switch(e.target.id){
					case "left":
						return;
					case "right":
						return;
					default:
						break;
				}

	
				close = document.createElement("div");
				close.id = "close";
				close.addEventListener("click", function(){
					overlay.classList.remove("active");
				});

				overlay = document.getElementById("overlay");
				overlay.innerHTML = "";
				overlay.appendChild(modules.overlayCarousel(images, slideshow.active));
				overlay.classList.add("active");
				overlay.appendChild(close);
			});

			images.forEach(function(e, i){
				carousel.appendChild(modules.carouselItem.call(e));
			});

			lArrow = modules.arrow();
			lArrow.id = "left";
			lArrow.addEventListener("click", function(){
				slideshow.prev();
			});
			carousel.appendChild(lArrow);

			rArrow = modules.arrow();
			rArrow.id = "right";
			rArrow.addEventListener("click", function(){
				slideshow.next();
			});
			carousel.appendChild(rArrow);

			return carousel;
		};
		modules.overlayCarousel = function(images, index){
			var carousel, slideshow, lArrow, rArrow;
			carousel = document.createElement("div");
			carousel.classList.add("carousel__gallery");
			images.forEach(function(e, i){
				var item;
				item = modules.carouselItem.call(e);
				carousel.appendChild(item);
			});

			slideshow = {
				"active":index,
				"nodes":carousel.getElementsByClassName("item__carousel"),
				"next":function(){
					if(slideshow.active === slideshow.nodes.length - 1)
						slideshow.go(0);
					else
						slideshow.go(slideshow.active+1);
				},
				"prev":function(){
					if(!slideshow.active)
						return slideshow.go(slideshow.nodes.length-1);
					else
						slideshow.go(slideshow.active - 1);
				},
				"go":function(i){
					slideshow.nodes[0].style.marginLeft = ["-", i, "00%"].join("");
					slideshow.nodes[slideshow.active].classList.remove("active");
					slideshow.active = i;
					slideshow.nodes[slideshow.active].classList.add("active");
				}
			};

			document.addEventListener("keydown", function(e){
				switch (e.keyCode){
					case 39:
						slideshow.next(); 
						break;
					case 37:
						slideshow.prev();
						break;
					default:
						break;
				}
			});

			lArrow = modules.arrow();
			lArrow.id = "left";
			lArrow.addEventListener("click", function(){
				slideshow.prev();
			});
			carousel.appendChild(lArrow);

			rArrow = modules.arrow();
			rArrow.id = "right";
			rArrow.addEventListener("click", function(){
				slideshow.next();
			});
			carousel.appendChild(rArrow);
			
			return carousel;
		};
		modules.arrow = function(){
			var arrow;
			arrow = document.createElement("div");
			arrow.classList.add("arrow");
			return arrow;
		};
		modules.carouselItem = function(){
			var item, image, caption;
			item = document.createElement("div");
			item.classList.add("item__carousel");

			image = new Image();
			image.src = ["assets/img/", this.name].join("");
			image.addEventListener("load", function(){
				item.style.backgroundImage = ["url(", image.src, ")"].join("");
			});

			caption = modules.caption.call(this.caption);
			item.appendChild(caption);

			return item;
		};
		modules.caption = function(){
			var caption;
			caption = document.createElement("div");
			caption.classList.add("caption__item");
			caption.innerHTML = this;
			return caption;
		};
		modules.assets = function(){
			var assets;
			assets = document.createElement("div");
			assets.classList.add("assets__project");
			assets.appendChild(modules.description());
			assets.appendChild(modules.gallery());
			assets.appendChild(modules.overlay());
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
	pages.illustrations = (function(){
		var modules, render, display;

		modules = {};
		modules.title = function(){
			var title;
			title = document.createElement("h1");
			title.classList.add("title__project");
			title.textContent = model.projects.illustrations.title;
			return title;
		};
		modules.overlay = function(){
			var overlay, close;
			overlay = document.createElement("div");
			overlay.id = "overlay";
			return overlay;
		};
		modules.overlayCarousel = function(images, index){
			var carousel, slideshow, lArrow, rArrow;
			carousel = document.createElement("div");
			carousel.classList.add("carousel__gallery");
			images.forEach(function(e, i){
				var item;
				item = modules.carouselItem.call(e);
				carousel.appendChild(item);
			});

			slideshow = {
				"active":index,
				"nodes":carousel.getElementsByClassName("item__carousel"),
				"next":function(){
					if(slideshow.active === slideshow.nodes.length - 1)
						slideshow.go(0);
					else
						slideshow.go(slideshow.active+1);
				},
				"prev":function(){
					if(!slideshow.active)
						return slideshow.go(slideshow.nodes.length-1);
					else
						slideshow.go(slideshow.active - 1);
				},
				"go":function(i){
					slideshow.nodes[0].style.marginLeft = ["-", i, "00%"].join("");
					slideshow.nodes[slideshow.active].classList.remove("active");
					slideshow.active = i;
					slideshow.nodes[slideshow.active].classList.add("active");
				}
			};
			slideshow.go(slideshow.active);

			document.addEventListener("keydown", function(e){
				switch (e.keyCode){
					case 39:
						slideshow.next(); 
						break;
					case 37:
						slideshow.prev();
						break;
					default:
						break;
				}
			});


			lArrow = modules.arrow();
			lArrow.id = "left";
			lArrow.addEventListener("click", function(){
				slideshow.prev();
			});
			carousel.appendChild(lArrow);

			rArrow = modules.arrow();
			rArrow.id = "right";
			rArrow.addEventListener("click", function(){
				slideshow.next();
			});
			carousel.appendChild(rArrow);
			
			return carousel;
		};
		modules.arrow = function(){
			var arrow;
			arrow = document.createElement("div");
			arrow.classList.add("arrow");
			return arrow;
		};
		modules.carouselItem = function(){
			var item, image, caption;
			item = document.createElement("div");
			item.classList.add("item__carousel");

			image = new Image();
			image.src = ["assets/img/", this.name].join("");
			image.addEventListener("load", function(){
				item.style.backgroundImage = ["url(", image.src, ")"].join("");
			});

			caption = modules.caption.call(this.caption);
			item.appendChild(caption);

			return item;
		};
		modules.caption = function(){
			var caption;
			caption = document.createElement("div");
			caption.classList.add("caption__card");
			caption.innerHTML = this;
			return caption;
		};
		modules.illustrations = function(){
			var illustrations, overlay, title;
			illustrations = document.createElement("div");
			illustrations.id = "illustrations";

			title = modules.title();
			illustrations.appendChild(title);

			this.forEach(function(e, i){
				var card, index;
				card = modules.card.call(e);
				card.addEventListener("mouseenter", function(){
					card.classList.add("active");
				});
				card.addEventListener("mouseleave", function(){
					card.classList.remove("active");
				});
				card.addEventListener("click", function(){
					var close;
					close = document.createElement("div");
					close.id = "close";
					close.addEventListener("click", function(){
						overlay.classList.remove("active");
					});

					overlay.innerHTML = "";
					overlay.appendChild(modules.overlayCarousel(model.projects.illustrations.assets.images, i));
					overlay.classList.add("active");
					overlay.appendChild(close);
				});
				illustrations.appendChild(card);
			}, this);
			
			overlay = modules.overlay();
			illustrations.appendChild(overlay);
			
			return illustrations;
		};
		modules.card = function(){
			var card, image, caption;
			card = document.createElement("div");
			card.classList.add("card__illustrations");

			image = new Image();
			image.src = "assets/img/" + this.name;

			card.style.backgroundImage = ["url(", image.src, ")"].join("");

			caption = modules.caption.call(this.caption);
			card.appendChild(caption);

			return card;
		};

		render = function(){
			var buffer;
			buffer = new DocumentFragment();
			buffer.appendChild(modules.illustrations.call(model.projects.illustrations.assets.images));
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
			window.location.hash = "#home";
		});
		menu.appendChild(header);

		nav = document.createElement("nav");
		nav.classList.add("__main");
		menu.appendChild(nav);

		click = function(e){
			if(!pages[this.name])
				return console.error("Page " + this.name + " doesn't exist..");
			window.location.hash = this.name;
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
				item.id = "projects";
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
			}
			else if (e.name === "contact"){
				item.textContent = e.name;
				item.addEventListener("click", function(){
					window.open("mailto:ryanjhughes@me.com");
				});
			}
			else if (e.name === "links"){
				item.appendChild(modules.navItem());
				item.firstElementChild.classList.add("title");
				item.classList.add("parent");
				item.id = "links";
				item.firstElementChild.textContent = e.name;
				item.addEventListener("mouseenter", function(){
					item.classList.add("active");
				});
				item.addEventListener("mouseleave", function(){
					item.classList.remove("active");
				});
				model.social.forEach(function(f, n){
					var social;
					social = document.createElement("div");
					social.classList.add("social");
					social.classList.add("child");
					social.style.backgroundImage = ["url(assets/img/", f.badge, ")"].join("");
					social.addEventListener("click", function(){
						window.open(f.url);
					});
					item.appendChild(social);
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
		var hash;
		modules.container();
		modules.menu();
		modules.content();
		
		hash = window.location.hash.replace("#", "");
		if(hash === "")
			pages.home.display();
		else
			pages[hash].display();
			
		window.addEventListener("hashchange", function(){
			hash = window.location.hash.replace("#", "");
			if(pages[hash])
				pages[hash].display();
		});
	};

	return {
		"model": model
	};
})();
