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
let tags = [...template.matchAll(RegExp(`${signal[0]}\s*?([^\s].*?)\s*?${signal[1]}`, 'gs'))]
// tag END

// contents START
let contents = []
// for ... of loop START
for (let data of information) {
  let rawtemplate = template // reset template
  for (let tag of tags) {
    rawtemplate = rawtemplate.replace(
      tag[0],
      data[tag[1]] === undefined ?
      tag[1] // default value
      :
      data[tag[1]]
    )
  }
  contents.push(rawtemplate)
}
// for ... of loop END
contents = contents.join(seperator)
// contents END

return contents
}
