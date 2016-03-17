// Modules ---------------------------------------------------------------------

import postcss from 'postcss'
import merge from 'lodash.merge'

// Plugins ---------------------------------------------------------------------

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
  ['postcss-prettify', {}],
])

// Aggregate and Export --------------------------------------------------------

const kireiCss = postcss.plugin('kirei-css', (custom = {}) => {
  const instance = postcss()
  plugins.forEach((opts, plugin) => instance.use(require(plugin)(
    custom[plugin] ? merge(opts, custom[plugin]) : opts
  )))
  return instance
})

kireiCss.process = (css, opts) => postcss([kireiCss(opts)]).process(css)

export default kireiCss
