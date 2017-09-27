import * as d3 from 'd3'

var i = 0
var duration = 500
var root
var treemap
var squares = false

// squares
var rectW = 120
var rectH = 30

/**
 * Flatten an object into a string. The key: value will be
 * appended to a string to be presented on the tooltip
 * @param {object} item
 */
const flatten = (item, stringArr) => {
  const keys = Object.keys(item);
  keys.forEach(key => {
    const value = item[key]

    // bad -> return
    if (value == null || value == undefined) return
    // empty object -> return
    if (Object.keys(value).length === 0 && value.constructor === Object) return

    // if object
    if (typeof value === 'object') flatten(value, stringArr)

    // console.log('VALUE', value)
    if (String(value).includes('function')) {
      stringArr.push(`${key}: function<br />`)
    }
    else stringArr.push(`${key}: ${value}<br />`)
  })
}

/** Update the state/ props for a selected node */
const updatePanel = (stateString, propsString) => {
  console.log('stateString    ', stateString)
  console.log('propsString    ', propsString)
  stateString = stateString.replace(/<br ?\/?>/g, "\n") // convert <br /> to \n
  propsString = propsString.replace(/<br ?\/?>/g, "\n") // convert <br /> to \n
  document.getElementById('state').innerText = stateString
  document.getElementById('props').innerText = propsString
}

<<<<<<< HEAD
/** Update the state/ props for a selected node */
const updatePanelRev = (state) => {
  document.getElementById('state').innerText = JSON.stringify(state)
}

=======
/**
 *  CIRCLE NODES
 *
 */
>>>>>>> a9ff5cc2424e4681366ea16976a2c0dca5c7dbd4

var margin = { top: 50, right: 50, bottom: 50, left: 50 },
  width = 1000 - margin.right - margin.left,
  height = 960 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

var svg = d3.select('.tree').append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .call(d3.zoom().on('zoom', () => {
    svg.attr('transform', d3.event.transform)
  }))
  .on('dblclick.zoom', null)

  //container class to make it responsive
  // .classed("svg-container", true)
  // .attr("preserveAspectRatio", "xMinYMin meet")
  // .attr("viewBox", "0 0 1200 800")
  .append('g')
// more responsive code
// .classed("svg-content-responsive", true)
// .attr("transform", d => "translate(528,71) scale(1)")

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

  var tooltip = d3.select('.tree').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    // allow mouse events on tool tips for scrolling
    .on('mouseout', d => {
      console.log('OFF TOOLTIP')
      tooltip.transition()
        .duration(250)
        .style('opacity', 0)
        .style('width', '1px')
        .style('height', '1px')
    })
    // add click handler
    .on('click', () => {
      // updatePanelRev(d.data.state)
      // updatePanel(tooltip.stateString, tooltip.propsString)
    })

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
      // add mouse over handler
      .on('mouseover', d => {
        let stateString = ['State:<br />']
        let propsString = ['Props:<br />']
        tooltip.d = d
        tooltip.transition()
          .duration(250) // animation time
          .style('opacity', .9)
          .style('width', '200px')
          .style('height', '80px')

        // Get the state
        if (!d.data.state) stateString += ' null'
        else if (typeof d.data.state === 'object') {
          flatten(d.data.state, stateString);
          stateString = stateString.join('');
        }
        tooltip.stateString = stateString

        // Get the props
        if (!d.data.props) propsString += ' null'
        else if (typeof d.data.props === 'object') {
          flatten(d.data.props, propsString);
          propsString = propsString.join('');
        }
        tooltip.propsString = propsString

        tooltip.html(
          'Name: ' + d.data.name + '<br />' +
          'Level: ' + d.depth + '<br />'
          + stateString + '<br />'
          + propsString + "<br />"
        )
          // position of tooltip on page
          .style('left', (d3.event.pageX + 10) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
      })

  }
  else {
    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 5)
      .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
      .style('pointer-events', 'visible')

      // add mouse over handler
      .on('mouseover', d => {
        updatePanelRev(d.data.state)
        
        let stateString = ['State:<br />']
        let propsString = ['Props:<br />']
        tooltip.d = d
        tooltip.transition()
          .duration(250) // animation time
          .style('opacity', .9)
          .style('width', '200px')
          .style('height', '80px')

        // Get the state
        if (!d.data.state) stateString += ' null'
        else if (typeof d.data.state === 'object') {
          flatten(d.data.state, stateString);
          stateString = stateString.join('');
        }
        tooltip.stateString = stateString

        // Get the props
        if (!d.data.props) propsString += ' null'
        else if (typeof d.data.props === 'object') {
          flatten(d.data.props, propsString);
          propsString = propsString.join('');
        }
        tooltip.propsString = propsString

        tooltip.html(
          'Name: ' + d.data.name + '<br />' +
          'Level: ' + d.depth + '<br />'
          + stateString + '<br />'
          + propsString + "<br />"
        )
          // position of tooltip on page
          .style('left', (d3.event.pageX + 10) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
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
  }
  else {
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
      .attr('cursor', 'pointer');
  }

  if (squares) {
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
    // On exit reduce the node circles size to 0
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
      // .size([height, width])
      .nodeSize([rectW, rectH])
      .separation((a, b) => a.parent === b.parent ? 1 : .25)
  }
  else treemap = d3.tree().size([height, width]);

  // Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, d => d.children);
  root.x0 = height / 2;
  root.y0 = 0;
  update(root);
<<<<<<< HEAD
}
=======
}

