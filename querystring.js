'use strict'
// package.json: {"type": "module"}
// node --experimental-modules query.js

// modules START
import url from 'url'
import querystring from 'querystring'
// modules END

let node_querystring = function (api = '', information = {}) {
  if (typeof api !== 'string') return `api must be string url, type of api is ${typeof api}.`
  if (typeof information !== 'object') return `information must be object, type of information is ${typeof information}.`

  let data = url.parse(api, true)
  // update search parameters of URL
  let { query } = data
  let keys = Object.keys(query)
  for (let key of keys) {
    query[key] = information[key]
  }
  data.search = querystring.stringify(query)
  return url.format(data)
}

/* https://nodejs.org : structure of URL
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
