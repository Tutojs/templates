'use strict'
// node --experimental-modules query.js

// modules START
import querystring from 'querystring'
// modules END

let example_api_link = 'https://example.com/example/path?query1=${string1}&query2=${string2}&query3=${string3}'
let information = { query1: 'example1', query2: 'example2', query3: 'example3'}

let query_api = new URL(example_api_link)

// update search parameters of URL
let data = {...querystring.parse(query_api.query), ...information}
query_api.search = querystring.stringify(data)

// query_api.href: 'https://example.com/example/path?query1=example1&query2=example2&query3=example3'

/* https://nodejs.org
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
*/ └────────────────────────────────────────────────────────────────────────────────────────────────┘
