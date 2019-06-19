'use strict'

let content = function (template = '', information = [], signs = ['${', '}'], seperator = '\n') {
  // error START
  let error =
  typeof template !== 'string' ?
    `first argument (template) must be string, type of template is ${Array.isArray(template) ? 'array' : typeof template}.`
  :
  !Array.isArray(information) ?
    `second argument (information) must be array, type of information is ${typeof information}.`
  :
  !Array.isArray(signs) ?
    `third argument (signs) must be array, type of signs is ${typeof signs}.`
  :
  typeof seperator !== 'string' ?
    `fourth argument (seperator) must be string, type of seperator is ${Array.isArray(seperator) ? 'array' : typeof seperator}.`
  :
  undefined
if (error !== undefined) return error
// error END

// custom signal signs START
// \\$& = \\: escaped '\'+ $&: match all substring
let signal = signs.map(element => element.replace(/[.*+?^${}()<>|[\]\\]/g, '\\$&'))
// custom signal signs END

// tag START
let tag = [
  template.match(RegExp(`${signal[0]}.*?${signal[1]}`, 'gs')),
  template.match(RegExp(`(?<=${signal[0]}\s*?)[^\s].*?(?=\s*?${signal[1]})`, 'gs'))
]
// tag END

// content START
let contents = []
for (let data of information) {
  let rawtemplate = template
  for (let key of tag[1]) {
    let index = tag[1].indexOf(key)
    let rawtag = tag[0][index]
    rawtemplate = rawtemplate.replace(
      rawtag,
      data[key] === undefined ?
      key // default value
      :
      data[key]
    )
  }
  contents.push(rawtemplate)
}
// content END

return rawcontent.join(`${seperator}`)
}
