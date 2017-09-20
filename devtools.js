var treeData =
  {
    "name": "Top Level",
    "children": [
      {
        "name": "Level 2: A",
        "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" }
        ]
      },
      {
        "name": "Level 2: B", "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" },
          {
            "name": "Level 2: A",
            "children": [
              { "name": "Son of A" },
              {
                "name": "Level 2: A",
                "children": [
                  { "name": "Son of A" },
                  { "name": "Daughter of A" }
                ]
              }, {
                "name": "Level 2: A",
                "children": [
                  { "name": "Son of A" },
                  {
                    "name": "Level 2: A",
                    "children": [
                      { "name": "Son of A" },
                      { "name": "Daughter of A" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      { "name": "Level 2: C" },
      { "name": "Level 2: D" }
    ]
  };

// run a listening script for messages



// chrome.extension.onMessage.addListener(function(myMessage, sender, sendResponse){
//   //do something that only the extension has privileges here
//   console.log('MESSAGE')
//   return true;
// });
// when message is recieved, we will need to update data in the tree

// attach panel to chrome dev tools
chrome.devtools.panels.create("dataViz", null, "devtools.html", function () {
  console.log('in the callback');
  sendObjectToInspectedPage({ action: "script", content: "messageback-script.js" })
  drawChart(treeData);
});

function sendObjectToDevTools(message) {
  chrome.extension.sendMessage(message, function (message) {
    console.log('HELLO YOU SENT A MESSAGE BACK: ', message)
    drawChart(message.data)
  })
}


// function to draw d3 chart
const drawChart = (treeData) => {

  var margin = { top: 10, right: 50, bottom: 10, left: 50 },
    width = 900 - margin.right - margin.left,
    height = 960 - margin.top - margin.bottom;
  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("
    + margin.left + "," + margin.top + ")");

  var i = 0,
    duration = 750,
    root;

  // declares a tree layout and assigns the size
  var treemap = d3.tree().size([height, width]);

  // Assigns parent, children, height, depth
  root = d3.hierarchy(treeData, function (d) { return d.children; });
  root.x0 = height / 2;
  root.y0 = 0;

  // Collapse after the second level
  root.children.forEach(collapse);

  update(root);
  // Collapse the node and all it's children
  function collapse(d) {
    if (d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }

  function update(source) {

    // Assigns the x and y position for the nodes
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) { d.y = d.depth * 180 });

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = svg.selectAll('g.node')
      .data(nodes, function (d) { return d.id || (d.id = ++i); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
      })
      .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      });

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("y", function (d) {
        return d.children || d._children ? -18 : 18;
      })
      .attr("text-anchor", "middle")
      .text(function (d) { return d.data.name; });

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


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
      .data(links, function (d) { return d.id; });

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
      // console.log(s, d)

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
    /*
      D3 code to create our visualization by appending onto this.svg
    */

    // At some point we render a child, say a tooltip
    // const tooltipData = ...
    // this.renderTooltip([50, 100], tooltipData);
}
}
