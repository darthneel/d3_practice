
randomColor = function(){
  var el = crayola[Math.floor(Math.random()*crayola.length)]
  return el.hex
}


projectData = function(arr){

  var height = 650;
  var width = 900;

  var yScale = d3.scale.linear()
          .domain([0, d3.max(arr, function(obj){ return obj.age })])
          .range([height, 20])

  var xScale = d3.scale.linear()
    .domain([0, arr.length])
    .range([60, width])

  var colorScale = d3.scale.linear()
            .domain( [d3.min(arr, function(obj){ return obj.age }), d3.max(arr, function(obj){ return obj.age })] )
            .range(['#1abc9c', '#3498db'])        

  var tooltip = d3.select("body")
    .append("div")
    .attr('class', 'tip')

  var svg = d3.select('svg')
    .attr('height', height)
    .attr('width', width)
    .style('background-color', '#2c3e50')

  svg.selectAll('rect')
    .data(arr)
    .exit().remove()  

  svg.selectAll('rect')
    .data(arr)
      .enter().append('rect') 

  var bars = svg.selectAll('rect')
              .data(arr)
                .attr('height', 0)
                .attr('width', '50px')
                .attr('x', function(d, i){ return xScale(i) })
                .attr('y', function(d){ return height})
                .style('fill', 'white')
                .text("hello")
                .on('mouseover', function(d){ 
                  d3.select(this).style('fill', '#f1c40f');
                  return tooltip.style("visibility", "visible").text(d.name + ' is ' + d.age + ' years old.');
                })
                .on("mousemove", function(){
                  return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
                .on('mouseout', function(d) { 
                  d3.select(this).style('fill', function(d){ return colorScale(d.age) });
                  return tooltip.style("visibility", "hidden");
                })
                .transition()
                  .duration(function(){return Math.random()*2000})
                  .ease('bounce')
                  .attr('y', function(d){ return yScale(d.age) })
                  .attr('height', function(d){ return height - yScale(d.age)  })
                  .style('fill', function(d){ return colorScale(d.age) })

  svg.append("g")
    .attr('class', 'axis')
    .attr("transform", "translate(50,-5)")
    .attr('fill', 'white')
    .call(d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10)
      .tickFormat(d3.format("s")));

  svg.append("text")
    .attr("class", "y_label")
    .attr("text-anchor", "end")
    .attr("y", 15)
    .attr("x", -(height/2))
    .attr("transform", "rotate(-90)")
    .text("Age")
    .attr('fill', 'white')
    .style('font-size', 23)
  

}

window.onload = function(){


  var arr = [
    {name:"Yaniv", age:27},          
    {name:"Neel", age:15},          
    {name:"Nick", age:25},          
    {name:"Mitul", age:22},          
    {name:"Jeff", age:30},          
    {name:"Fritzy", age:24},
    {name:"Hari", age:20},
    {name:"Olivia", age:21},
    {name:"Sam", age:26},
    {name:"Crawford", age:34},

  ]

  projectData(arr);

}; 