Package.describe({
  summary: 'A package that makes it easy to manage meta-data'
});

Package.on_use(function (api) {
  api.use("underscore", "client");
  api.use("ui", "client");
  api.use("templating", "client");

  api.add_files("lib/meta.html", "client");
  api.add_files("lib/meta.js", "client");

  api.export("Meta");
});

Package.on_test(function (api) {
  api.use(["blaze-meta", "tinytest", "test-helpers", "underscore", "jquery"], "client");

  api.add_files("tests/test.js", "client");
});