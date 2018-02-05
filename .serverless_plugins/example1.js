'use strict';

class ServerlessPlugin {
  constructor(serverless, options) {    
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      welcome: {
        usage: 'Helps you start your first Serverless plugin',
        lifecycleEvents: [
          'hello',
        ],  
        commands: {
          compile: {
            type: 'entrypoint',
            lifecycleEvents: [
              'compile',
            ],
          },
        }
      },      
    };

    this.hooks = {
      'after:webpack:compile:compile': this.runLogic.bind(this),
      'after:webpack:watch-compile:watch-compile': this.runLogic.bind(this),
      'before:offline:start': this.runLogic.bind(this),
      'before:offline:start:init': this.runLogic.bind(this),      
    }
  }

  runLogic() {    
    const generated = require('../.webpack/service/handler')
    const environment = this.serverless.service.custom.environment

    for(let i = 0; i < 15; i++){
      this.serverless.cli.log('Running after a compiled change detected')
    }
    
  }
}

module.exports = ServerlessPlugin;
