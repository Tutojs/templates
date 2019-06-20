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
  
  // tags START
  let tags = [...template.matchAll(RegExp(`${signal[0]}\s*?([^\s].*?)\s*?${signal[1]}`, 'gs'))]
  // tags END
  
  // for ... of loop START
  for (let tag of tags) {
    template = template.replace(
      tag[0],
      information[tag[1]] === undefined ?
      tag[1] // default value
      :
      information[tag[1]]
    )
  }
  // for ... of loop END
  
  // regular for loop START
  /*
  let { length } = tags
  for (let i = 0 ; i < length; i++) {
    let tag = tags[i]
    template = template.replace(
      tag[0],
      information[tag[1]] === undefined ?
      tag[1] // default value
      :
      information[tag[1]]
    )
  }
  */
  // regular for loop END
  
  // forEach loop START
  /*
  tags.forEach(tag => {
    template = template.replace(
      tag[0],
      information[tag[1]] === undefined ?
      tag[1] // default value
      :
      information[tag[1]]
    )
  })
  */
  // forEach loop END

  return template
}
