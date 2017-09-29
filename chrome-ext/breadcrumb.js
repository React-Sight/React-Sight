// const breadcrumb: HTMLElement = document.querySelector('.breadcrumb');
// const breadcrumbSteps: HTMLElement = document.querySelectorAll('.breadcrumb__step');

// const breadcrumb = document.getElementById("vbox")
// const vboxCrumbs = document.querySelectorAll('.breadcrumb__step')
const drawVBox = (data) => {
  let nodeNames = [];
  getNodeNames(data, nodeNames)
  let breadcrumbSteps = []
  $.each(nodeNames, (index, item) => {
    breadcrumbSteps.push(`<a class="breadcrumb-item" href="#">${item}</a>`)
  })
  console.log(nodeNames)
  console.log(breadcrumbSteps)
  $('.breadcrumb').html(breadcrumbSteps)
}

function getNodeNames(data, array) {
  if (!data.name) return
  array.push(data.name)
  if (!data.children.length) return
  data.children.forEach(child => {
    getNodeNames(child, array)
  })
}

export default drawVBox
