Tinytest.add("Title", function(test) {
  var config = {
    options: {
      title: "Default Title",
      suffix: "Suffix"
    }
  }

  Meta.config(config);

  Meta.setTitle("");
  test.equal(Meta.getTitle(), config.options.title, "Is default title working ?");

  Meta.setTitle("asd");
  test.equal(Meta.getTitle(), "asd | " + config.options.suffix, "Is suffix working ?");

  Meta.setTitle(function() {
    return "test"
  });
  test.equal(Meta.getTitle(), "test | " + config.options.suffix, "can title be function ?");
});

// Tinytest.add("Tags", function(test) {
//   var meta = {
//     "og:title": "Titlee"
//   }

//   Meta.set("og:title", meta["og:title"]);
//   test.equal(Meta.hash()["og:title"], meta["og:title"], "Can i add meta tag");

//   Meta.unset("og:title");
//   test.isUndefined(Meta.hash()["og:title"], "Can i remove meta tag");
// });

testAsyncMulti("HTML", [

  function(test, expect) {
    Meta.setTitle("test");

    Deps.flush();

    Meteor.defer(expect(function() {
      test.equal(document.title, Meta.getTitle(), "is title set on DOM ?");
    }));
  },
  function(test, expect) {
    Meta.setTitle(function() {
      return "My Title"
    });

    Deps.flush();

    Meteor.defer(expect(function() {
      test.equal(document.title, Meta.getTitle(), "is title set on DOM ?");
    }));
  },
  function(test, expect) {
    var title = "Open Graph Title";
    Meta.set("og:title", title);
    Meta.set("removed", "Will be removed");
    Meta.unset("removed");

    Deps.flush();

    debugger

    Meteor.defer(expect(function() {
      test.equal($("meta[property='og:title']").attr("content"), title, "is og:title set on DOM ?");
      test.isUndefined($("meta[property='og:removed']").attr("content"), "can remove a tag on DOM ?");
    }));
  }
]);