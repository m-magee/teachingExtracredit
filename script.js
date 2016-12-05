var data = d3.range(500).map(d3.randomBates(15));

var svg = d3.select("svg"); //select svg from html
var width = svg.attr("width"); //get svg width
var height = svg.attr("height") - 50; //get svg height and subtract room for bottom bar
var g = svg.append("g");

// Convert data into histogram format
var bins = d3.histogram()
    (data);

// Create X Scale
var xScale = d3.scaleLinear()
    .rangeRound([0, width]);

//Create Y Scale
var y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })])
    .range([height, 0]);

//Start Bars
var bar = g.selectAll(".bar")
  .data(bins)
  .enter().append("g")
    .attr("transform", function(d) { return "translate(" + xScale(d.x0) + "," + y(d.length) + ")"; });

//Add rectanlges to bars
bar.append("rect")
    .attr("x", 1)
    .attr("width", 20)
    .attr("height", function(d) { return height - y(d.length); });