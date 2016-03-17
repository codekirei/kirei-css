// utils ---------------------------------------------------

import path from 'path'
import assert from 'assert'
import fs from 'mz/fs'
import kireiCss from '../src'

// tests ---------------------------------------------------

const opts = {
  'postcss-alias-atrules': {
    rules: {
      bp: 'custom-media',
    },
  },
}

const read = file =>
  fs.readFile(path.resolve('test', 'fixtures', 'custom-opts', `${file}.css`), 'utf8')

exports['custom-opts'] = function* customOpts() {
  const raw = yield read('in')
  const expected = yield read('out')
  const actual = yield kireiCss.process(raw, opts)
  assert.equal(actual.css, expected)
}
