'use strict';

let config = require(global.pathRootApp + '/tools/config');
import HttpUtils from '/tools/http';

module.exports = {
    list : function () {
        let urlPath = config.GATEWAY_QRPAGUE_BACKEND + '/operacoes/'
        let options = { 
            method: 'GET',
            uri: urlPath,
            headers:{
                'Content-Type': 'application/json' 
            },
            json: true
            
         };
         
        return HttpUtils.request(options) 
    },

    detail : function ( uuid ) {
       
        let urlPath = config.GATEWAY_QRPAGUE_BACKEND + '/operacao/' + uuid
        let options = { 
            method: 'GET',
            uri: urlPath,
            headers:{
                'Content-Type': 'application/json' 
            },
            json: true
            
         };
         
        return HttpUtils.request(options) 
    },

    send : async function (payment) {

 
        let urlPath = config.GATEWAY_QRPAGUE_BACKEND + '/operacao'
        let options = {
            method: 'POST',
            uri: urlPath,
            body: payment,
            headers:{
                'Content-Type': 'application/json' 
            },
            json: true
            
         };
         console.log( options )
        
        return HttpUtils.request(options) 
    },

     
}