/**
 * SQUARES
 *
 */

// var margin = { top: 20, right: 120, bottom: 20, left: 120 }
// var width = 960 - margin.right - margin.left
// var height = 800 - margin.top - margin.bottom

// // append the svg object to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin

// d3.select('.tree').selectAll('*').remove();

// var svg = d3.select('.tree').append('svg')
//   .classed("svg-container", true) //container class to make it responsive
//   .attr("preserveAspectRatio", "xMinYMin meet")
//   .attr("viewBox", "0 0 1200 800")
//   .append("g")
//   .classed("svg-content-responsive", true)
//   .attr("transform", d => "translate(528,71) scale(1)")

// d3.select('.tree')
//   .call(d3.zoom().on("zoom", function () {
//     svg.attr("transform", d3.event.transform)
//   })
//     .scaleExtent([1, 8]))

// export function drawChart(treeData) {
//   var i = 0
//   var duration = 750
//   var root
//   var rectW = 120
//   var rectH = 30

//   // declares a tree layout and assigns the size
//   var treemap = d3.tree()
//     // .size([height, width])
//     .nodeSize([rectW, rectH])
//     .separation(function (a, b) { return a.parent === b.parent ? 1 : .25 })

//   // Assigns parent, children, height, depth
//   root = d3.hierarchy(treeData, function (d) { return d.children; })
//   root.x0 = height / 2
//   root.y0 = 0;

//   update(root);

//   function update(source) {

//     // Assigns the x and y position for the nodes
//     var treeData = treemap(root)

//     // Compute the new tree layout.
//     var nodes = treeData.descendants()
//     var links = treeData.descendants().slice(1)

//     // Normalize for fixed-depth.
//     nodes.forEach(function (d) { d.y = d.depth * 60 }); // magic number is distance between each node

//     // ****************** Nodes section ***************************

//     // Update the nodes...
//     var node = svg.selectAll('g.node')
//       .data(nodes, d => d.id)

//     // Remove any exiting nodes
//     var nodeExit = node.exit().transition()
//       .duration(duration)
//       .attr("transform", d => "translate(" + source.x + "," + source.y + ")")
//       .remove();

//     // Enter any new modes at the parent's previous position.
//     var nodeEnter = node.enter().append('g')
//       .attr('class', 'node')
//       .attr("transform", d => "translate(" + source.x0 + "," + source.y0 + ")")
//       .on('click', click)

//     var div = d3.select("body").append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0);

//     nodeEnter.append('rect')
//       .attr("rx", 6)
//       .attr("ry", 6)
//       .attr('class', 'node')
//       .attr("width", rectW)
//       .attr("height", rectH)
//       .attr("transform", function (d) {
//         return "translate(" + (- (rectW / 2)) + "," + (-rectH) + ")";
//       })
//       .style("fill", function (d) {
//         return d._children ? "lightsteelblue" : "#59ABA8";
//       })

//       .style("pointer-events", "visible")
//       .on('click', function (d) {
//         let stateString = ['State:<br />']

//         if (!d.data.state) stateString += ' null'
//         else if (typeof d.data.state === 'object') {
//           flatten(d.data.state, stateString);
//           stateString = stateString.join('');
//         }
//         updateStatePanel(stateString)
//       })
//       .on("mouseover", function (d) {
//         console.log('data', d)
//         console.log('mouseover')
//         console.log('d', d.data.state)
//         div.transition()
//           .duration(1000)
//           .style("opacity", .9);

