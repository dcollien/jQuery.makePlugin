(function($) {
    $.makePlugin = function(pluginName, Constructor, defaultOptions, jQueryInterface) {
        if (jQueryInterface) {
            // Store the jQueryInterface object in $.pluginName 
            $[pluginName] = jQueryInterface;
        }

        if (!defaultOptions) {
            defaultOptions = {};
        }
        
        if (!Constructor || !pluginName) {
            throw "Constructor and pluginName must be provided";
        }
        
        // Create the plugin function
        //   Called as $.pluginName() or $.pluginName({someOption: value}) to set up the plugin
        //   Called as $.pluginName('method', arg1, arg2) to call a method
        $.fn[pluginName] = function() {
            var method, args, options, $elt, returnVal, instance, slice, unshift, isMethodCall, isConstructor;
            slice = Array.prototype.slice;
            unshift = Array.prototype.unshift;
            isMethodCall = (typeof arguments[0] === 'string');
            isConstructor = (typeof arguments[0] === 'object' || typeof arguments[0] === 'undefined');

            if (isMethodCall) {
                method = arguments[0];
                args = slice.call(arguments, 1);

                returnVal = null;
                this.each(function(i, elt) {
                    $elt = $(elt);
                    instance = $elt.data(pluginName);
                    if ($[pluginName]) {
                        unshift.call(args, $elt);
                        returnVal = $[pluginName][method].apply(instance, args);
                    } else {
                        returnVal = instance[method].apply(instance, args);
                    }
                });

                if (returnVal || returnVal === false) {
                    // If a value is returned, it's non-chaining
                    return returnVal;
                }
            } else if (isConstructor) {
                if (typeof arguments[0] === 'object') {
                    options = arguments[0];
                } else {
                    options = {};
                }
                
                options = $.extend(defaultOptions, options);
                
                this.each(function(i, elt) {
                    $elt = $(elt);
                    $elt.data(pluginName, new Constructor($elt, options));
                });
            }

            // No value returned, return this object for chaining
            return this;
        };
    };
})(jQuery);
