"use strict";

var RJH = (function(){
	var page, sections; 
	sections = {
		"brief bio": function(){
			var bio;
			this.style.backgroundImage = "url(assets/svg/bio.svg)";
			bio = document.createElement("div");
			bio.id = "bio";
			this.appendChild(bio);
		},
		"drawing": function(){
		},
		"portraiture": function(){
			this.style.backgroundImage = "url(assets/img/portraiture.jpg)";
		},
		"architecture": function(){
			this.style.backgroundImage = "url(assets/svg/architecture.svg)";
		},
		"graphic design": function(){
		},
		"concept art": function(){
		},
		"writing sample": function(){
		}
	};
	page = (function(){
		var buffer, cards, index, nav, nodes, next, prev, go;
		buffer = new DocumentFragment();
		cards = [];
		nav = document.createElement("nav");
		buffer.appendChild(nav);
		nodes = [];
		[
			"brief bio",
			"drawing",
			"portraiture",
			"architecture",
			"graphic design",
			"concept art",
			"writing sample"
		].forEach(function(e, i){
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
			card.addEventListener("wheel", function(e){
				if(e.deltaY === 1){
					if(this.index===cards.length-1)
						return;
					go(this.index+1);
				}
				if(e.deltaY === -1){
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

			sections[e].call(card);

		});
		window.addEventListener("load", function(){
			document.body.appendChild(buffer);
		});

		go = function(index){
			for(var i=0, len=cards.length; i<len; i++){
				if(i>index)
					cards[i].classList.remove("active");
				if(i<=index)
					cards[i].classList.add("active");
				nodes[i].classList.remove("active");
				nodes[index].classList.add("active");
			}
		};
	}());
}());
