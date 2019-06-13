'use strict'

let token = function (template = '', information = {}, signs = ['${', '}']) {
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
    tag[1][i] = information[tag[1][i]] === undefined ? tag[1][i] : information[tag[1][i]]
    template = template.replace(tag[0][i], tag[1][i])
  }
  
  return template
}
