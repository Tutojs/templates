'use strict'

// example info from database JSON.parse()
let example_json = { name: 'Tuto', language: 'javascript', color: 'red'}

// example template or API
let template = 'welcome ${name}, your programming language is ${language}, ${color} is your favorite color.'
// '${' and '}' are default because ECMAscript template literal use them
function token(template = '', information = {}, signs = ['${', '}']) {
  // custom signal signs START
  let signal = signs.map(element => element.replace(/[.*+?^${}()<>|[\]\\]/g, '\\$&'))
  // custom signal signs END
  
  // raw tokens START
  let raw_tokens = template.match(RegExp(`${signal[0]}.*?${signal[1]}`, 'gs'))
  // if no token find, return template without process
  if (raw_tokens == null) return template
  let { length } = raw_tokens
  // raw tokens END
  
  // tokens START
  let token = template.match(RegExp(`(?<=${signal[0]} *?)[^ ].*?(?= *?${signal[1]})`, 'gs'))
  // token END
  
  let raw = {}
  let data = {}
  
  for (let i = 0 ; i < length; i++) {
    raw[token[i]] = raw_tokens[i]
    data[token[i]] = token[i]
  }
  // updating template token with information
  data = {...data, ...information}
  for (let i = 0; i < length; i++) {
    template = template.replace( raw[token[i]], data[token[i]])
  }
  return template
}

// token(template: string, information
// use: token(template, example_json)
// will return: 'welcome Tuto, your programming language is javascript, red is your favorite color.'
// if information aren't complate default values will return (default values are token names)
// space between signal and token are removed 'this is an example ${  token with space  } in start end and middle'
// raw token is: '${  token with space  }', this token use to replace with info
// token is: 'token with space', this token use to create an object for template info or API
// to use custom signal: token(example_template, example_information, ['custom_left_signal', 'custom_right_signal'])
