blaze-meta
==========

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yasinuslu/blaze-meta?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A meteor package that makes it easy to manage meta-data

## This package is currently unmaintained

- If you're looking for iron-router integration you should check out https://atmospherejs.com/lookback/seo

This package will probably be deprecated in near future, check out https://github.com/kadirahq/meteor-dochead

```
meteor add yasinuslu:blaze-meta
```

```js
Meta.config({
  options: {
    title: "Default Title",
    suffix: "Suffix"
  }
});

Meta.setTitle("") => "Default Title"
Meta.setTitle("test") => "test | Suffix"

Meta.set("og:title", "Title");
Meta.set("og:description", "Description");

Meta.unset("og:title");
```

or

```js
Meta.set({
  name: 'property',
  property: 'og:title',
  content: 'Titleee'
});
```

or

```js
Meta.set([
  {
    name: "name",
    property: "apple-mobile-web-app-capable",
    content: "yes"
  },
  {
    name: "property",
    property: "og:locale",
    content: "en_GB"
  }
]);
```

which results in:

```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

It will be updated on DOM automatically.
