const chai = require('chai')
    ,expect = chai.expect
    ,should = chai.should();

const fs = require('fs/promises');

const Logger = require('../src/logger');


describe('Logger',() => {

    describe('Constructor', () => {

        const unlinkfile_cb = (err) => {
            if(err) throw err;
        }

        describe('Config file Input parameter test', () => {

            after((done) => {

                fs.unlink(__dirname+'/log/output.log')
                .then(() => { return fs.unlink(__dirname+'/log/error.log')})
                .then(done)
                .catch(err => { throw err; });
            });

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
                  })
                  .then(() => { return fs.unlink(filepath); })
                  .then(done)
                  .catch(err => { throw err; });
                  
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });

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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                      })
                      .then(() => { return fs.unlink(filepath); })
                      .then(done)
                      .catch(err => { throw err; });
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
                .catch(err => { throw err; });
            });

            after(done =>{

                fs.unlink(filepath)
                .then(done)
                .catch(err => { throw err; });
            });

            beforeEach(() => {

                log = new Logger(filepath);
            });

            afterEach(done => {

                fs.unlink(data.output_file)
                .then(() => fs.unlink(data.error_file))
                .then(done)
                .catch(err => { throw err; });
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
                    .catch(err => { throw err; });
                });

                after(done => {

                    fs.unlink(filepath)
                    .then(() => { return fs.unlink(data.output_file)})
                    .then(() => { return fs.unlink(data.error_file)})
                    //.then(() => { return fs.unlink(filepath)})
                    .then(done)
                    .catch(err => { throw err; });
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
                    .catch(err => { throw err; });
                });

                after(done => {

                    fs.unlink(filepath)
                    .then(() => { return fs.unlink(data.output_file)})
                    .then(() => { return fs.unlink(data.error_file)})
                    //.then(() => { return fs.unlink(filepath)})
                    .then(done)
                    .catch(err => { throw err; });
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

});