const drawVBox = (data) => {
  let nodeNames = [];
  getNodeNames(data, nodeNames)
  let breadcrumbSteps = []
  $.each(nodeNames, (index, item) => {
    breadcrumbSteps.push(`<a class="breadcrumb-item" href="#">${item}</a>`)
  })
  console.log(breadcrumbSteps)
  $('.breadcrumb').html(breadcrumbSteps)
}

const getNodeNames = (data, array) => {
  if (!data.name) return
  if (data.type === 'ReactCompositeComponentWrapper') array.push(data.name)
  if (!data.children.length) return
  else {
    data.children.forEach(child => {
      getNodeNames(child, array)
    })
  }
}

export default drawVBox
