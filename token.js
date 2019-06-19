'use strict'

let token = function (template = '', information = {}, signs = ['${', '}']) {
  // error START
  let error =
    typeof template !== 'string' ?
      `first argument (template) must be string, type of template is ${Array.isArray(template) ? 'array' : typeof template}.`
    :
    typeof information !== 'object' || Array.isArray(information) ?
      `second argument (information) must be object, type of information is ${Array.isArray(information) ? 'array' : typeof information}.`
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
    template.match(RegExp(`(?<=${signal[0]}\s*?)[^\s].*?(?=\s*?${signal[1]})`, 'gs'))
  ]
  // tag END
  if (tag[0] === null) return template

  // regular for loop START
  let { length } = tag[0]
  for (let i = 0 ; i < length; i++) {
    let key = tag[1][i]
    template = template.replace(
      tag[0][i],
      information[key] === undefined ?
      key // default value
      :
      information[key]
    )
  }
  // regular for loop END
  
  // forEach loop START
  /*
  tag[1].forEach((key, i) => {
    template = template.replace(
      tag[0][i],
      information[key] === undefined ?
      key // default value
      :
      information[key]
    )
  })
  */
  // forEach loop END

  // for ... of loop START
  /*
  for (let key of token[1]) {
    template = template.replace(
      tag[0][tag[1].indexOf(key)],
      information[key] === undefined ?
      key // default value
      :
      information[key]
    )
  }
  */
  // for ... of loop END

  
  return template
}
