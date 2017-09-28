// input: store data { messages: [], greeting: 'hello', currentUser: {}}
import JSONFormatter from 'json-formatter-js'

const drawStore = (data) => {
  const reduxStore = Object.keys(data)
  var store = document.getElementById("store")
  store.innerHTML = ''
  reduxStore.forEach(state => {
    console.log('redux state:', state)
    const newValue = new JSONFormatter(data[state], 1, {hoverPreviewEnabled: true})
    const newItem = document.createElement('li')
    const newState = document.createElement('p')
    newState.innerHTML = state
    newItem.append(newState)
    newItem.append(newValue.render())
    document.getElementById('store').appendChild(newItem)
  })
}

export default drawStore
