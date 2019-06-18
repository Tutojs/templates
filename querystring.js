'use strict'

// node version: 12.4.0 [latest]
// to use ECMAscript modules without using .mjs:
// create package.json [recommended in root] and add this field to top level: "type": "module"
// package.json: {"type": "module"}
// node --experimental-modules querystring.js

// modules START
import url from 'url'
import querystring from 'querystring'
// modules END

let node_querystring = function (api = '', information = {}) {
  // error START
  let error = 
    typeof api !== 'string' ?
    `first argument (api) must be string (url), type of api is ${Array.isArray(api) ? 'array' : typeof api}.`
    :
    typeof information !== 'object' || Array.isArray(information) ?
    `information must be object, type of information is ${Array.isArray(information) ? 'array' : typeof information}.`
    :
    undefined
  if (error !== undefined) return error
  // error END
  
  let data = url.parse(api, true)
  let { query } = data
  let keys = Object.keys(query)
  
  // update URL querystring START
  for (let key of keys) {
    query[key] =
      information[key] === undefined ?
      query[key] // default value
      :
      information[key]
  }
  data.search = querystring.stringify(query)
  // update URL querystring END
  
  return url.format(data)
}

/* URL structure: https://nodejs.org/api/url.html#url_url_strings_and_url_objects
 * ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │                                              href                                              │
 * ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
 * │ protocol │  │        auth         │          host          │           path            │ hash  │
 * │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
 * │          │  │                     │    hostname     │ port │ pathname │     search     │       │
 * │          │  │                     │                 │      │          ├─┬──────────────┤       │
 * │          │  │                     │                 │      │          │ │    query     │       │
 * "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
 * │          │  │          │          │    hostname     │ port │          │                │       │
 * │          │  │          │          ├─────────────────┴──────┤          │                │       │
 * │ protocol │  │ username │ password │          host          │          │                │       │
 * ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
 * │   origin    │                     │         origin         │ pathname │     search     │ hash  │
 * ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
 * │                                              href                                              │
 * └────────────────────────────────────────────────────────────────────────────────────────────────┘
*/
