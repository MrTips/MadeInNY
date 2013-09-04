window.onload=function(){

var ny = { label: 'New York', pct: [6, 94, 22, 19, 8, 26, 10, 10] },
    sv = { label: 'Silicon Valley',   pct: [1, 117, 15, 9, 5, 32, 4, 16] },

    data = ny;

var labels = ['Fash.', 'Tech', 'Advert.', 'eComm.', 'Fin.', 'Other', 'Edu.', 'Enter.'];

var w = 320,                       // width and height, natch
    h = 320,
    r = Math.min(w, h) / 2,        // arc radius
    dur = 750,                     // duration, in milliseconds
    color = d3.scale.category20c(),
    donut = d3.layout.pie().sort(null),
    arc = d3.svg.arc().innerRadius(r - 70).outerRadius(r - 20);

// ---------------------------------------------------------------------
var svg = d3.select("#donut").append("svg:svg")
    .attr("width", w).attr("height", h);

var arc_grp = svg.append("svg:g")
    .attr("class", "arcGrp")
    .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

var label_group = svg.append("svg:g")
    .attr("class", "lblGroup")
    .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

// GROUP FOR CENTER TEXT
var center_group = svg.append("svg:g")
    .attr("class", "ctrGroup")
    .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

// CENTER LABEL
var pieLabel = center_group.append("svg:text")
    .attr("dy", ".35em").attr("class", "chartLabel")
    .attr("text-anchor", "middle")
    .text(data.label);

// DRAW ARC PATHS
var arcs = arc_grp.selectAll("path")
    .data(donut(data.pct));
arcs.enter().append("svg:path")
    .attr("stroke", "white")
    .attr("stroke-width", 0.5)
    .attr("fill", function(d, i) {return color(i);})
    .attr("d", arc)
    .each(function(d) {this._current = d});

// DRAW SLICE LABELS
var sliceLabel = label_group.selectAll("text")
    .data(donut(data.pct));
sliceLabel.enter().append("svg:text")
    .attr("class", "arcLabel")
    .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .text(function(d, i) {return labels[i]; });


// Store the currently-displayed angles in this._current.
// Then, interpolate from this._current to the new angles.
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}



// update chart
function updateChart(model) {
    data = eval(model); // which model?

    arcs.data(donut(data.pct)); // recompute angles, rebind data
    arcs.transition().ease("elastic").duration(dur).attrTween("d", arcTween);

    sliceLabel.data(donut(data.pct));
    sliceLabel.transition().ease("elastic").duration(dur)
        .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
        .style("fill-opacity", function(d) {return d.value==0 ? 1e-6 : 1;});

    pieLabel.text(data.label);
}


// click handler
$("#category a").click(function() {
    updateChart(this.href.slice(this.href.indexOf('#') + 1));
});

};