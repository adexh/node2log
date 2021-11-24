const assert = require('assert');
const { Console }  = require('console');
const path = require('path');
const fs = require('fs');
      
class Logger{

    static LOG_LEVELS = {
        LOG_TRACE_LEVEL : 1,  
        LOG_DEBUG_LEVEL : 2, 
        LOG_INFO_LEVEL : 3,  
        LOG_WARN_LEVEL : 4,
        LOG_ERROR_LEVEL : 5,
        LOG_FATAL_LEVEL : 6,  
        LOG_NONE_LEVEL : 7,
    };

    constructor(properties_file, configFile="config/config.json"){

        assert(properties_file != undefined, Error("please provide config file name"));
        assert(path.extname(properties_file) === ".json","please provide json propeties file, check logProperties.json.example");

        const properties = require(properties_file);
        let silent = false;
        if(fs.existsSync(configFile)){
              const config = require('../../../'+configFile);
              assert(config.hasOwnProperty('n2log_silent') && typeof(config.n2log_silent)==='boolean',"n2log_silent property required, expects only boolean value")
              silent=config.n2log_silent;
        }

        assert(properties.hasOwnProperty('app_base_dir') && properties.app_base_dir.length > 0,"app_base_dir property required, check logProperties.json.example");
        assert(properties.hasOwnProperty('output_file') && properties.output_file.length > 0, "output_file property required, check logProperties.json.example");
        assert(properties.hasOwnProperty('error_file') && properties.error_file.length > 0, "error_file property required, check logProperties.json.example");
        assert(properties.hasOwnProperty('log_level') && properties.log_level.length > 0, "log_level property required, check logProperties.json.example");
        assert(Logger.LOG_LEVELS.hasOwnProperty(properties.log_level),"please provide proper log level, check logProperties.json.example log_level provided is "+properties.log_level);
        

        const out_stream = fs.createWriteStream(properties.output_file,{
            flags: 'a'
        });
        const err_stream = fs.createWriteStream(properties.error_file,{
            flags: 'a'
        });

        this.logger = new Console(out_stream,err_stream,false);
        this.log_level = Logger.LOG_LEVELS[properties.log_level];
        this.app_base_dir = properties.app_base_dir;
        this.silent = silent;

        if(this.log_level != Logger.LOG_LEVELS.LOG_NONE_LEVEL){

            require('./attachStack');
        }
    }

    log(level_display,msg){
        if(this.silent)
            return ;
        if(this.log_level === Logger.LOG_LEVELS.LOG_NONE_LEVEL)
            return ;

        let options = {year : 'numeric', month : 'long', day : 'numeric',  hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits : 3};
        let formatedString = `[ ${new Date().toLocaleString('en-US',options)} ] - ${process.pid} | (${level_display}) ${path.relative(this.app_base_dir,__file)}:${__line} @ ${__function} > ${msg}`;
        let err = (level_display == "ERROR" || level_display == "FATAL");
        
        if(!err){
        
            this.logger.log(formatedString);
        }
        else{

            this.logger.error(formatedString);
        }
    }

    trace(msg){

        if(this.log_level <= Logger.LOG_LEVELS.LOG_TRACE_LEVEL){

            this.log("TRACE",msg);
        }
    }

    debug(msg){

        if(this.log_level <= Logger.LOG_LEVELS.LOG_DEBUG_LEVEL){

            this.log("DEBUG",msg);
        }
    }

    info(msg){

        if(this.log_level <= Logger.LOG_LEVELS.LOG_INFO_LEVEL){

            this.log("INFO",msg);
        }
    }

    warn(msg){

        if(this.log_level <= Logger.LOG_LEVELS.LOG_WARN_LEVEL){

            this.log("WARN",msg);
        }
    }

    error(msg){

        if(this.log_level <= Logger.LOG_LEVELS.LOG_ERROR_LEVEL){
            
            this.log("ERROR",msg);
        }
    }

    fatal(msg){

        if(this.log_level <= Logger.LOG_LEVELS.LOG_FATAL_LEVEL){

            this.log("FATAL",msg);
        }
    }
}

module.exports = Logger;
