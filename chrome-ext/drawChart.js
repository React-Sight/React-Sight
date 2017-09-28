import * as d3 from 'd3'
import JSONFormatter from 'json-formatter-js'

var i = 0
var duration = 500
var root
var treemap
var squares = false

var onNode = false
var onTT = false

// squares
var rectW = 120
var rectH = 30

/** Update the state/ props for a selected node */
const updatePanelRev = (state, props) => {
  console.log('state: ', state)
  console.log('props: ', props)

  // state
  const formatter = new JSONFormatter(state, 1, {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewFieldCount: 5,
    theme: 'dark',
    animateOpen: true,
    animateClose: true
  })
  let node = document.getElementById('state')
  node.innerHTML = ''
  const text = document.createTextNode('State:\n')
  node.appendChild(text)
  node.appendChild(formatter.render())

  // props
  const propsFomatter = new JSONFormatter(props, 1, {
    hoverPreviewEnabled: false,
    hoverPreviewArrayCount: 100,
    hoverPreviewFieldCount: 5,
    theme: 'dark',
    animateOpen: true,
    animateClose: true
  })
  let propsNode = document.getElementById('props')
  propsNode.innerHTML = ''
  const propsText = document.createTextNode('Props:\n')
  propsNode.appendChild(propsText)
  propsNode.appendChild(propsFomatter.render())
}

var margin = { top: 50, right: 50, bottom: 50, left: 50 },
  width = 1000 - margin.right - margin.left,
  height = 960 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

var svg = d3.select('.tree').append('svg')
  .call(d3.zoom()
    .on('zoom', () => {
      svg.attr('transform', d3.event.transform)
    }))
  .on('dblclick.zoom', null)
  .attr("width", '100%')
  .attr("height", '100%')
  .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
  .attr('preserveAspectRatio', 'xMinYMin')
  .append("g")
  .attr("transform", "translate(" + Math.min(width/5, height/5) / 2 + "," + Math.min(width/5, height/5) / 2 + ")");

  console.log(`height: ${height}  width: ${width}`)
function update(source) {
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
    update(d);
  }

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants()
  var links = treeData.descendants().slice(1)

  // Normalize for fixed-depth.
  nodes.forEach(d => { d.y = d.depth * 60 }); // magic number is distance between each node

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
    .data(nodes, d => d.data.id);

  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr('transform', d => 'translate(' + source.x + ',' + source.y + ')')
    .remove();

  // Enter any new modes at the parent's previous position.
  if (squares) {
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", d => "translate(" + source.x0 + "," + source.y0 + ")")
      .on('click', click)
  }

  else {
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => 'translate(' + source.x0 + ',' + source.y0 + ')')
      .on('click', click)
  }

  if (squares) {
    nodeEnter.append('rect')
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('class', 'node')
      .attr('width', rectW)
      .attr('height', rectH)
      .style('fill', d => d._children ? 'lightsteelblue' : '#59ABA8')
      .attr("transform", d => 'translate(' + (- (rectW / 2)) + ',' + (-rectH) + ')')
      .style('pointer-events', 'visible')
  }
  else {
    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 5)
      .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
      .style('pointer-events', 'visible')
      .on('mouseover', (d) => {
        updatePanelRev(d.data.state, d.data.props)
      })
  }

  if (squares) {
    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("x", 0)
      .attr("y", -rectH / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(d => d.data.name)
  }
  else {
    // Add labels for the nodes
    nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('y', d => d.children || d._children ? -18 : 18)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name)
  }

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

  if (squares) {
    // Update the node attributes and style
    nodeUpdate.select('rect.node')
      .attr("width", rectW)
      .attr("height", rectH)
      .attr('cursor', 'pointer');
    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
      })
      .remove();
    // On exit reduce the node circles size to 0
    nodeExit.select("rect")
      .attr("width", rectW)
      .attr("height", rectH)

  }
  else {
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
      .attr('cursor', 'pointer');    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);
  }

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
    .data(links, d => d.data.id);

  if (squares) {
    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', 'g')
      .attr("class", "link")
      .attr('x', rectW / 2)
      .attr("y", rectH / 2)
      .attr('d', d => {
        var o = { x: source.x0, y: source.y0 }
        return diagonal(o, o)
      });
  }
  else {
    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .attr('d', d => {
        var o = { x: source.x0, y: source.y0 }
        return diagonal(o, o)
      });
  }
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
  });
}

export function drawChart(treeData) {
  // declares a tree layout and assigns the size
  if (squares) {
    // SQUARES declares a tree layout and assigns the size
    treemap = d3.tree()
      .nodeSize([rectW, rectH])
      .separation((a, b) => a.parent === b.parent ? 1 : .25)
  }
  else treemap = d3.tree().size([height, width]);

  // Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, d => d.children);
  root.x0 = height / 2;
  root.y0 = 0;
  update(root);
}
