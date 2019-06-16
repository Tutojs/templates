'use strict'

let token = function (template = '', information = {}, signs = ['${', '}']) {
  // error START
  let error =
    typeof template !== 'string' ?
    `first argument (template) must be string, type of template is ${typeof template}.`
    :
    typeof information !== 'object' && !Array.isArray(information) ?
    `second argument (information) must be object, type of information is ${typeof information}.`
    :
    !Array.isArray(signs) ?
    `third argument (signs) must be array, type of signs is ${typeof signs}.`
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
    template.match(RegExp(`(?<=${signal[0]} *?)[^ ].*?(?= *?${signal[1]})`, 'gs'))
  ]
  if (tag[0] == null) return template
  let { length } = tag[0]
  // tag END

  for (let i = 0 ; i < length; i++) {
    template = template.replace(
      tag[0][i],
      information[tag[1][i]] === undefined ?
      tag[1][i] // default value
      :
      information[tag[1][i]])
  }
  
  return template
}
