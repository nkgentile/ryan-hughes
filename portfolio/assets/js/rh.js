"use strict";

var RJH = (function(){
	var page, sections, modules; 
	modules = {
		"carousel": function(model){
			var carousel, container, images, index, nArrow, pArrow, next, prev, go;

			carousel = document.createElement("div");
			carousel.classList.add("carousel");
			this.appendChild(carousel);

			nArrow = document.createElement("div");
			nArrow.classList.add("arrow");
			nArrow.id = "next";
			nArrow.style.backgroundImage = "url(assets/svg/next.svg)";
			nArrow.addEventListener("click", function(){
				next();
			});
			nArrow.addEventListener("mouseenter", function(){
				this.classList.toggle("active");
			});
			nArrow.addEventListener("mouseleave", function(){
				this.classList.toggle("active");
			});
			carousel.appendChild(nArrow);

			pArrow = document.createElement("div");
			pArrow.classList.add("arrow");
			pArrow.id = "prev";
			pArrow.style.backgroundImage = "url(assets/svg/prev.svg)";
			pArrow.addEventListener("click", function(){
				prev();
			});
			pArrow.addEventListener("mouseenter", function(){
				this.classList.toggle("active");
			});
			pArrow.addEventListener("mouseleave", function(){
				this.classList.toggle("active");
			});

			carousel.appendChild(pArrow);

			images = [];
			model.images.forEach(function(img, i){
				var card, image, caption;
				image = new Image();
				image.src = "assets/img/" + img;
				
				card = document.createElement("div");
				card.style.backgroundImage = "url("+image.src+")";
				card.addEventListener("click", function(){
					next();
				});
				card.classList.add("card");
				if(!i)
					card.classList.add("active");
				carousel.appendChild(card);
				images.push(card);

				caption = document.createElement("div");
				caption.classList.add("caption");
				caption.innerHTML = model.captions[i];
				card.appendChild(caption);

			});

			index = 0;
			next = function(){
				images[index].classList.toggle("active");
				if(index === model.images.length-1)
					index = 0;
				else
					index++;
				images[index].classList.toggle("active");
				go();
			};

			prev = function(){
				images[index].classList.toggle("active");
				if(index === 0)
					index = images.length-1;
				else
					index--;
				images[index].classList.toggle("active");
				go();
			};

			go = function(){
			};

			return {
				"next": next,
				"prev": prev
			};
		}
	};
	sections = {
		"brief bio": function(){
			var bio;
			this.style.backgroundImage = "url(assets/svg/bio.svg)";
			bio = document.createElement("div");
			bio.id = "bio";
			this.appendChild(bio);
		},
		"architecture": function(){
			this.style.backgroundImage = "url(assets/svg/architecture.svg)";
			return modules.carousel.call(this,{
				"images":[
					"splitisos.svg",
					"elevations.jpg",
					"floorplans.svg",
					"multimedia.jpg",
					"waveform.jpg",
					"colonymodel.jpg",
					"Handisos.jpg",
					"model1.jpg",
					"model2.jpg",
					"model3.jpg",
					"model4.jpg",
					"model5.jpg",
					"model6.jpg"
				],
				"captions":[
					"Split isometric drawing of a 55 x 55 x 20\' structure with internal and external circulation plan, Illustrator ",
					"Two elevations of the same structure with silhouettes of a colony in the background, Illustrator ",
					"Second- and ground-floor plans of structure with surrounding extruded colony geometries, Illustrator",
					"Multimedia board (lead drawings on 30 x 22\" hot press and 5.5 x 5.5 x 2\" deconstructed birch model) of structure within colony along with original geometries used to create colony",
					"Waveform mesh for colony roof, Rhino + Grasshopper",
					"15 x 22 x 4\" model of half the colony, museum board",
					"Hand-drawn isocurves, lead on 8.5 x 11\" trace",
					"11 x 11 x 4\" (1/5\" = 1\' scale) model in laser-cut birch, red-lined test model",
					"11 x 11 x 4\" (1/5\" = 1\' scale) model in laser-cut birch, final with white lacquer",
					"11 x 11 x 4\" (1/5\" = 1\' scale) model in laser-cut birch, red-lined test model",
					"11 x 11 x 4\" (1/5\" = 1\' scale) model in laser-cut birch, final with white lacquer",
					"11 x 11 x 4\" (1/5\" = 1\' scale) model in laser-cut birch, red-lined test model",
					"11 x 11 x 4\" (1/5\" = 1\' scale) model in laser-cut birch, final with white lacquer"
				]
			});
		},
		"drawings": function(){
			this.style.backgroundImage = "url(assets/img/trace.jpg)";
			return modules.carousel.call(this,{
				"images": [
					"smoke.jpg",
					"smoke2.svg",
					"smoke3.svg",
					"smoke4.svg",
					"smoke5.svg",
					"smoke6.svg",
					"nudestudy.jpg",
					"venus.jpg",
					"venusgeometries.svg",
					"eames.jpg",
					"lavender.jpg",
					"nudestudy.jpg"
				],
				"captions": [
					"1-hour study of Tony Smith\'s “Smoke,\" charcoal and lead on 18 x 24\" hot press",
					"Extruded geometry from \"Smoke\" study",
					"Extruded geometry from \"Smoke\" study",
					"Extruded geometry from \"Smoke\" study",
					"Extruded geometry from \"Smoke\" study",
					"Extruded geometry from \"Smoke\" study",
					"Nude study, lead and pastel on 12 x 18\" hot press",
					"Study of the Venus de Milo, silhouettes and imagined sectional cuts, pen on 14 x 9 “ quad-ruled notebook paper",
					"Illustrator-extracted geometries of Venus study",
					"Study of Charles and Ray Eames\' 1943 plywood sculpture, lead on 18 x 24\" bristol with pastel-textured cutouts",
					"Life-cycle of a lavender plant, watercolor on 12 x 18\" newsprint",
					"Nude study, lead and pastel on 12 x 18\" hot press"
				]
			});
		},
		"landscape design": function(){
			this.style.backgroundImage = "url(assets/img/woodgrain.jpg)";
			return modules.carousel.call(this,{
				"images": [
					"Garden.JPG",
					"front.jpg",
					"frontdetail.jpg",
					"back.jpg"
				],
				"captions": [
					"20 x 30\' garden in my apartment\'s shared outdoor area that I helped to redesign exlusively with drought-tolerant plants",
					"Front yard first draft, lead and colored pencil on trace",
					"Front yard second draft, lead and colored pencil on trace",
					"Back yard, lead on trace"
				]
			});
		},
		"portraits": function(){
			this.style.backgroundImage = "url(assets/img/portraiture.jpg)";
			return modules.carousel.call(this,{
				"images": [
					"meganwatercolor.jpg",
					"katherine.jpg",
					"katherine.svg",
					"autoportrait.jpg"
				],
				"captions": [
					"Portrait of my sister, watercolor on 18 x 24” hot press",
					"Portrait of my aunt, watercolor on 12 x 18” hot press",
					"Extruded line drawing, Illustrator",
					"Self-portrait, watercolor on 12 x 18” hot press"
				]
			});

		},
		"graphic design": function(){
			this.style.backgroundImage = "url(assets/img/graphicdesign.png)";
			return modules.carousel.call(this,{
				"images": [
					"homepage.png",
					"cheposter.jpg",
					"cheflyer.png",
					"csw.svg",
					"lala.png"
				],
				"captions": [
					"Homepage of my website (rjhughes.info), with vector animation of Place Colbert, Rochefort, France",
					"Poster for an academic conference, 18 x 24\"",
					"Front/back of a 3.75 x 8.25\" flyer for same academic conference",
					"Promotional web-comic for an academic conference, Illustrator",
					"Two-page comic published in LaLaLand (http://lalaland.club/) about my favorite place in LA"
				]
			});
		},
		"writing samples": function(){
			this.style.backgroundImage = "url(assets/img/word.png)";
			return modules.carousel.call(this,{
				"images": [
					"Adrift.png",
					"Stupeur.png",
					"Eroding.png",
					"Descartes.png",
					"Femme-Dragon.png"
				],
				"captions": [
					"To read the full paper, click here",
					"To read the full paper, click here",
					"To read the full paper, click here",
					"To read the full paper, click here",
					"To read the full paper, click here"
				]
			});
		},
		"concept art": function(){
			return modules.carousel.call(this,{
				"images": [
					"writehere.png",
					"viralthermometer.png"
				],
				"captions": [
					"Concept art for a project tracking disposable pens, Illustrator",
					"Concept art for a social media tracker, Illustrator"
				]
			});
		}
	};
	page = (function(){
		var buffer, titles, cards, index, nav, go, prev, next, nodes, route;
		buffer = new DocumentFragment();
		cards = [];
		nav = document.createElement("nav");
		buffer.appendChild(nav);
		nodes = [];
		titles = [
			"brief bio",
			"architecture",
			"drawings",
			"landscape design",
			"portraits",
			"graphic design",
			"writing samples",
			"concept art"
		];
		titles.forEach(function(e, i){
			var node, name, point, card, title;
			node = document.createElement("div");
			node.classList.add("node");
			node.index = i;
			node.addEventListener("click", function(){
				go(this.index);
			});
			if(!i)
				node.classList.add("active");
			nodes.push(node);

			point = document.createElement("div");
			point.classList.add("point");
			node.appendChild(point);

			name = document.createElement("span");
			name.classList.add("name");
			name.textContent = e;
			node.appendChild(name);

			nav.appendChild(node);

			card = document.createElement("section");
			if(i === 0)
				card.classList.add("active");
			card.index = i;
			card.addEventListener("mousewheel", function(e){
				if(e.wheelDelta < 0){
					if(this.index===cards.length-1)
						return;
					go(this.index+1);
				}
				if(e.wheelDelta > 0){
					if(this.index===0)
						return;
					go(this.index-1);
				}
			});
			cards.push(card);
			buffer.appendChild(card);
			
			title = document.createElement("h1");
			title.textContent = e;
			title.classList.add("title");
			card.appendChild(title);

			card.carousel = sections[e].call(card);
		});
		
		route = function(){
			if(!location.hash)
				location.hash = "brief_bio";
			var hash;
			hash = location.hash;
			hash = hash.replace("_", " ");	
			hash = hash.replace("#", "");
			for(var i=titles.length; i--;){
				if(hash === titles[i]){
					go(i);
					index = i;
				}
			}
		};
		window.addEventListener("load", function(){
			document.body.appendChild(buffer);
			route();
		});
		window.addEventListener("hashchange", function(e){
			route();
		});
		window.addEventListener("keydown", function(e){
			if(e.keyCode === 38){
				if(index === 0)
					return;
				go(index-1);	
			}
			if(e.keyCode === 40){
				if(index === cards.length-1)
					return;
				go(index+1);
			}
			if(e.keyCode === 39){
				cards[index].carousel.next();
			}
			if(e.keyCode === 37){
				cards[index].carousel.prev();
			}
		},true);

		go = function(n){
			location.hash = titles[n].replace(" ", "_");
			for(var i=0, len=cards.length; i<len; i++){
				if(i>n)
					cards[i].classList.remove("active");
				if(i<=n)
					cards[i].classList.add("active");
				nodes[i].classList.remove("active");
				nodes[n].classList.add("active");
			}
			index = n;
		};
	}());
}());
