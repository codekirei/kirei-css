// utils ---------------------------------------------------

import assert from 'assert'
import postcss from 'postcss'
import kireiCss from '../src'

// tests ---------------------------------------------------

const processor = postcss([kireiCss])

const expected =
`body {
  background: red;
}`

exports['as-plugin'] = function* customOpts() {
  const raw = postcss.parse('body{background:red;}')
  const actual = yield processor.process(raw)
  assert.equal(actual.css, expected)
}
