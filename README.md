blaze-meta
==========

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yasinuslu/blaze-meta?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A meteor package that makes it easy to manage meta-data

```
meteor add yasinuslu:blaze-meta
```

```js
Meta.config({
  options: {
    title: "Default Title",
    suffix: "Suffix",
    namespace: "project"
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

which results in:

```html
<meta property="og:title" content="Titleee">
```

It will be updated on DOM automatically.
