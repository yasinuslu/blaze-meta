Meta = {
  options: {
    title: "Default Title",
    suffix: "Suffix for title",
    namespace: "myproject"
  },

  converters: {
    title: function(title) {
      if (_.isFunction(title)) {
        title = title();
      }

      if (_.isEmpty(title)) {
        return Meta.options.title || "";
      }

      if (!_.isEmpty(Meta.options.suffix)) {
        title = title + " | " + Meta.options.suffix;
      }

      return title;
    },

    meta: function(property, content) {
      var options = _.isObject(property) ? property : {
        name: 'property',
        property: property,
        content: content
      };

      return options;
    }
  },

  init: function() {
    Meta.setTitle("");
  },

  config: function(opts) {
    _.extend(Meta.options, opts.options);
    _.extend(Meta.converters, opts.converters);
  },

  setVar: function(key, value) {
    Session.set(Meta.options.namespace + "." + key, value);
  },

  getVar: function(key) {
    return Session.get(Meta.options.namespace + "." + key);
  },

  set: function(property, content) {
    var meta = Meta.getVar("tag") || {};
    var m = Meta.converters.meta(property, content);
    meta[m.property] = m;
    Meta.setVar("tag", meta);
  },

  unset: function(property) {
    var meta = Meta.getVar("tag") || {};
    var m = Meta.converters.meta(property);
    delete meta[m.property];
    Meta.setVar("tag", meta);
  },

  setTitle: function(title) {
    Meta.setVar("title", Meta.converters.title(title));
  },

  getTitle: function() {
    return Meta.getVar("title");
  },

  arr: function() {
    var meta = Meta.getVar("tag");
    return _.toArray(meta);
  },

  hash: function() {
    return Meta.getVar("tag");
  }
}

Template.MetaTags.helpers({

  tags: function() {
    return Meta.arr();
  },

  _MetaTag: function() {
    var attrs = {};
    attrs[this.name] = this.property;
    attrs.content = this.content;

    return Blaze.Template(function() {
      return HTML.META(attrs);
    });
  }
});

Meteor.startup(function() {
  Meta.init();

  Blaze.render(Template.MetaTags, document.head);

  Deps.autorun(function() {
    document.title = Meta.getTitle();
  });
});
