Object.defineProperty(global, '__stack', {
    configurable : true,
    get: function() {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function(_, stack) {
                return stack;
            };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });
    
    Object.defineProperty(global, '__line', {
        configurable : true,
    get: function() {
            return __stack[3].getLineNumber();
        }
    });
    
    Object.defineProperty(global, '__function', {
        configurable : true,
    get: function() {
            return __stack[3].getFunctionName();
        }
    });

    Object.defineProperty(global,'__file',{
        configurable : true,
        get: function(){
            return __stack[3].getFileName();
        }
    });