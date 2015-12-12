"use strict";
var init;
init = function(){
	var color, animate, element, elements;
	element = function(id, o, step){
		var e, path;
		e = document.getElementById(id);
		path = e.getElementsByTagName("path");
		return {
			e: e,
			path: path,
			index: 0,
			step: step,
			o: o 
		};
	};
	elements = [
		element("Color", 0.5, 80),
		element("Lines", 1, 1)
	];
	animate = (function(){
		var element, opacity, index, fadeIn;
		opacity = 0;
		index = 0;
		element = elements[index];
		fadeIn = function(){
			if(opacity < 1){
				opacity += element.o;
				for(var i=0, len=element.step, p; i<len; i++){
					p = element.path[element.index+i];
					if(p !== undefined)
						p.style.opacity = opacity;
				}
				return requestAnimationFrame(fadeIn);
			} else{
				opacity = 0;
				if(element.index > element.path.length){
					if(index < elements.length){
						element = elements[index++];
						return requestAnimationFrame(fadeIn);
					} else
						return console.log("Done!");
					//console.log(element);
				}
				element.index+=element.step;
				//console.log(element.index);
				return requestAnimationFrame(fadeIn);
			}
		};
		return requestAnimationFrame(fadeIn);
	}());
};
window.addEventListener("load", init);
