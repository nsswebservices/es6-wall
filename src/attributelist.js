'use strict';
    
 let wrapper = (fn) => {
    return function() {
        if (arguments[1] === Object(arguments[1]) && !Array.isArray(arguments[1])) {
            for(var attr in arguments[1]){
                fn.call(null, arguments[0], attr, arguments[1][attr]);
            }
        } else if(Array.isArray(arguments[1])){
            var el = arguments[0];
            arguments[1].forEach(function(a){
                fn.call(null, el, a);
            });
        } else {
            fn.apply(null, arguments);
        }
    };
};

let attributelist = {
    set: function(el, attr) {
        wrapper(function(e, a, v){
            e.setAttribute(a, v);
        })(el, attr);
    },
    toggle: function(el, attr) {
        wrapper(function(e, a){
            e.setAttribute(a, (e.getAttribute(a) === 'false' ? true : false));
        })(el, attr);
    }
};

export default attributelist;