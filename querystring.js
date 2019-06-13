'use strict'
// package.json: {"type": "module"}
// node --experimental-modules querystring.js

// modules START
import querystring from 'querystring'
// modules END

let querystring_api = function (api, information) {

  let url = new URL(api)
  // update search parameters of URL
  let data = {...querystring.parse(url.query), ...information}
  url.search = querystring.stringify(data)
  return api
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
