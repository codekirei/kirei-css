// utils ---------------------------------------------------

import test from 'ava'
import kireiCss from '..'
import postcss from 'postcss'
import path from 'path'
import { readFile, readdir } from 'mz/fs'

// tests ---------------------------------------------------

const processor = postcss([kireiCss])

const read = (dir, file) =>
  readFile(path.resolve('cases', dir, `${file}.css`), 'utf-8')

const run = testCase => test(testCase, function* runner(t) {
  const raw = yield read(testCase, 'in')
  const expected = yield read(testCase, 'out')
  const actual = yield processor.process(raw)
  t.same(actual.css, expected)
})

readdir(path.resolve('cases')).then(cases => cases.forEach(run))
