import * as d3 from 'd3'
import JSONFormatter from 'json-formatter-js'

// ************
// *** Main ***
// ************

var i = 0
var duration = 500
var root
var treemap

var hSlider = 10
var vSlider = 10

var margin = { top: 100, right: 100, bottom: 100, left: 100 }
var width = 1000 - margin.right - margin.left
var height = 960 - margin.top - margin.bottom

/** Update the state/ props for a selected node */
const updatePanelRev = (state, props) => {
  console.log('update panel')
  const stateNode = document.getElementById('state')
  const propsNode = document.getElementById('props')

  // state
  const stateFormatter = new JSONFormatter(state, 1, {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 10,
    hoverPreviewFieldCount: 5,
    animateOpen: true,
    animateClose: true
  })

  // props
  const propsFomatter = new JSONFormatter(props, 1, {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewFieldCount: 5,
    animateOpen: true,
    animateClose: true
  })

  stateNode.innerHTML = ''
  propsNode.innerHTML = ''

  if (state == null || state == undefined) {
    stateNode.appendChild(document.createTextNode('None'))
  } else {
    stateNode.appendChild(stateFormatter.render())
  }

  if (props == null || props == undefined) {
    propsNode.appendChild(document.createTextNode('None'))
  } else {
    propsNode.appendChild(propsFomatter.render())
  }

  $.each($('.json-formatter-string'), (index, val) => {
    let text = $(val).text()
    if (text.slice(1, 9) === 'function') {
      $(val).text("fn()")
      $(val).hover(function () {
        $(this).text(text)
      }, function () {
        $(this).text("fn()")
      })
    }
  })
}

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

// slider

// was the slider used?
d3.select("#vSlider").on("input", () => {
  let val = document.querySelector('#vSlider').value
  vSlider = val
  update()
});

d3.select("#hSlider").on("input", () => {
  let val = document.querySelector('#hSlider').value
  hSlider = val
  update()
});


var zoom = d3.zoom()
  .scaleExtent([0.05, 2])
  .on("zoom", zoomed);

var svg = d3.select('.tree')
  .append("div")
  .classed("svg-container", true) //container class to make it responsive
  .append("svg")
  //responsive SVG needs these 2 attributes and no width and height attr
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 " + height + " " + width)
  //class to make it responsive
  .classed("svg-content-responsive", true)
  .call(zoom)
  .append('g')

const xPos = width / 2
const yPos = height / 6
var transform = d3.zoomIdentity
  .translate(xPos, yPos)
  .scale(1)

d3.select('svg').transition().duration(750).call(zoom.transform, transform)

// *************
// * Functions *
// *************

function zoomed() {
  svg.attr('transform', d3.event.transform)
  // slider.property('value', d3.event.scale)
}

function update(source) {
  console.log('Updating Tree with current source...', source)

  treemap = d3.tree()
    .nodeSize([hSlider * 5, hSlider * 5])

  // Creates a curved (diagonal) path from parent to the child nodes
  const diagonal = (s, d) => {
    const path = 'M' + s.x + ',' + s.y
      + 'C' + s.x + ',' + (s.y + d.y) / 2
      + ' ' + d.x + ',' + (s.y + d.y) / 2
      + ' ' + d.x + ',' + d.y
    return path
  }

  // Toggle children on click.
  const click = d => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    d3.selectAll("text").attr("class", "text");
    update(d);
  }

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants()
  var links = treeData.descendants().slice(1)

  // Normalize for fixed-depth.
  nodes.forEach(d => { d.y = d.depth * vSlider * 10 }); // magic number is distance between each node

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
    .data(nodes, d => d.data.id);

  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr('transform', d => 'translate(' + source.x + ',' + source.y + ')')
    .remove();

  var nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr('transform', d => 'translate(' + source.x0 + ',' + source.y0 + ')')
    .on('click', click)

  // Add Circle for the nodes
  nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('r', 5)
    .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
    .style('pointer-events', 'visible')

    .on("mouseover", function (d) {
      d3.select(this)
        .style("stroke-width", 5)
        .style("stroke", "red");


      updatePanelRev(d.data.state, d.data.props)
      $.each($('.breadcrumb-item'), (index, val) => {
        if ($(val).text() === d.data.name) {
          $(val).css('color', '#B30089')
        } else if ($(val).text().slice(0, $(val).text().indexOf('[')) == d.data.name) {
          $(val).css('color', '#B30089')
        } else {
          $(val).css('color', '#0275d8')
        }
      })
    })

    .on("mouseout", function () {
      d3.select(this)
        .style("stroke-width", 1)
        .style("stroke", "black");
    })




  // Add labels for the nodes
  nodeEnter.append('text')
    .attr('dy', '.35em')
    .attr('y', d => d.children || d._children ? -24 : 24)
    .attr('text-anchor', 'middle')
    .text(d => d.data.name)

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
    .attr('cursor', 'pointer');    // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);


  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************
  // Update the links...
  var link = svg.selectAll('path.link')
    .data(links, d => d.data.id);

  // Enter any new links at the parent's previous position.
  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', 'g')
    .attr('class', 'link')
    .attr('d', d => {
      var o = { x: source.x0, y: source.y0 }
      return diagonal(o, o)
    })
  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
    .duration(duration)
    .attr('d', d => diagonal(d, d.parent));

  // Remove any exiting links
  var linkExit = link.exit().transition()
    .duration(duration)
    .attr('d', d => {
      var o = { x: source.x, y: source.y }
      return diagonal(o, o)
    })
    .remove();

  // Store the old positions for transition.
  nodes.forEach(d => {
    d.x0 = d.x;
    d.y0 = d.y;
  })
}

export function drawChart(treeData) {
  // declares a tree layout and assigns the size
  treemap = d3.tree()
    .size([height - 500, width - 500])
  // gi.nodeSize([30, 30])
  // Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, d => d.children);
  root.x0 = height - 500 / 2;
  root.y0 = 0;
  update(root);

  // const loadingdiv = document.querySelector('.loading')
  // const tree = document.querySelector('.tree')
  // // // loadingdiv.innerHTML = ""
  // tree.classList.remove("loading");

  $('.loading').remove()
  console.log("deleted")
}
