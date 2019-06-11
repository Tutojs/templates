'use strict'

// example info from database JSON.parse()
let example_json = { name: 'Tuto', language: 'javascript', color: 'red'}

// example template or API
let template = 'welcome ${name}, your programming language is ${language}, favorite color is ${color}'
// '${' and '}' are default because ECMAscript template literal use them
function token(template = '', obj = {}, signs = ['${', '}']) {
  let signal = signs.map(element => element.replace(/[.*+?^${}()<>|[\]\\]/g, '\\$&'))

  let raw_tokens = template.match(RegExp(`${signal[0]}.*?${signal[1]}`, 'gs'))
  if (raw_tokens == null) return template
  let { length } = raw_tokens
  let raw = {}
  let token = template.match(RegExp(`(?<=${signal[0]} *?)[^ ].*?(?= *?${signal[1]})`, 'gs'))
  let data = {}
  for (let i = 0 ; i < length; i++) {
    raw[token[i]] = raw_tokens[i]
    data[token[i]] = token[i]
  }
  data = {...data, ...obj}
  for (let i = 0; i < length; i++) {
    template = template.replace( raw[token[i]], data[token[i]])
  }
  return template
}

// use: token(template, example_json)
// will return: 'welcome Tuto, your programming language is javascript, favorite color is red'
// if information aren't complate default values will return (default values are token names)
// space between signal and token are removed 'this is an example ${  token with space  } in start end and middle'
// raw token is: '${  token with space  }', this token use to replace with info
// token is: 'token with space', this token use to create an object for template info or API
// to use custom signal: token(example_template, example_information, ['custom_left_signal', 'custom_right_signal'])
