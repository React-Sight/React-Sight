import JSONFormatter from 'json-formatter-js';

const drawStore = (data) => {
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
    })
    console.log('storeFormatter: ', storeFormatter)
    console.log('isOpen: ???', storeFormatter.isOpen)
    storeNode.appendChild(storeFormatter.render())
  }
}

export default drawStore;
