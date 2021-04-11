const chai = require('chai')
    ,expect = chai.expect
    ,should = chai.should()
    ,sinon = require('sinon');

const fs = require('fs/promises');

const Logger = require('../src/logger');


describe('Logger',() => {

    describe('Constructor', () => {

        describe('Config file Input parameter test', () => {

            it('should throw error when no config file is set',() => {

                expect(() => {new Logger()}).to.throw("please provide config file name");
              });
      
              it('should throw error when config file is not json',(done) => {
      
                  let filepath = __dirname+'/node2log.properties';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                      log_level : 'LOG_INFO_LEVEL'
                      };
      
                  fs.writeFile(filepath,JSON.stringify(data))
                  .then(() => {

                    expect(() => { new Logger(filepath) }).to.throw("please provide json propeties file");
                    fs.unlink(filepath);
                    done();
                  })
                  .catch(done);
                  
              });
      
              it('should throw error when config file is missing base dir property', (done) => {
      
                  let filepath = __dirname + '/node2log.json';
                  let data = {
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                      log_level : 'LOG_INFO_LEVEL'
                      };
      

                      fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
    
                        expect(() => { new Logger(filepath) }).to.throw("app_base_dir property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);

              });
      
              it('should throw error when config file has empty base dir property', (done) => {
      
                  let filepath = __dirname + '/node2log1.json';
                  let data = {
                      app_base_dir : '',
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                      log_level : 'LOG_INFO_LEVEL'
                  };
      
                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("app_base_dir property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
              });
      
              it('should throw error when config file is  missing output_file property', (done) => {
      
                  let filepath = __dirname + '/node2log2.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',                
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                      log_level : 'LOG_INFO_LEVEL'
                  };

                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("output_file property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
              });
      
      
              it('should throw error when config file has empty output_file property', (done) => {
      
                  let filepath = __dirname + '/node2log3.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',  
                      output_file : '',              
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                      log_level : 'LOG_INFO_LEVEL'
                  };

                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("output_file property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
                  });
      
              it('should throw error when config file is missing error_file property', (done) => {
      
                  let filepath = __dirname + '/node2log4.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',  
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',              
                      log_level : 'LOG_INFO_LEVEL'
                  };

                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("error_file property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
                  });
      
              it('should throw error when config file has empty error_file property', (done) => {
      
                  let filepath = __dirname + '/node2log5.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',  
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '',   
                      log_level : 'LOG_INFO_LEVEL'
                  };
      
                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("error_file property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
                  });
      
              it('should throw error when config file is missing log_level property', (done) => {
      
                  let filepath = __dirname + '/node2log6.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',  
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log', 
                  };

                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("log_level property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
                });
      
              it('should throw error when config file has empty log_level property', (done) => {
      
                  let filepath = __dirname + '/node2log7.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',  
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log', 
                      log_level : ''
                  };

                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("log_level property required");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
              });
      
              it('should throw error when config file has incorrect log_level value', (done) => {
      
                  let filepath = __dirname + '/node2log8.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',  
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log', 
                      log_level : 'INFO'
                  };

                  fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.throw("please provide proper log level");
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
              });
      
              it('should not throw error when json file is given with required properties', (done) => {
      
                  let filepath = __dirname + '/node2log9.json';
                  let data = {
                      app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                      output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                      error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                      log_level : 'LOG_INFO_LEVEL'
                      };

                    fs.writeFile(filepath,JSON.stringify(data))
                      .then(() => {
                        expect(() => { new Logger(filepath) }).to.not.throw();
                        fs.unlink(filepath);
                        done();
                      })
                      .catch(done);
              });
        });

        describe('Logger Class variables sanity test', () => {

            let filepath = __dirname + '/node2log10.json';

            let data = {
                app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                log_level : 'LOG_INFO_LEVEL'
            };

            let log = null;

            before(done => {

                fs.writeFile(filepath,JSON.stringify(data))
                .then(done)
                .catch(done);
            });

            after(done =>{

                fs.unlink(filepath)
                .then(done)
                .catch(done);
            });

            beforeEach(() => {

                log = new Logger(filepath);
            });

            afterEach(done => {

                Promise.all([
                    fs.unlink(data.output_file),
                    fs.unlink(data.error_file)
                ])
                .then(() =>{ done(); })
                .catch(done);
            });

            it('should create output log file and error log file in the path given in config file', (done) => {

                    fs.stat(data.output_file)
                    .then(stats => {
                        
                        stats.isFile().should.equal(true);
                    })
                    .then(() => { return fs.stat(data.error_file)})
                    .then(stats => {

                        stats.isFile().should.equal(true);
                    })
                    .then(done)
                    .catch(err => { throw err; });
            });

            it('should have property logger, an instance of Console ', () => {

                log.should.have.property('logger');
                const { Console }  = require('console');
                log.logger.should.be.instanceof(Console);
            });

            it('should have property app_base_dir with correct value as given in config file', () => {

                log.should.have.property('app_base_dir');
                log.app_base_dir.should.equal(data.app_base_dir);
            });

            it('should have log_level property with correct value as given in config file', () => {

                log.should.have.property('log_level');
                log.log_level.should.equal(Logger.LOG_LEVELS[data.log_level]);
            });
        });

        describe('attachStack', () => {

            before(() => {

                delete global.__stack;
                delete global.__file;
                delete global.__line;
                delete global.__function;
            });

            describe('when log_level is NONE', () => {

                let filepath = __dirname + '/node2log11.json';

                let data = {
                    app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                    output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                    error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                    log_level : 'LOG_NONE_LEVEL'
                };

                let log = null;

                before(done => {
                    
                    fs.writeFile(filepath,JSON.stringify(data))
                    .then(() => {log = new Logger(filepath);})
                    .then(done)
                    .catch(done);
                });

                after(done => {

                    Promise.all([

                        fs.unlink(filepath),
                        fs.unlink(data.output_file),
                        fs.unlink(data.error_file)
                    ])
                    .then(() => { done() })
                    .catch(done);
                });
        
                it('should not attach __stack variable in global scope', () => {
    
                    global.should.not.have.property('__stack');                
                });
        
                it('should not have __file attached in global scope', () => {
        
                    global.should.not.have.property('__file');
                });
        
        
                it('should not have __line attached in global scope', () => {
        
                    global.should.not.have.property('__line');
                });
        
                it('should not have __function attached in global scope', () => {
        
                    global.should.not.have.property('__function');
                });
            });
    
            describe('when log_level is not NONE', () => {

                let filepath = __dirname + '/node2log12.json';

                let data = {
                    app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                    output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output.log',
                    error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error.log',
                    log_level : 'LOG_DEBUG_LEVEL'
                };

                let log = null;

                before(done => {

                    delete require.cache[require.resolve('../src/attachStack.js')];

                    fs.writeFile(filepath,JSON.stringify(data))
                    .then(() => {
                        log = new Logger(filepath);
                    })
                    .then(done)
                    .catch(done);
                });

                after(done => {

                    Promise.all([

                        fs.unlink(filepath),
                        fs.unlink(data.output_file),
                        fs.unlink(data.error_file)
                    ])
                    .then(() => { done() })
                    .catch(done);
                });
        
                it('should attach __stack variable in global scope', () => {
    
                    global.should.have.property('__stack');                
                });
        
                it('should have __file attached in global scope', () => {
        
                    global.should.have.property('__file');
                });
        
        
                it('should have __line attached in global scope', () => {
        
                    global.should.have.property('__line');
                });
        
                it('should have __function attached in global scope', () => {
        
                    global.should.have.property('__function');
                });
            });
            
        });
    });

    describe('log method', () => {

        let msg = "this is a message from ";

        it("should not log when log_level is LOG_NONE_LEVEL", (done) => {

            let filepath = __dirname + '/node2log13.json';

                let data = {
                    app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                    output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output1.log',
                    error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error1.log',
                    log_level : 'LOG_NONE_LEVEL'
                };

                fs.writeFile(filepath,JSON.stringify(data))
                .then(() => {
                    
                    let logger = new Logger(filepath);
                    
                    const test_log = () => {

                       logger.log("TRACE",msg+"LOG"); 
                    };

                    test_log();
                })
                .then(() => { return fs.readFile(data.output_file) })
                .then(contents => {
                
                    contents.should.be.empty;
                })
                .then(done)
                .catch(done)
                .finally(() => {

                    return Promise.all([

                        fs.unlink(data.error_file),
                        fs.unlink(filepath),
                        fs.unlink(data.output_file)
                    ]);
                });
        });

        it("should log to error log file when level_display is ERROR or FATAL", (done) => {

            let filepath = __dirname + '/node2log14.json';

            let data = {
                app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output2.log',
                error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error2.log',
                log_level : 'LOG_ERROR_LEVEL'
            };

            let procces_id = process.pid
                ,file_name = "test.js"
                ,function_name = "test_log"
                ,line_number = 517
                ,dateTime_options = {year : 'numeric', month : 'long', day : 'numeric',  hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits : 3}
                , logs = [
                    {level_display : "ERROR", msg : msg + "ERROR LOG"},
                    {level_display : "FATAL", msg : msg + "FATAL LOG"}
                ];

            fs.writeFile(filepath,JSON.stringify(data))
            .then(() => {
                
                let logger = new Logger(filepath);
                
                function test_log(){

                   (() => { 
                       for( let log of logs){
                            log.dt = new Date().toLocaleString('en-US',dateTime_options);
                           logger.log(log.level_display, log.msg);
                       }
                    })();
                }

                test_log();
            })
            .then(() => { return fs.readFile(data.output_file) })
            .then(buffer => {
            
                buffer.should.be.empty;
            })
            .then(() => { return fs.readFile(data.error_file) })
            .then(buffer => {
            
                    let contents = buffer.toString().split("\n");
                    contents.should.have.length.greaterThanOrEqual(2);
                    logs.forEach((log,index) => {

                        contents[index].should.contain(log.dt.slice(0,-6));
                        contents[index].should.contain(procces_id);
                        contents[index].should.contain(file_name);
                        contents[index].should.contain(line_number);
                        contents[index].should.contain(function_name);
                        contents[index].should.contains(log.level_display);
                        contents[index].should.contain(log.msg);
                    });
            })
            .then(done)
            .catch(done)
            .finally(() => {

                return Promise.all([

                    fs.unlink(data.error_file),
                    fs.unlink(filepath),
                    fs.unlink(data.output_file)
                ]);
            });
        });

        it("should log to output log file when level_display is not ERROR or FATAL", (done) => {

            let filepath = __dirname + '/node2log15.json';

            let data = {
                app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output3.log',
                error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error3.log',
                log_level : 'LOG_TRACE_LEVEL'
            };

            let procces_id = process.pid
                ,file_name = "test.js"
                ,function_name = "test_log"
                ,line_number = 591
                ,dateTime_options = {year : 'numeric', month : 'long', day : 'numeric',  hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits : 3}
                , logs = [
                    {level_display : "TRACE", msg : msg + "TRACE LOG"},
                    {level_display : "DEBUG", msg : msg + "DEBUG LOG"},
                    {level_display : "INFO", msg : msg + "INFO LOG"},
                    {level_display : "WARN", msg : msg + "WARN LOG"},
                ];

            fs.writeFile(filepath,JSON.stringify(data))
            .then(() => {
                
                let logger = new Logger(filepath);
                
                function test_log(){

                   (() => { 
                       for( let log of logs){
                            log.dt = new Date().toLocaleString('en-US',dateTime_options);
                           logger.log(log.level_display, log.msg);
                       }
                    })();
                }

                test_log();
            })
            .then(() => { return fs.readFile(data.error_file) })
            .then(buffer => {
            
                buffer.should.be.empty;
            })
            .then(() => { return fs.readFile(data.output_file) })
            .then(buffer => {
            
                    let contents = buffer.toString().split("\n");
                    contents.should.have.length.greaterThanOrEqual(2);
                    logs.forEach((log,index) => {

                        contents[index].should.contain(log.dt.slice(0,-6));
                        contents[index].should.contain(procces_id);
                        contents[index].should.contain(file_name);
                        contents[index].should.contain(line_number);
                        contents[index].should.contain(function_name);
                        contents[index].should.contains(log.level_display);
                        contents[index].should.contain(log.msg);
                    });
            })
            .then(done)
            .catch(done)
            .finally(() => {

                return Promise.all([

                    fs.unlink(data.error_file),
                    fs.unlink(filepath),
                    fs.unlink(data.output_file)
                ]);
            });
        });
    });

    describe('logging levels test', () => {

            let 
            procces_id = process.pid
            ,file_name = "test.js"
            ,function_name = "test_log"
            ,line_numbers = [667,668,669,670,671,672]
            ,dateTime_options = {year : 'numeric', month : 'long', day : 'numeric',  hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits : 3};

        const msg = "This is a message from ";

        let tests = [
            {level : "TRACE", outfile : true}, 
            {level : "DEBUG", outfile : true}, 
            {level : "INFO", outfile : true},
            {level : "WARN", outfile : true},
            {level : "ERROR", outfile : false},
            {level : "FATAL", outfile : false}
        ];

        tests.forEach((test,index) => {

            beforeEach(done => {

                test.filepath = __dirname + '/node2log'+(16+index)+'.json';

                test.data = {
                    app_base_dir : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/',
                    output_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/output'+(4+index)+'.log',
                    error_file : '/home/ankush/Documents/Projects/Nodejs/libs/node2log/test/log/error'+(4+index)+'.log',
                    log_level : 'LOG_'+test.level+'_LEVEL'
                };

                let test_log = () => {

                        test.datetime = new Date().toLocaleString('en-US',dateTime_options);
                        test.logger.trace(msg+"TRACE");
                        test.logger.debug(msg+"DEBUG");
                        test.logger.info(msg+"INFO");
                        test.logger.warn(msg+"WARN");
                        test.logger.error(msg+"ERROR");
                        test.logger.fatal(msg+"FATAL");
                }

                fs.writeFile(test.filepath,JSON.stringify(test.data))
                .then(() => {
                    
                    test.logger = new Logger(test.filepath);
                    test_log();
                })
                .then(done)
                .catch(done);

            });

            afterEach(done => {

                test.logger = null;

                Promise.all([

                    fs.unlink(test.data.error_file),
                    fs.unlink(test.filepath),
                    fs.unlink(test.data.output_file)
                ])
                .then(() => { done(); })
                .catch(done);
            });

            it("should log all calls whose level is above "+test.level + " log level", done => {

                Promise.all([

                    fs.readFile(test.data.error_file)
                    .then(buffer => {
                    
                        if(test.outfile){
                            
                            let contents = buffer.toString().split("\n");
                            //console.log(contents);
                            contents.should.have.length(2+1);

                            tests
                            .filter(t => !t.outfile)
                            .forEach((t,i) => {

                                contents[i].should.contain(t.datetime.slice(0,-6));
                                contents[i].should.contain(procces_id);
                                contents[i].should.contain(file_name);
                                contents[i].should.contain(line_numbers[i+4]);
                                contents[i].should.contain(function_name);
                                contents[i].should.contains(t.level);
                                contents[i].should.contain(msg+t.level);
                            });
                        }
                        else{

                            let contents = buffer.toString().split("\n");
                            //console.log(contents);
                            contents.should.have.length(2 - (index - 4) + 1);  // +1 for extra new line charecter
                            
                            tests
                            .filter((t,i) => !t.outfile && i >= index)
                            .forEach((t,i) => {

                                contents[i].should.contain(t.datetime.slice(0,-6));
                                contents[i].should.contain(procces_id);
                                contents[i].should.contain(file_name);
                                contents[i].should.contain(line_numbers[i+index]);
                                contents[i].should.contain(function_name);
                                contents[i].should.contains(t.level);
                                contents[i].should.contain(msg+t.level);
                            });
                        }
                    }),
                    fs.readFile(test.data.output_file)
                    .then(buffer => {
                    
                        if(!test.outfile)
                            buffer.should.be.empty;
                        else{

                            let contents = buffer.toString().split("\n");
                            //console.log(contents);
                            contents.should.have.length(4 - index + 1);  // +1 for extra new line charecter
                            tests
                            .filter((t,i) => t.outfile && i >= index)
                            .forEach((t,i) => {

                                contents[i].should.contain(t.datetime.slice(0,-6));
                                contents[i].should.contain(procces_id);
                                contents[i].should.contain(file_name);
                                contents[i].should.contain(line_numbers[i+index]);
                                contents[i].should.contain(function_name);
                                contents[i].should.contains(t.level);
                                contents[i].should.contain(msg+t.level);
                            });
                        }
                    })
                    
                ])
                .then(() => done())
                .catch(done);
            });
        });
    });
});