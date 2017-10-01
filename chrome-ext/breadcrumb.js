const drawVBox = (data) => {
  let nodeNames = {}
  getNodeNames(data, nodeNames)
  let nodes = Object.keys(nodeNames)
  let breadcrumbSteps = []
  $.each(nodes, (index, node) => {
    return nodeNames[node] == 1 ?
      breadcrumbSteps.push(`<a class="breadcrumb-item" href="#">${node}</a>`)
      : breadcrumbSteps.push(`<a class="breadcrumb-item" href="#">${node}[${nodeNames[node]}]</a>`)
  })
  $('.breadcrumb').html(breadcrumbSteps)
}

const getNodeNames = (data, object) => {
  if (!data.name) return
  if (data.type === 'ReactCompositeComponentWrapper') {
    object[data.name] = (object[data.name] || 0) +1
  }
  if (!data.children.length) return
  else {
    data.children.forEach(child => {
      getNodeNames(child, object)
    })
  }
}

export default drawVBox
