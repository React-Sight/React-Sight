// const d3 = require('d3')

// export function drawChart(treeData) {
//   // console.log('tree', treeData)
//   var margin = {
//     top: 20,
//     right: 120,
//     bottom: 20,
//     left: 120
//   },
//     width = 960 - margin.right - margin.left,
//     height = 800 - margin.top - margin.bottom;  // append the svg object to the body of the page
//   // appends a 'group' element to 'svg'
//   // moves the 'group' element to the top left margin

//   d3.select(".tree").selectAll("*").remove();

//   var svg = d3.select(".tree").append("svg")
//     .classed("svg-container", true) //container class to make it responsive
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     .attr("viewBox", "0 0 1200 800")
//     .append("g")
//     .classed("svg-content-responsive", true)
//     .attr("transform", d => "translate(528,71) scale(1)")

//   d3.select("body")
//     .call(d3.zoom().on("zoom", function () {
//       svg.attr("transform", d3.event.transform)
//     })
//       .scaleExtent([1, 8]))

//   var i = 0,
//     duration = 750,
//     root,
//     rectW = 120,
//     rectH = 30

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
//       .data(nodes,
//       d => d.id || (d.id = ++i))

//     // Remove any exiting nodes
//     var nodeExit = node.exit().transition()
//      .duration(duration)
//      .attr("transform", function (d) {
//        return "translate(" + source.x + "," + source.y + ")";
//      })
//      .remove();
//     // Enter any new modes at the parent's previous position.
//     var nodeEnter = node.enter().append('g')
//       .attr('class', 'node')
//       .attr("transform", d => "translate(" + source.x0 + "," + source.y0 + ")")
//       .on('click', click)

//     var div = d3.select("body").append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0);

//     // Add Circle for the nodes
//     // nodeEnter.append('circle')
//     //   .attr('class', 'node')
//     //   .attr('r', 5)
//     //   .style("fill", function (d) {
//     //     return d._children ? "lightsteelblue" : "#fff";
//     //   })
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

//       .on("mouseover", function (d) {
//         console.log('data', d)
//         console.log('mouseover')
//         console.log('d', d.data.state)
//         div.transition()
//           .duration(1000)
//           .style("opacity", .9);

//         let stateString = ''

//         /**
//          * Flatten an object into a string. The key: value will be
//          * appended to a string to be presented on the tooltip
//          * @param {object} item
//          */
//         function walkState(item) {
//           for (let key in item) {
//             if (typeof item[key] === 'object') {
//               walkState(item[key])
//             }
//             else stateString += key + ' ' + item[key] + '<br />'
//           }
//         }

//         if (!d.data.state) stateString += ' null'
//         else if (typeof d.data.state === 'object') walkState(d.data.state);

//         div.html(
//           "Name: " + d.data.name + "<br />" +
//           "Level: " + d.depth + "<br />" +
//           "state: " + stateString + "<br />" +
//           "props: " + d.data.props
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

//     // nodeEnter.append('text')
//     // .attr("dy", ".35em")
//     // .attr("y", function (d) {
//     //   return d.children || d._children ? -18 : 18;
//     // })
//     // .attr("text-anchor", "middle")
//     // .text(function (d) { return d.data.name; })


//     // UPDATE
//     var nodeUpdate = nodeEnter.merge(node);

//     // Transition to the proper position for the node
//     nodeUpdate.transition()
//       .duration(duration)
//       .attr("transform", function (d) {
//         return "translate(" + d.x + "," + d.y + ")";
//       });

//     // Update the node attributes and style
//     // nodeUpdate.select('circle.node')
//     //   .attr('r', 10)
//     //   .style("fill", function (d) {
//     //     return d._children ? "lightsteelblue" : "#fff";
//     //   })
//     //   .attr('cursor', 'pointer');
//     nodeUpdate.select('rect.node')
//       .attr("width", rectW)
//       .attr("height", rectH)
//       // .style("fill", function (d) {
//       //   return d._children ? "lightsteelblue" : "#fff";
//       // })
//       .attr('cursor', 'pointer');



//     // Remove any exiting nodes
//     var nodeExit = node.exit().transition()
//       .duration(duration)
//       .attr("transform", function (d) {
//         return "translate(" + source.x + "," + source.y + ")";
//       })
//       .remove();

//     // On exit reduce the node circles size to 0
//     // nodeExit.select('circle')
//     //   .attr('r', 1e-6);
//     nodeExit.select("rect")
//       .attr("width", rectW)
//       .attr("height", rectH)
//     // nodeExit.select("rect")
//     //   .attr("width", rectW)
//     //   .attr("height", rectH)


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
//       .attr('d', function (d) {
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
//     nodes.forEach(function (d) {
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

const d3 = require('d3')


  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 1000 - margin.right - margin.left,
    height = 960 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin

  // d3.select("body").selectAll("*").remove();

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("
    + margin.left + "," + margin.top + ")")

  d3.select("body")
    .call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform)
    })
      .scaleExtent([1, 8]))


export function drawChart(treeData) {

  var i = 0,
    duration = 750,
    root;

  // declares a tree layout and assigns the size
  var treemap = d3.tree().size([height, width]);

  // Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, function (d) { return d.children; });
  root.x0 = height / 2;
  root.y0 = 0;

  update(root);

  function update(source) {

    // Assigns the x and y position for the nodes
    // var treeData = treemap(root);
    var treeData = treemap(root);
    // Compute the new tree layout.
    var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) { d.y = d.depth * 60 }); // magic number is distance between each node

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
      .data(nodes, function (d) {

        return d.data.id
        // return d.id || (d.id = ++i);
       });

    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
     .duration(duration)
     .attr("transform", function (d) {
       return "translate(" + source.x + "," + source.y + ")";
     })
     .remove();
    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
      })
      .on('click', click)

    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 5)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
      .style("pointer-events", "visible")

      .on("mouseover", function (d) {
        console.log('data', d)
        console.log('mouseover')
        console.log('d', d.data.state)
        div.transition()
          .duration(1000)
          .style("opacity", .9);

        let stateString = ''

        /**
         * Flatten an object into a string. The key: value will be
         * appended to a string to be presented on the tooltip
         * @param {object} item
         */
        function walkState(item) {
          for (let key in item) {
            if (typeof item[key] === 'object') {
              walkState(item[key])
            }
            else stateString += key + ' ' + item[key] + '<br />'
          }
        }

        if (!d.data.state) stateString += ' null'
        else if (typeof d.data.state === 'object') walkState(d.data.state);

        div.html(
          "Name: " + d.data.name + "<br />" +
          "Level: " + d.depth + "<br />" +
          "state: " + stateString + "<br />" +
          "props: " + d.data.props
        )
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        console.log('mouseout')
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("y", function (d) {
        return d.children || d._children ? -18 : 18;
      })
      .attr("text-anchor", "middle")
      .text(function (d) { return d.data.name; })

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');




    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
      .data(links, function (d) { return d.data.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function (d) {
        var o = { x: source.x0, y: source.y0 }
        return diagonal(o, o)
      });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(duration)
      .attr('d', function (d) { return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function (d) {
        var o = { x: source.x, y: source.y }
        return diagonal(o, o)
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      let path = "M" + s.x + "," + s.y
        + "C" + s.x + "," + (s.y + d.y) / 2
        + " " + d.x + "," + (s.y + d.y) / 2
        + " " + d.x + "," + d.y

      return path
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
}
