import JSONFormatter from 'json-formatter-js';

const drawStore = (data) => {
<<<<<<< HEAD
  console.log(JSONFormatter)
  if (Object.keys(data).length) {
    const storeNode = document.getElementById('store')
    storeNode.innerHTML = ''
    const storeFormatter = new JSONFormatter(data, 0, {
      hoverPreviewEnabled: false,
      hoverPreviewArrayCount: 10,
      hoverPreviewFieldCount: 10,
      animateOpen: true,
      animateClose: true,
=======
  // console.log('#drawStore: ', data);
  if (data) {
    const reduxStore = Object.keys(data);
    $('#store').html('');
    reduxStore.forEach((state, index) => {
      const newValue = new JSONFormatter(data[state], 0, {
        hoverPreviewEnabled: false,
        hoverPreviewArrayCount: 10,
        theme: '',
        animateOpen: true,
        animateClose: true
      })
      $('#store').append(`<p id="state-${index}">${state}: </p>`);
      $(`#state-${index}`).append(newValue.render());
>>>>>>> b63a6ab9defcec8f68c365685333d3c7aa94af1f
    })
    console.log('storeFormatter: ', storeFormatter)
    console.log('isOpen: ???', storeFormatter.isOpen)
    storeNode.appendChild(storeFormatter.render())
  }
}

export default drawStore;
