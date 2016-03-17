// utils ---------------------------------------------------

const path = require('path')
const assert = require('assert')
const fs = require('mz/fs')
const postcss = require('postcss')
const kireiCss = require('..')

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
