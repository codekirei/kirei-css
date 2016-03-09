const postcss = require('postcss')
const merge = require('lodash.merge')

const aliases = {
  '%': 'define-mixin',
  $: 'mixin',
  breakpoint: 'custom-media',
}

const plugins = new Map([
  ['postcss-import', {}],
  ['postcss-alias-atrules', { rules: aliases }],
  ['postcss-mixins', {}],
  ['postcss-simple-vars', {}],
  ['postcss-if-media', {}],
  ['postcss-custom-media', {}],
  ['postcss-media-minmax', {}],
  ['postcss-custom-selectors', {}],
  ['postcss-nested', {}],
  ['postcss-define-units', {}],
  ['postcss-brand-colors', {}],
  ['postcss-responsive-type', {}],
  ['lost', {}],
  ['postcss-calc', {}],
  ['postcss-size', {}],
  ['postcss-round-subpixels', {}],
  ['autoprefixer', {}],
  ['postcss-discard-empty', {}],
])

module.exports = postcss.plugin('kirei-css', kireiOpts => {
  const instance = postcss()
  const custom = kireiOpts || {}

  plugins.forEach((opts, plugin) => instance.use(require(plugin)(
    custom[plugin] ? merge(opts, custom[plugin]) : opts
  )))

  return instance
})
