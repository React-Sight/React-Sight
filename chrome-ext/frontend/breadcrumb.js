const drawVBox = (data) => {
  let nodeNames = {}
  getNodeNames(data, nodeNames)
  let nodes = Object.keys(nodeNames)
  let breadcrumbSteps = []

  nodes.forEach((node, index) => {
    const anchor = document.createElement('a');
    anchor.setAttribute('class', 'breadcrumb-item');
    anchor.setAttribute('href', '#');

    if (nodeNames[node] === 1) {
      var anchorText = document.createTextNode(`${node}`);
    }
    else {
      var anchorText = document.createTextNode(`${node}[${nodeNames[node]}]`);
    }

    anchor.appendChild(anchorText);
    breadcrumbSteps.push(anchor);
  });
  const breadcrumb = document.querySelector('.breadcrumb');
  breadcrumb.innerHTML = '';
  breadcrumbSteps.forEach(node => {
    breadcrumb.appendChild(node);
  });
}

const getNodeNames = (data, object) => {
  if (!data.name) return
  if (!data.isDOM) {
    object[data.name] = (object[data.name] || 0) + 1
  }
  if (!data.children.length) return
  else {
    data.children.forEach(child => {
      getNodeNames(child, object)
    })
  }
}

export default drawVBox
