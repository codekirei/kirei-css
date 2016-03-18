# `kirei-css` [![version][1]][2] [![build][3]][4] [![coverage][5]][6]

<b>[About](#about)</b> |
<b>[Installation](#installation)</b> |
<b>[Usage](#usage)</b> |
<b>[License](#license)</b>

---

## About

`kirei-css` is a [PostCSS](https://github.com/postcss/postcss) plugin collection that combines many of the popular PostCSS plugins in a functional order. Because plugin ordering is significant in PostCSS, be cautious when including `kirei-css` in a PostCSS plugin chain with other plugins &mdash; you are likely to run into conflicts.

Also note that there is currently no documentation for CSS transformations this collection performs. That said, `kirei-css` is literally just a collection of other plugins. It doesn't do anything the included plugins aren't doing already, it just does all of those things together, letting you `require` one package instead of around twenty. Documentation will likely be added later &mdash; for now, you'll have to rely on each individual module's docs. The test suite may also be instructive.

**Plugins in the Collection**

- [alias-atrules](https://github.com/maximkoretskiy/postcss-alias-atrules)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [brand-colors](https://github.com/postcss/postcss-brand-colors)
- [calc](https://github.com/postcss/postcss-calc)
- [custom-media](https://github.com/postcss/postcss-custom-media)
- [custom-selectors](https://github.com/postcss/postcss-custom-selectors)
- [define-units](https://github.com/LestaD/postcss-define-units)
- [discard-empty](https://github.com/ben-eb/postcss-discard-empty)
- [if-media](https://github.com/arccoza/postcss-if-media)
- [import](https://github.com/postcss/postcss-import)
- [lost](https://github.com/peterramsing/lost)
- [media-minmax](https://github.com/postcss/postcss-media-minmax)
- [mixins](https://github.com/postcss/postcss-mixins)
- [nested](https://github.com/postcss/postcss-nested)
- [prettify](https://github.com/codekirei/postcss-prettify)
- [responsive-type](https://github.com/seaneking/postcss-responsive-type)
- [round-subpixels](https://github.com/himynameisdave/postcss-round-subpixels)
- [simple-vars](https://github.com/postcss/postcss-simple-vars)
- [size](https://github.com/postcss/postcss-size)

Each of these plugins is included with its default config except `alias-atrules`, which receives the following config by default:
```js
{
  rules: {
    '%': 'define-mixin',
    $: 'mixin',
    breakpoint: 'custom-media',
  },
}
```

This allows defining mixins with `@%`, using mixins with `@$`, and defining custom media queries with `@breakpoint`. To configure plugins, see the Options API in the [Usage](#usage) section.

## Installation

**From a terminal**

```sh
npm install --save-dev kirei-css
```

## Usage

**As a PostCSS Plugin**
```js
postcss([
  require('kirei-css')
])
```

Check the [PostCSS docs](https://github.com/postcss/postcss#usage) for your chosen implementation.

**Standalone**

`kirei-css` also exposes a standalone [PostCSS processor instance](https://github.com/postcss/postcss/blob/master/docs/api.md#processorprocesscss-opts) as `kireiCss.process(css, opts)`:

```js
var fs = require('mz/fs')
var kireiCss = require('kirei-css')

fs.readFile('src/style.css', 'utf8')
  .then(data => kireiCss.process(data))
  .then(res => fs.writeFile('dist/style.css', res.css))
  .catch(err => console.err(err.stack))
```

**Options API**

Each of the plugins `kirei-css` uses can receive a custom config. To pass a config object to a plugin, call `kirei-css` with an object that has the unique `npm` name of the plugin you want to configure as the key and the plugin's config as the value.

```js
// custom config object
var opts = {
  autoprefixer: {
    browsers: ['> 1%', 'IE 7'],
  },
  'postcss-nested': {
    bubble: ['phone'],
  },
}

/*
 * using as plugin
 * kireiCss(opts)
 */
var postcss = require('postcss')
postcss([
  require('kirei-css')(opts)
])

/*
 * using standalone
 * kireiCss.process(css, opts)
 */
var fs = require('mz/fs')
var kireiCss = require('kirei-css')

fs.readFile('src/style.css', 'utf8')
  .then(data => kireiCss.process(data, opts))
  .then(res => fs.writeFile('dist/style.css', res.css))
  .catch(err => console.err(err.stack))
```


## License

[MIT](https://github.com/codekirei/kirei-css/blob/master/license)

[1]: https://img.shields.io/npm/v/kirei-css.svg?style=flat-square&label=version
[2]: https://www.npmjs.com/package/kirei-css
[3]: https://img.shields.io/travis/codekirei/kirei-css.svg?style=flat-square&label=tests
[4]: https://travis-ci.org/codekirei/kirei-css
[5]: http://img.shields.io/coveralls/codekirei/kirei-css.svg?style=flat-square
[6]: https://coveralls.io/github/codekirei/kirei-css?branch=master
