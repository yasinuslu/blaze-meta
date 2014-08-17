Meta = {
  options: {
    title: "Default Title",
    suffix: "Suffix for title",
    namespace: "myproject"
  },

  converters: {
    title: function (title) {
      if(_.isFunction(title)) {
        title = title();
      }

      if(_.isEmpty(title)) {
        return Meta.options.title || "";
      }

      if(!_.isEmpty(Meta.options.suffix)) {
        title = title + " | " + Meta.options.suffix;
      }

      return title;
    },

    meta: function (prop, content) {
      return {
        prop: prop,
        content: content
      }
    }
  },

  init: function () {
    Meta.setTitle("");
  },

  config: function (opts) {
    _.extend(Meta.options, opts.options);
    _.extend(Meta.converters, opts.converters);
  },

  setVar: function (key, value) {
    Session.set(Meta.options.namespace + "." + key, value);
  },

  getVar: function (key) {
    return Session.get(Meta.options.namespace + "." + key);
  },

  set: function (prop, content) {
    var meta = Meta.getVar("tag") || {};
    var m = Meta.converters.meta(prop, content);
    meta[m.prop] = m.content;
    Meta.setVar("tag", meta);
  },

  unset: function (prop) {
    var meta = Meta.getVar("tag") || {};
    delete meta[prop];
    Meta.setVar("tag", meta);
  },

  setTitle: function (title) {
    Meta.setVar("title", Meta.converters.title(title));
  },

  getTitle: function () {
    return Meta.getVar("title");
  },

  arr: function () {
    var meta = Meta.getVar("tag");
    return _.map(meta, function(content, prop) {
      return {
        prop: prop,
        content: content
      }
    });
  },

  hash: function () {
    return Meta.getVar("tag");
  }
}

Template.MetaTags.tags = function () {
  return Meta.arr();
}

Meteor.startup(function () {
  Meta.init();

  UI.insert(UI.render(Template.MetaTags), document.head);

  Deps.autorun(function () {
    document.title = Meta.getTitle();
  });
});
