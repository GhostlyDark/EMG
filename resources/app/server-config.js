'use strict';

const fs=require('fs');

const passedArgs = process.argv.slice(2),
    argCount = passedArgs.length,
    args = {};

const defaults = {
    port    : 64064,
    root    : __dirname,
    domain  : '0.0.0.0',
    index   : 'emg.htm',
    log     : false
};

for(let i=0; i<argCount; i++){
    const data=passedArgs[i].split('=');
    args[data[0]]=data[1];
}

class Config{
    constructor(userConfig){
      Object.assign(this,defaultConfigs);

      if(userConfig){
          for(const k in userConfig){
              this[k]=userConfig[k];
          }
      }
    }
}

const defaultConfigs={
    verbose     : (args.verbose=='true')||false,
    port        : args.port||defaults.port,
    root        : args.root||defaults.root,
    domain      : args.domain||defaults.domain,
    log         : false,
    logFunction : serverLogging,
    domains   : {

    },
    server      : {
        index   : args.index||defaults.index,
        noCache : args.noCache=='true' ? false : true,
        timeout : 30000
    },
    https:{
        ca:'',
        privateKey:'',
        certificate:'',
        passphrase:false,
        port:443,
        only:false
    },
    contentType : {
        htm     : 'text/html',
        html    : 'text/html',
        css     : 'text/css',
        xml     : 'text/xml',
        txt     : 'text/plain',
        appcache: 'text/cache-manifest',
        swf     : 'application/x-shockwave-flash',
        gz      : 'application/gzip',
        js      : 'application/javascript',
        json    : 'application/json',
        bmp     : 'image/bmp',
        jpeg    : 'image/jpeg',
        jpg     : 'image/jpeg',
        png     : 'image/png',
        gif     : 'image/gif',
        ico     : 'image/x-icon',
        svg     : 'image/svg+xml',
        woff    : 'font/woff',
        woff2   : 'font/woff2',
        flac    : 'audio/flac',
        mp3     : 'audio/mpeg',
        m4a     : 'audio/mp4a-latm',
        ogg     : 'audio/ogg',
        wav     : 'audio/x-wav',
        mp4     : 'video/mp4',
        flv     : 'video/x-flv',
        wasm    : 'application/wasm',
        zip     : 'application/zip'
    },
    restrictedType: {

    },
    errors:{
        headers : {
            'Content-Type' : 'text/plain'
        },
        404: '404 MIA',
        415: '415 File type not supported',
        403: '403 Access Denied',
        500: '500 {{err}}'
    }
};

function serverLogging(data){
    fs.exists(
        this.log,
        function serverLogExsits(exists){
            data.timestamp=new Date().getTime();

            const JSONData=JSON.stringify(data);
            let method='appendFile';
            if(!exists){
                method='writeFile';
            }
            fs[method](
                this.log,
                JSONData,
                function fsMethod(err) {
                    if(err){
                        console.log(err);
                    }
                }
            );
        }.bind(this)
    );
}

module.exports=Config;
