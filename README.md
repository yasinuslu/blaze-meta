blaze-meta
==========

A meteor package that makes it easy to manage meta-data

### NOTE: This package only works with blaze

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

It will be updated on DOM automatically.
