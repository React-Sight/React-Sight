import JSONFormatter from 'json-formatter-js'

const drawStore = (data) => {
  const reduxStore = Object.keys(data)
  $('#store-container').html('')
  reduxStore.forEach(state => {
    const newValue = new JSONFormatter(data[state], 0, {
      hoverPreviewEnabled: false,
      hoverPreviewArrayCount: 10,
      theme: 'dark',
      animateOpen: true,
      animateClose: true
    })
    $('#store-container').append(`<p>${state}: </p>`)
    $('#store-container').append(newValue.render())
  })
}

export default drawStore
