// ---------------------------------------------
// OPENING SEQUENCE
// ---------------------------------------------

document.getElementById('menu').style.display = 'none';

var response = document.getElementById('response');
var answer = document.createElement("p");
answer.id = "answerbubble";

var intro = function() {
	answer.innerHTML = "Hey there!";
	response.appendChild(answer);
	menuAppear();
};

var menuAppear = function() {
	document.getElementById('menu').style.display = 'inline';
	var popUp = setTimeout(function(){document.getElementById("menu").style.height = "100px";},1000);
	var popDown = setTimeout(function(){document.getElementById("menu").style.height = null;},3000);
};

// ---------------------------------------------
// D3 SETUP
// ---------------------------------------------

var diameter = 500,
	format = d3.format(",d");

var pack = d3.layout.pack()
    .size([diameter - 4, diameter - 4])
	.padding(2)
    .value(function(d) {return d.boop;});

var svg = d3.select("svg")
    .attr("width", diameter)
    .attr("height", diameter);
	
// ---------------------------------------------
// D3 DRAW
// ---------------------------------------------

var draw_data = function(filename) {

	d3.json(filename, function(error, root) {
	
	var node = svg.datum(root).selectAll(".node")
	      .data(pack.nodes);

// enter --------------------------------------

	var enter = node.enter().append("g")
	  	  .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
		  .on('click', function(d, i) {
			  if (d.url === "x") {
			  } else {
				window.open(d.url, '_blank')
			  }; 
			  })
		  .on('mouseover', function(d, i) {
			  if (d.url === "x") {
			  } else {
				  var selection = d3.select(this).style("cursor", "pointer");
				  selection.select("g").style("cursor", "pointer");
			  };
			  });
			
	  	enter.append("circle")
	  		.attr("r", 0)
	   		.style("fill", function(d) { return d.color; })
			.style("fill-opacity", function(d) {return d.opacity;})
	  		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		
		enter.append("text")
			.style("fill-opacity", 0)
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			
		enter.select("text").filter(function(d) { return !d.children; })
			.attr("dy", ".3em")
			.style("text-anchor", "middle")
			.style("font-size", function(d) {return d.fontsize;})
			.text(function(d) { return d.name; });									

// transition ----------------------------------
	
	 var transit = node.transition()
 	 		.attr("class", function(d) { return d.children ? "node" : "leaf node"; });
	 
	 	transit.select("circle")
	 		.duration(750)
	 		.attr("r", function(d) {return d.r;})
	 		.style("fill-opacity", function(d) {return d.opacity;})
	 		.style("fill", function(d) { return d.color; })
	 		.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
			.each(pulse);
	
	function pulse() {
			var circle = node.transition().select("circle").filter(function(d) { return !d.children; });
			function repeat() {
				circle = circle.transition()
					.duration(300)
					.attr("r", function(d) {return d.r-2;})
					.transition()
					.duration(600)
					.attr("r", function(d) {return d.r;})
					.ease('sine')
					.each("end", repeat);
			};
			repeat();
	};
	  
		transit.select("text")
			.style("fill-opacity", 0);
			
		transit.select("text").filter(function(d) { return !d.children; })
			.duration(750)
			.attr("dy", ".3em")
			.style("text-anchor", "middle")
			.style("font-size", function(d) {return d.fontsize;} )
			.text(function(d) { return d.name;} )
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
			.style("fill-opacity", 1);

// exit ----------------------------------------

	 var exit = node.exit()
 	  		.attr("class", function(d) { return d.children ? "node" : "leaf node"; });
	 
	 	 exit.select("circle")
  	    	.transition()
  	    	.duration(750)
  	    	.attr("r", 0);

	  	exit.select("text")
	  	    .transition()
	  	    .duration(750)
			.style("fill-opacity", 0);
		  
	});
};

// ---------------------------------------------
// MENU AND BUTTONS
// ---------------------------------------------

var activequestion = document.getElementById('activequestion');
var speech = document.createElement("button");
speech.id = "speechbubble";

var whoFunction = function() {
	activequestion.lastChild.remove();
   	speech.innerHTML = "who are you?";
	activequestion.appendChild(speech);
	response.lastChild.remove();
	document.getElementById('response').style.left = null;
	answer.innerHTML = "I'm Alex. Nice to meet you!";
	setTimeout(function(){draw_data("json/alexwho.json");}, 100);
	setTimeout(function(){response.appendChild(answer);}, 1000);
};

var whatFunction = function() {
	activequestion.lastChild.remove();
   	speech.innerHTML = "what do you do?";
	activequestion.appendChild(speech);
	response.lastChild.remove();
	document.getElementById('response').style.left = null;
	answer.innerHTML = "I do a bunch of things";
   	setTimeout(function(){draw_data("json/alexwhat.json");}, 100);
	setTimeout(function(){response.appendChild(answer);}, 1000);
};

var howFunction = function() {
	activequestion.lastChild.remove();
  	speech.innerHTML = "how do you work?";
	activequestion.appendChild(speech);
	response.lastChild.remove();
	document.getElementById('response').style.left = "350px";
	answer.innerHTML = "My toolbox";
   	setTimeout(function(){draw_data("json/alexhow.json");}, 100);
	setTimeout(function(){response.appendChild(answer);}, 1000);
};
  
var otherFunction = function() {
	activequestion.lastChild.remove();
  	speech.innerHTML = "I have another question";
	activequestion.appendChild(speech);
	response.lastChild.remove();
	document.getElementById('response').style.left = null;
	answer.innerHTML = "Drop me a line at hello@alexgarkavenko.com";
   	setTimeout(function(){draw_data("json/alexwho.json");}, 100);
	setTimeout(function(){response.appendChild(answer);}, 1000);
};