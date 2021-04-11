# Node2Log

[![Build Status](https://travis-ci.com/ankushTripathi/node2log.svg?branch=master)](https://travis-ci.com/ankushTripathi/node2log)

# What is this?

**Node2Log** is a simple logging library, that can be easily integrated with any node project.<br/>

Node2Log features logging at different levels and formatted strings containing process id, filename, line number , function name, date time..<br/>

It uses a simple json configuration file to set logging properties.


# Table Of Contents

1. [Installation](https://github.com/ankushTripathi/node2log#Installtion)
1. [Ussage](https://github.com/ankushTripathi/node2log#Ussage)
1. [Contributing](https://github.com/ankushTripathi/node2log#Contributing)
1. [Credits](https://github.com/ankushTripathi/node2log#Credits)
1. [License](https://github.com/ankushTripathi/node2log#License)

# Installation

`npm install --save node2log`

# Ussage

Create a json config file (check [logProperties.json.example](https://github.com/ankushTripathi/node2log/blob/master/logProperties.json.example) for reference).

```
{
    "app_base_dir" : "/home/app_server/src/",               //base directory of application code.
    "output_file" : "/home/app_server/log/output.log",      //file to log output
    "error_file" : "/home/app_server/log/error.log",        //file to log error
    "log_level" : "LOG_INFO_LEVEL",                         //logging level
    "format_string" : ""
}
```

Logging Levels in decreasing level of verbosity are :
1. LOG_TRACE_LEVEL  
1. LOG_DEBUG_LEVEL  
1. LOG_INFO_LEVEL  
1. LOG_WARN_LEVEL  
1. LOG_ERROR_LEVEL  
1. LOG_FATAL_LEVEL  
1. LOG_NONE_LEVEL 


```
const Logger = require('Logger');

const logger = new Logger('logProperties.json');

logger.trace('entering function Student.findAll()');
logger.debug(`student id value : ${id}`);
logger.info(`server listening on port : ${port}`);
logger.warn('fetch count more than 10k reached');
logger.error('no rows found to process in student_courses table, skipping.');
logger.fatal('caught exception in db.connect, exiting');

```

## Output

```
#output.log

[ January 30, 2021, 11:36:01.220 PM ] - 5964 | (INFO) index.js:29 @ serverListener > server listening on port 3000

```

```
#error.log


[ January 30, 2021, 11:36:01.223 PM ] - 5964 | (ERROR) student.js:55 @ findAll > no rows found to process in student_courses table.

[ January 30, 2021, 11:36:01.224 PM ] - 5964 | (FATAL) database.js:20 @ DbConnect > caught exception in db.connect, exiting

```

# Contributing

# Credits

# License

node2log is available under the [MIT license](https://opensource.org/licenses/MIT). node2log also includes external libraries that are available under a variety of licenses. See [LICENSE](https://github.com/ankushTripathi/node2log/blob/master/LICENSE) for the full license text.
