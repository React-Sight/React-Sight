import JSONFormatter from 'json-formatter-js';

const drawStore = (data) => {
  // console.log('#drawStore: ', data);
  if (data) {
    const reduxStore = Object.keys(data);
    $('#store').html('');
    reduxStore.forEach((state, index) => {
      const newValue = new JSONFormatter(data[state], 0, {
        hoverPreviewEnabled: false,
        hoverPreviewArrayCount: 10,
        animateOpen: true,
        animateClose: true
      })
      $('#store').append(`<p id="state-${index}">${state}: </p>`);
      $(`#state-${index}`).append(newValue.render());
    })
  }
}

export default drawStore;
