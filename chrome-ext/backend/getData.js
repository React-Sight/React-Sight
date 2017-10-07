var consoleLog = console.log;
console.log = (function (original) {
  return function(text) {
    if (typeof text === 'string' && text.includes('sad')) {
      let newString = text.replace('sad', "mango")
      return original(newString)
    }
    return original(text)
  }
})(consoleLog)

console.log('i am a very sad person')
