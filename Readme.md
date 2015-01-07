# JQuery.makePlugin
## Easily build jQuery plugins out of constructors

    bower install jquery-makeplugin

If I have a JavaScript class, like this:

    var MyClass = function($container, options) {
        this.$container = $container;
        this.options = options;
    };

    $.extend(MyClass.prototype, {
        $: function(selector) {
            // Nifty this.$() shortcut to look up queries inside just this element
            return this.$container.find(selector);
        },

        changeLinkColor: function(color) {
            this.$('a').css('color', color);
        }
    });

And I really want to make it work like this (like a standard-looking jQuery plugin):

    $('#someElementByID').myPlugin({someOption: 42});
    $('#someElementByID').myPlugin('changeLinkColor', 'red');

Then all I need to do is this (it even comes with default options!):

    $.makePlugin('myPlugin', MyClass, {defaultOption: 'foo'});

If you don't want to expose all of the methods of MyClass to the plugin, you can throw in an extra argument to define the plugin's interface:

    $.makePlugin('myPlugin', MyClass, {linkColor: 'red'}, {
        colorLinks: function($element) {
            return this.changeLinkColor(this.options.linkColor);
        },

        customColor: function($element, color) {
            return this.changeLinkColor(color);
        }
    });

This will now only let these methods be exposed:

    $('#someElementByID').myPlugin({linkColor: 'green'});
    $('#someElementByID').myPlugin('colorLinks'); // change to green
    $('#someElementByID').myPlugin('customColor', '#ff00ff'); // change to magenta

That's about all there is to it folks!


Also check out: [jQuery-bridget](https://github.com/desandro/jquery-bridget) which is kind of similar.
