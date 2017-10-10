import JSONFormatter from 'json-formatter-js';

const drawStore = (data) => {
  if (!data) return;
  if (Object.keys(data).length) {
    const storeNode = document.getElementById('store')
    storeNode.innerHTML = ''
    const storeFormatter = new JSONFormatter(data, 0, {
      hoverPreviewEnabled: false,
      hoverPreviewArrayCount: 10,
      hoverPreviewFieldCount: 10,
      animateOpen: true,
      animateClose: true,
    });
    storeNode.appendChild(storeFormatter.render());
  }
};

export default drawStore;
