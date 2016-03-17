// utils ---------------------------------------------------

import path from 'path'
import assert from 'assert'
import fs from 'mz/fs'
import postcss from 'postcss'
import kireiCss from '../src'

// tests ---------------------------------------------------

const opts = {
  'postcss-alias-atrules': {
    rules: {
      bp: 'custom-media',
    },
  },
}

const processor = postcss([kireiCss(opts)])

const read = file =>
  fs.readFile(path.resolve('test', 'fixtures', 'custom-opts', `${file}.css`), 'utf8')

exports['custom-opts'] = function* customOpts() {
  const raw = yield read('in')
  const expected = yield read('out')
  const actual = yield processor.process(raw)
  assert.equal(actual.css, expected)
}