//         // let stateString = `State:<br />`
//         let stateString = ['State:<br />']
//         let propsString = ['Props:<br />']

//         if (!d.data.state) stateString += ' null'
//         else if (typeof d.data.state === 'object') {
//           flatten(d.data.state, stateString);
//           stateString = stateString.join('');
//         }

//         if (!d.data.props) propsString += ' null'
//         else if (typeof d.data.props === 'object') {
//           flatten(d.data.props, propsString);
//           propsString = propsString.join('');
//         }

//         console.log('STATE STRING: ', stateString)
//         console.log('PROPS STRING: ', propsString)

//         div.html(
//           "Name: " + d.data.name + "<br />" +
//           "Level: " + d.depth + "<br />" +
//           stateString + "<br />" +
//           propsString + "<br />"
//         )
//           .style("left", (d3.event.pageX) + "px")
//           .style("top", (d3.event.pageY - 28) + "px");
//       })
//       .on("mouseout", function (d) {
//         console.log('mouseout')
//         div.transition()
//           .duration(500)
//           .style("opacity", 0);
//       });

//     // Add labels for the nodes
//     nodeEnter.append('text')
//       .attr("x", 0)
//       .attr("y", -rectH / 2)
//       .attr("dy", ".35em")
//       .attr("text-anchor", "middle")
//       .text(d => d.data.name)

//     // UPDATE
//     var nodeUpdate = nodeEnter.merge(node);

//     // Transition to the proper position for the node
//     nodeUpdate.transition()
//       .duration(duration)
//       .attr("transform", function (d) {
//         return "translate(" + d.x + "," + d.y + ")";
//       });

//     // Update the node attributes and style
//     nodeUpdate.select('rect.node')
//       .attr("width", rectW)
//       .attr("height", rectH)
//       .attr('cursor', 'pointer');


//     // Remove any exiting nodes
//     var nodeExit = node.exit().transition()
//       .duration(duration)
//       .attr("transform", function (d) {
//         return "translate(" + source.x + "," + source.y + ")";
//       })
//       .remove();

//     // On exit reduce the node circles size to 0
//     nodeExit.select("rect")
//       .attr("width", rectW)
//       .attr("height", rectH)

//     // On exit reduce the opacity of text labels
//     nodeExit.select('text')
//       .style('fill-opacity', 1e-6);

//     // ****************** links section ***************************

//     // Update the links...
//     var link = svg.selectAll('path.link')
//       .data(links, d => d.id)

//     // Enter any new links at the parent's previous position.
//     var linkEnter = link.enter().insert('path', 'g')
//       .attr("class", "link")
//       .attr('x', rectW / 2)
//       .attr("y", rectH / 2)
//       .attr('d', d => {
//         var o = { x: source.x0, y: source.y0 }
//         return diagonal(o, o)
//       });

//     // UPDATE
//     var linkUpdate = linkEnter.merge(link);

//     // Transition back to the parent element position
//     linkUpdate.transition()
//       .duration(duration)
//       .attr('d', function (d) { return diagonal(d, d.parent) });

//     // Remove any exiting links
//     var linkExit = link.exit().transition()
//       .duration(duration)
//       .attr('d', function (d) {
//         var o = { x: source.x, y: source.y }
//         return diagonal(o, o)
//       })
//       .remove();

//     // Store the old positions for transition.
//     nodes.forEach(funcntion (d) {
//       d.x0 = d.x;
//       d.y0 = d.y;
//     });

//     // Creates a curved (diagonal) path from parent to the child nodes
//     function diagonal(s, d) {
//       let path = "M" + s.x + "," + s.y
//         + "C" + s.x + "," + (s.y + d.y) / 2
//         + " " + d.x + "," + (s.y + d.y) / 2
//         + " " + d.x + "," + d.y

//       return path
//     }

//     // Toggle children on click.
//     function click(d) {
//       if (d.children) {
//         d._children = d.children;
//         d.children = null;
//       } else {
//         d.children = d._children;
//         d._children = null;
//       }
//       update(d);
//     }
//   }
// }
>>>>>>> a9ff5cc2424e4681366ea16976a2c0dca5c7dbd4
